// ─────────────────────────────────────────────────────────────────────────────
// 06 — CROSS-DEVICE COMPOSITION AND THE ACCESSIBILITY FLOOR
//
// Runs meaningfully on EVERY project, so it is tier-aware: each test reads
// page.viewportSize() / window.innerWidth and asserts what that tier is
// supposed to compose, then sweeps the widths the app's own CSS declares
// (640 / 851 / 980 / 1024 / 1500) rather than only the four project viewports.
//
// Three things it deliberately does NOT do:
//  · It does not assume desktop chrome exists on a bare URL. `.cshell` is added
//    ONLY by ?cshell=1 (cshell_isOn :18863, applied :18898) and is never
//    persisted, so at 1440px on a bare URL PHANTOM is still the phone
//    composition. That is the design, not a defect, and it is asserted as such.
//  · It does not measure a control the zero-state app never instantiates and
//    then call that a live sighting. Where a CSS RULE is measured instead of a
//    rendered control, the test says so in its name and its comment.
//  · It does not soften an assertion to go green. Where the app is below its own
//    published floor the test is test.fail() with the offending selector and the
//    source line named, so the suite turns green the day it is fixed.
//
// Boot count is kept deliberately low (9 tests, 9 boots). Each boot pulls a
// 3.3MB document plus the icon set over the loopback server, and a spec that
// boots twenty times starts losing connections on Windows — measured, and the
// reason these tests are consolidated rather than split one-assertion-each.
//
// All helpers below are LOCAL to this file on purpose: fixtures.js and
// playwright.config.js are shared and were not modified.
// ─────────────────────────────────────────────────────────────────────────────

const { test, expect } = require('./fixtures');

// ── local helpers ────────────────────────────────────────────────────────────

/** Wait for layout to settle after a viewport change. Two frames, never a sleep. */
async function settle(page) {
  await page.evaluate(
    () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
  );
}

async function setWidth(page, width) {
  const vp = page.viewportSize() || { width, height: 900 };
  await page.setViewportSize({ width, height: vp.height });
  await page.waitForFunction((w) => window.innerWidth === w, width, { timeout: 5000 });
  await settle(page);
}

/** Switch redesign mode through the real bottom-nav door and wait for the page. */
async function goMode(page, navId, pageId) {
  await page.locator('#' + navId).click();
  await page.waitForFunction(
    (id) => {
      const el = document.getElementById(id);
      return !!el && el.classList.contains('active') && getComputedStyle(el).display !== 'none';
    },
    pageId,
    { timeout: 10_000 }
  );
  await settle(page);
}

/** Read the document's horizontal extent. Rule 1: nothing ever exceeds 100vw. */
async function overflow(page) {
  return page.evaluate(() => {
    const de = document.documentElement;
    return {
      innerW: window.innerWidth,
      scrollW: de.scrollWidth,
      clientW: de.clientWidth,
      offenders: Array.from(document.querySelectorAll('body *'))
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.right > de.clientWidth + 1;
        })
        .slice(0, 6)
        .map((el) => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '')),
    };
  });
}

/** Sweep every declared CSS breakpoint plus one width either side of it. */
const SWEEP = [320, 360, 390, 414, 639, 640, 768, 834, 850, 851, 979, 980, 1023, 1024, 1180, 1366, 1440, 1499, 1500, 1600];

async function assertNoOverflowAcross(page, widths, label) {
  for (const w of widths) {
    await setWidth(page, w);
    const o = await overflow(page);
    expect(
      o.scrollW,
      `${label} overflows at ${w}px (scrollWidth ${o.scrollW} > clientWidth ${o.clientW}); first offenders: ${o.offenders.join(', ') || 'none identified'}`
    ).toBeLessThanOrEqual(o.clientW + 1);
  }
}

// Everything a gloved thumb can actually hit. PHANTOM wires most doors as an
// inline onclick on a plain div, so `button, a` alone would miss most of the app.
const INTERACTIVE_Q =
  'button, a[href], input:not([type="hidden"]), select, textarea, ' +
  '[role="button"], [onclick], [tabindex]:not([tabindex="-1"])';

/** In-page census of every VISIBLE interactive control and its hit box. */
const CENSUS = (q) => {
  function sel(el) {
    const c =
      el.className && typeof el.className === 'string'
        ? el.className.trim().split(/\s+/).slice(0, 3).join('.')
        : '';
    return el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (c ? '.' + c : '');
  }
  const out = [];
  document.querySelectorAll(q).forEach((el) => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) return;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    if (el.closest('[aria-hidden="true"]')) return;
    if (el.disabled) return;
    out.push({
      sel: sel(el),
      w: Math.round(r.width * 10) / 10,
      h: Math.round(r.height * 10) / 10,
      label: (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 28),
    });
  });
  return out;
};

// WCAG 2.1 relative luminance + contrast ratio, computed from live computed
// styles. The backdrop walk handles PHANTOM's gradient surfaces (#rd-botnav
// paints a linear-gradient, so its backgroundColor is transparent): every fully
// opaque colour stop in the gradient is averaged. That is an APPROXIMATION of a
// gradient and is stated as one — across the nav's own stops (#050506 → #000000)
// the darkest-vs-lightest spread moves the ratio by less than 0.02, so the
// verdict does not depend on the approximation.
const CONTRAST = (selector) => {
  function parse(c) {
    const m = String(c).match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  }
  function lin(v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  }
  function lum(c) {
    return 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
  }
  function backdrop(el) {
    let n = el;
    while (n && n !== document.documentElement) {
      const cs = getComputedStyle(n);
      const bc = parse(cs.backgroundColor);
      if (bc && bc.a > 0.9) return bc;
      const bi = cs.backgroundImage;
      if (bi && bi !== 'none') {
        const opaque = (bi.match(/rgba?\([^)]+\)/g) || []).map(parse).filter((s) => s && s.a > 0.9);
        if (opaque.length) {
          return {
            r: opaque.reduce((a, s) => a + s.r, 0) / opaque.length,
            g: opaque.reduce((a, s) => a + s.g, 0) / opaque.length,
            b: opaque.reduce((a, s) => a + s.b, 0) / opaque.length,
            a: 1,
          };
        }
      }
      n = n.parentElement;
    }
    return { r: 0, g: 0, b: 0, a: 1 };
  }
  const out = [];
  document.querySelectorAll(selector).forEach((el) => {
    const cs = getComputedStyle(el);
    const fg = parse(cs.color);
    if (!fg) return;
    const bg = backdrop(el);
    const a = lum(fg);
    const b = lum(bg);
    out.push({
      text: (el.textContent || '').trim().slice(0, 20),
      color: cs.color,
      fontSize: parseFloat(cs.fontSize),
      fontWeight: cs.fontWeight,
      bg: `rgb(${Math.round(bg.r)}, ${Math.round(bg.g)}, ${Math.round(bg.b)})`,
      ratio: Math.round(((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)) * 100) / 100,
    });
  });
  return out;
};

// PHANTOM's OWN published gloved floor: `--tap-s: 44px` annotated "HIG-min"
// (:146-150). 44 is the app's number, not one this suite imported.
const TAP_FLOOR = 44;

// ═════════════════════════════════════════════════════════════════════════════
// A · ZERO HORIZONTAL OVERFLOW ON EVERY PAGE, EVERY WIDTH
// ═════════════════════════════════════════════════════════════════════════════

test.describe('zero horizontal overflow', () => {
  test('Command composes inside the viewport at this tier and at every declared breakpoint', async ({ phantom, page }) => {
    await phantom.boot();
    await phantom.assertNoHorizontalOverflow();      // this project's own viewport first
    await assertNoOverflowAcross(page, SWEEP, 'Command (#pg-cmd)');
  });

  test('Build composes inside the viewport at this tier and at every declared breakpoint', async ({ phantom, page }) => {
    await phantom.boot();
    await goMode(page, 'bn-work', 'pg-work');
    await phantom.assertNoHorizontalOverflow();
    await assertNoOverflowAcross(page, SWEEP, 'Build (#pg-work)');
  });

  test('Tools composes inside the viewport at this tier and at every declared breakpoint', async ({ phantom, page }) => {
    await phantom.boot();
    await goMode(page, 'bn-ref', 'pg-ref');
    await phantom.assertNoHorizontalOverflow();
    await assertNoOverflowAcross(page, SWEEP, 'Tools (#pg-ref)');
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// B · TIER BOUNDARIES
// ═════════════════════════════════════════════════════════════════════════════

test.describe('tier boundaries', () => {
  test('851px flips phone composition to desktop chrome, and the second tier is 1500px (not 1520px)', async ({ phantom, page }) => {
    await phantom.boot({ query: '?cshell=1' });
    expect(
      await page.evaluate(() => document.body.classList.contains('cshell')),
      '?cshell=1 did not add body.cshell — cshell_isOn (:18863) or its boot call (:18898) changed'
    ).toBe(true);

    const chrome = () =>
      page.evaluate(() => ({
        side: getComputedStyle(document.getElementById('cs-side')).display,
        top: getComputedStyle(document.getElementById('cs-top')).display,
        botnav: getComputedStyle(document.getElementById('rd-botnav')).display,
        cmdshell: getComputedStyle(document.getElementById('cmd-shell')).display,
      }));

    // ── 850px: phone composition. Bottom nav, no side rail, no top bar.
    await setWidth(page, 850);
    expect(await chrome(), 'at 850px the desktop chrome must stay inert (#cs-side/#cs-top are display:none until min-width:851px, :54042/:54423)').toEqual({
      side: 'none',
      top: 'none',
      botnav: 'grid',
      cmdshell: 'block',
    });
    let o = await overflow(page);
    expect(o.scrollW, `850px overflows: ${o.offenders.join(', ')}`).toBeLessThanOrEqual(o.clientW + 1);

    // ── 851px: desktop composition. Side rail + top bar take over, bottom nav stands down.
    await setWidth(page, 851);
    const hi = await chrome();
    expect(hi.side, '#cs-side must appear at 851px').not.toBe('none');
    expect(hi.top, '#cs-top must appear at 851px').not.toBe('none');
    expect(hi.botnav, '#rd-botnav must stand down at 851px — two primary navs on screen at once is the defect this boundary exists to prevent').toBe('none');
    o = await overflow(page);
    expect(o.scrollW, `851px overflows: ${o.offenders.join(', ')}`).toBeLessThanOrEqual(o.clientW + 1);

    // ── the SECOND boundary. The brief carried it as 1520px; the app declares
    //    @media (min-width: 1500px) (three of them, :54231/:54399/:54724) and
    //    there is no 1520px query anywhere in the file. Measured, not read:
    //    count the #cs-grid tracks either side of both candidate boundaries.
    const tracks = async (w) => {
      await setWidth(page, w);
      return page.evaluate(() => {
        const g = getComputedStyle(document.getElementById('cs-grid')).gridTemplateColumns;
        return g === 'none' ? 0 : g.trim().split(/\s+/).length;
      });
    };
    expect(await tracks(1499), '#cs-grid should still be 2-up at 1499px').toBe(2);
    expect(await tracks(1500), '#cs-grid earns its third column at 1500px').toBe(3);
    // The refutation: a 1520px boundary would leave 1519px still 2-up.
    expect(await tracks(1519), 'the second tier boundary is 1500px, not 1520px — 1519px is already 3-up').toBe(3);
    o = await overflow(page);
    expect(o.scrollW, `1519px overflows: ${o.offenders.join(', ')}`).toBeLessThanOrEqual(o.clientW + 1);
  });

  test('a bare URL keeps the phone composition at every width — cshell is opt-in and never persisted', async ({ phantom, page }) => {
    await phantom.boot();
    for (const w of [390, 851, 1366, 1440, 1600]) {
      await setWidth(page, w);
      const s = await page.evaluate(() => ({
        cshell: document.body.classList.contains('cshell'),
        rd: document.body.classList.contains('rd'),
        side: getComputedStyle(document.getElementById('cs-side')).display,
        cmdshell: getComputedStyle(document.getElementById('cmd-shell')).display,
        botnav: getComputedStyle(document.getElementById('rd-botnav')).display,
      }));
      expect(s, `bare URL at ${w}px must not compose desktop chrome (?cshell=1 is the only door, and it is not persisted)`).toEqual({
        cshell: false,
        rd: true,
        side: 'none',
        cmdshell: 'none',
        botnav: 'grid',
      });
    }
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// C · THE 44px GLOVED TOUCH FLOOR
// ═════════════════════════════════════════════════════════════════════════════

test.describe('touch-target floor', () => {
  // ── GENUINE APP DEFECT. Expected to fail until the offenders are raised.
  //
  // Measured live in the zero-state app (no Master loaded), phone-webkit 390px:
  //   · button#hdr-agg-pill  77x27 (Command) / 140x27 (Build, Tools)
  //     .hdr-agg-pill (:3810) sets padding 6px 11px and NO min-height, so the
  //     shared header's only tappable control is 27px tall on every page. It is
  //     a real door — onclick="hdr_aggToggle(event)" at :13004.
  //   · input#srch           339x38 (Tools)
  //     .search-input (:1029) padding 9px 12px, no min-height. The app's own
  //     token table at :143 assigns "search input" --tap-xl = 56px.
  //   · input#ref-cardfilter 330x40 (Tools)
  //     .rf-search-input (:8748) hard-codes height:40px — 4px under --tap-s.
  //
  // NOT asserted here because the zero-state app cannot render them (see the
  // limitations in the report): the two 28px destructive DELETE buttons at
  // :47717 (deleteOpticEntry) and :49536 (AUDIT.removeEntry), each an inline
  // min-height:28px override of .pt-btn's own 48px floor (:685).
  test('every visible interactive control clears 44px on Command, Build and Tools', async ({ phantom, page }) => {
    test.fail();   // marked inside the body on purpose: at describe scope it would annotate every sibling
    await phantom.boot();

    const offenders = [];
    const census = [];
    for (const [name, nav, pid] of [
      ['Command', null, null],
      ['Build', 'bn-work', 'pg-work'],
      ['Tools', 'bn-ref', 'pg-ref'],
    ]) {
      if (nav) await goMode(page, nav, pid);
      const found = await page.evaluate(CENSUS, INTERACTIVE_Q);
      census.push(`${name}=${found.length}`);
      found.forEach((c) => {
        if (c.w < TAP_FLOOR || c.h < TAP_FLOOR) {
          offenders.push(`${name} · ${c.sel} · ${c.w}x${c.h}px · "${c.label}"`);
        }
      });
    }

    // A census of zero would mean the query is broken, not that the app is
    // perfect. Prove the instrument works before trusting its verdict.
    const total = census.reduce((a, s) => a + Number(s.split('=')[1]), 0);
    expect(total, 'the interactive census found almost nothing — INTERACTIVE_Q is wrong, not the app').toBeGreaterThan(10);

    // A test.fail() swallows the assertion message, and the whole point of this
    // test is that the suite DOCUMENTS the defect. Print it unconditionally.
    // eslint-disable-next-line no-console
    console.log(
      `[06] tap-floor offenders @${(page.viewportSize() || {}).width}px (census ${census.join(' ')}):\n  ` +
        (offenders.join('\n  ') || 'none')
    );

    expect(
      offenders,
      `controls under the app's own ${TAP_FLOOR}px gloved floor (--tap-s, :150):\n  ` +
        offenders.join('\n  ') +
        `\n(visible interactive controls per page: ${census.join(' ')}; viewport ${JSON.stringify(page.viewportSize())})`
    ).toEqual([]);
  });

  // ── GENUINE APP DEFECT — the .reh-3d-seg rack-mode pills (FLAT | 3D | CABLES
  // | EXPLODE). The open owner item ".reh-3d-seg 22→44px gloved floor" is on
  // record and still needs a ruling.
  //
  // HONESTY NOTE ON METHOD — this measures a RULE, not a sighting. The pills are
  // built by JS (:36049 CABLES, :36097 the FLAT/3D pair, :36107 EXPLODE) only
  // once a rack elevation exists, and a harness with no Master loaded reaches
  // the honest "No Master loaded" zero-state instead. So the test renders ONE
  // probe element carrying the real class inside the real #pg-work under
  // body.rd, reads its box, and removes it. It measures exactly the rule that
  // will govern the live pills — body.rd .reh-3d-seg at :10657, font-size
  // var(--fs-caption)=11px, padding 4px 12px, 1px border — and nothing more.
  test('the .reh-3d-seg rack-mode pill RULE yields a 44px target (rule probe, not a live control)', async ({ phantom, page }) => {
    test.fail();
    await phantom.boot();
    await goMode(page, 'bn-work', 'pg-work');

    const box = await page.evaluate(() => {
      const host = document.getElementById('pg-work');
      const probe = document.createElement('button');
      probe.type = 'button';
      probe.className = 'reh-3d-seg';
      probe.textContent = '3D';
      probe.setAttribute('data-e2e-probe', '1');
      host.appendChild(probe);
      const r = probe.getBoundingClientRect();
      const cs = getComputedStyle(probe);
      const out = {
        w: Math.round(r.width * 10) / 10,
        h: Math.round(r.height * 10) / 10,
        fontSize: cs.fontSize,
        padding: cs.padding,
        rd: document.body.classList.contains('rd'),
      };
      probe.remove();
      return out;
    });

    // If body.rd were absent the rule would not apply and the probe would be
    // meaningless — assert the precondition before reporting the measurement.
    expect(box.rd, 'the probe must be measured under body.rd or the rule does not apply').toBe(true);
    // eslint-disable-next-line no-console
    console.log(`[06] .reh-3d-seg RULE probe: ${box.w}x${box.h}px (font ${box.fontSize}, padding ${box.padding}) vs the ${TAP_FLOOR}px floor`);
    expect(
      box.h,
      `body.rd .reh-3d-seg (:10657) renders ${box.w}x${box.h}px (font ${box.fontSize}, padding ${box.padding}) — under the ${TAP_FLOOR}px gloved floor`
    ).toBeGreaterThanOrEqual(TAP_FLOOR);
  });

  // The one control that is on screen on every page at every phone width. This
  // one PASSES and must keep passing — it is the floor's positive control.
  test('the bottom nav — the always-on-screen control — clears 44px in both axes', async ({ phantom, page }) => {
    await phantom.boot();
    const nav = await page.evaluate(() =>
      Array.from(document.querySelectorAll('#rd-botnav .botitem, #rd-botnav #rd-exit')).map((el) => {
        const r = el.getBoundingClientRect();
        return { id: el.id, w: Math.round(r.width), h: Math.round(r.height) };
      })
    );
    // 3 destinations + EXIT. No Scan slot, no Shift slot — measured, not assumed.
    expect(nav.map((n) => n.id), 'the redesign bottom nav should expose exactly 3 destinations + EXIT').toEqual([
      'bn-command',
      'bn-work',
      'bn-ref',
      'rd-exit',
    ]);
    nav.forEach((n) => {
      expect(n.w, `#${n.id} is ${n.w}px wide`).toBeGreaterThanOrEqual(TAP_FLOOR);
      expect(n.h, `#${n.id} is ${n.h}px tall`).toBeGreaterThanOrEqual(TAP_FLOOR);
    });
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// D · MEASURABLE CONTRAST
// ═════════════════════════════════════════════════════════════════════════════

test.describe('contrast floor', () => {
  // ── GENUINE APP DEFECT — and the on-record 2.74:1 figure is VERIFIED, not
  // refuted. Measured here at 2.75:1 (the 0.01 is the gradient average; see the
  // note on CONTRAST above).
  //
  //   #rd-botnav .blabel resting colour #4a565f (:9573) over the nav's own
  //   near-black gradient (:9564) = 2.75:1 at 9px / weight 700. WCAG AA wants
  //   4.5:1 for text this size — 9px is nowhere near the 18.66px-bold "large
  //   text" exemption, so 3:1 does not apply either, and it misses even that.
  //
  // The failure is specific, which is what makes it worth fixing: the ACTIVE
  // label inherits --tc and measures 15.09:1, and #rd-exit measures 6.33:1. It
  // is exactly the two INACTIVE destinations — the labels an operator has to
  // read in order to navigate — that are unreadable.
  test('#rd-botnav .blabel meets WCAG AA at 9px', async ({ phantom, page }) => {
    test.fail();
    await phantom.boot();
    const rows = await page.evaluate(CONTRAST, '#rd-botnav .blabel');
    expect(rows.length, 'no nav labels found — the selector is wrong, re-derive before trusting this').toBe(4);

    // 9px/700 is small text by every reading of WCAG 1.4.3. If that ever stops
    // being true the 4.5:1 threshold below is the wrong one and this test lies.
    rows.forEach((r) =>
      expect(r.fontSize, `nav labels are ${r.fontSize}px, no longer small text — re-derive this test`).toBeLessThan(18.66)
    );

    const failing = rows.filter((r) => r.ratio < 4.5);
    // eslint-disable-next-line no-console
    console.log(
      '[06] #rd-botnav .blabel contrast:\n  ' +
        rows.map((r) => `${r.ratio.toFixed(2)}:1  ${r.fontSize}px/${r.fontWeight}  ${r.color} on ${r.bg}  "${r.text}"`).join('\n  ')
    );
    expect(
      failing.map((r) => `"${r.text}" ${r.color} on ${r.bg} = ${r.ratio}:1 @ ${r.fontSize}px/${r.fontWeight}`),
      'nav labels under WCAG AA 4.5:1.\n  full measured table:\n    ' +
        rows.map((r) => `${r.ratio.toFixed(2)}:1  ${r.fontSize}px/${r.fontWeight}  ${r.color} on ${r.bg}  "${r.text}"`).join('\n    ')
    ).toEqual([]);
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// E · REDUCED MOTION
// ═════════════════════════════════════════════════════════════════════════════

test.describe('reduced motion', () => {
  // NOTE ON METHOD: `test.use({ reducedMotion: 'reduce' })` was tried first and
  // MEASURED not to reach the page on phone-webkit — matchMedia still reported
  // no-preference. page.emulateMedia() before the navigation does reach it, and
  // every test below proves it did before asserting anything about its effect.
  // The dedicated `reduced-motion` project in the shared config sets the same
  // preference at context level; this call is idempotent there.
  async function bootReduced(phantom, page) {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await phantom.boot();
    expect(
      await page.evaluate(() => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)),
      'prefers-reduced-motion emulation did not reach the page — every assertion below would be vacuous'
    ).toBe(true);
  }

  test('reduced motion does not break composition on any page or collapse the fixed nav', async ({ phantom, page }) => {
    await bootReduced(phantom, page);

    await expect.poll(() => phantom.isRedesign(), { message: 'body.rd not applied under reduced motion' }).toBe(true);
    await expect(page.locator('#app')).toHaveClass(/visible/);

    // Layout must hold on all three pages, not just the one that boots.
    await phantom.assertNoHorizontalOverflow();
    await goMode(page, 'bn-work', 'pg-work');
    await phantom.assertNoHorizontalOverflow();
    await goMode(page, 'bn-ref', 'pg-ref');
    await phantom.assertNoHorizontalOverflow();
    await goMode(page, 'bn-command', 'pg-cmd');
    await phantom.assertNoHorizontalOverflow();

    // The nav is position:fixed with a translateZ(0) GPU layer (:9564). A
    // motion-suppressed transform must not strand it or flatten it.
    const nav = await page.evaluate(() => {
      const n = document.getElementById('rd-botnav');
      const r = n.getBoundingClientRect();
      const cs = getComputedStyle(n);
      return {
        h: Math.round(r.height),
        pos: cs.position,
        display: cs.display,
        bottomGap: Math.round(window.innerHeight - r.bottom),
      };
    });
    expect(nav.display, 'the bottom nav must still be a grid under reduced motion').toBe('grid');
    expect(nav.pos).toBe('fixed');
    expect(nav.h, `the bottom nav collapsed to ${nav.h}px`).toBeGreaterThanOrEqual(TAP_FLOOR);
    expect(Math.abs(nav.bottomGap), `the bottom nav is ${nav.bottomGap}px off the viewport bottom`).toBeLessThanOrEqual(2);
  });

  test('reduced motion keeps the same tier boundaries', async ({ phantom, page }) => {
    // Motion preference must not move a breakpoint. Cheap to assert, and it is
    // exactly the kind of coupling a `@media` refactor would introduce silently.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await phantom.boot({ query: '?cshell=1' });
    expect(
      await page.evaluate(() => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)),
      'prefers-reduced-motion emulation did not reach the page'
    ).toBe(true);
    await setWidth(page, 850);
    expect(await page.evaluate(() => getComputedStyle(document.getElementById('cs-side')).display)).toBe('none');
    await setWidth(page, 851);
    expect(await page.evaluate(() => getComputedStyle(document.getElementById('cs-side')).display)).not.toBe('none');
    await phantom.assertNoHorizontalOverflow();
  });
});
