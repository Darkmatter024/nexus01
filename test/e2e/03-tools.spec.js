// ═══════════════════════════════════════════════════════════════════════════
// 03 — TOOLS PAGE + THE TOOL DOORS
//
// Two registries feed the tools in this app and they live on different pages:
//
//   1. #pg-ref  — the TOOLS grid (7 static .rf-card doors, :13546-13552).
//                 Destinations: showRefTab / rd_openPlatforms / ref_openCompass / geOpen.
//   2. rd_openOpsTool(tab)  — the ONE canonical ops-tool door (:29810). Its registry
//                 is DEPLOY_TOOLS (:29770, 9 rows) and its renderers are OPS_TABS
//                 (:22649). Its wall of nine cells is the OPS row on the Build
//                 landing (#wk-opswall, :13487-13498).
//
// The defect class this file exists to catch: a door that "succeeds" by painting into
// a node that is display:none. PHANTOM has shipped that bug repeatedly (v1.14.223/.224
// dead-tap sweep, deploy_opsHost fallback). So every door assertion here checks the
// mounted host is RENDERED — box > 0, no display:none anywhere up the ancestor chain —
// not merely present in the DOM.
//
// Everything below was measured against dct-ios.html at v1.14.405, not assumed.
// ═══════════════════════════════════════════════════════════════════════════

const { test, expect, gotoMode, railIsUp } = require('./fixtures');

// ── LOCAL helpers (defined here on purpose; fixtures.js is shared and untouched) ──

// A seeded SOP. The SOPS ops-tool renders an empty state with no seed, and the dead
// door we have to prove needs a real card to tap. Shape read from saveSOP() :45965.
const SOP_SEED = {
  dct_sops_v1: JSON.stringify([
    { id: 'sop-e2e-1', title: 'E2E Fiber Clean', body: 'Step one.\nStep two.', cat: 'fiber', ts: 1750000000000, version: '1' },
  ]),
};

/**
 * The visibility probe. Returns WHY something is invisible, which is the whole point:
 * "present but display:none" is the bug, and the failure message has to say so.
 * offsetParent alone is not enough (it is null for position:fixed too), so the
 * ancestor chain is walked explicitly.
 */
async function surface(page, sel) {
  return page.evaluate((s) => {
    const el = document.querySelector(s);
    if (!el) return { present: false, rendered: false, hiddenBy: null, w: 0, h: 0, textLen: 0 };
    const r = el.getBoundingClientRect();
    let hiddenBy = null;
    for (let p = el; p && p !== document.documentElement; p = p.parentElement) {
      const cs = getComputedStyle(p);
      if (cs.display === 'none' || cs.visibility === 'hidden') {
        hiddenBy = (p.id ? '#' + p.id : p.tagName.toLowerCase()) + ' {display:' + cs.display + ';visibility:' + cs.visibility + '}';
        break;
      }
    }
    return {
      present: true,
      rendered: !hiddenBy && r.width > 0 && r.height > 0,
      hiddenBy,
      w: Math.round(r.width),
      h: Math.round(r.height),
      textLen: (el.textContent || '').trim().length,
      kids: el.childElementCount,
    };
  }, sel);
}

// LOCAL console classifier — this is NOT an edit to the shared BENIGN_CONSOLE list.
// Two console errors are produced by the ENVIRONMENT on this surface, both REPORTED
// in the run notes rather than allowlisted, and both narrow enough that a real fault
// still fails the test. An uncaught exception is never filtered, whatever it says.
//
//  1. phantomCheckApi() (:50945) fires an OPTIONS probe at PHANTOM_PROXY_URL (:17657)
//     on a boot timer (:18245). The Cloudflare worker enforces an Origin allowlist, so
//     from http://127.0.0.1:4317 the request is refused. The app CATCHES it and paints
//     "API: UNREACHABLE" — correct offline-first behaviour. WebKit names the host in
//     the message; Chromium reports it as a bare transport code with no URL.
//  2. Chromium blocks navigator.vibrate (haptic(), called by several tool renderers)
//     until the frame has real user activation. Driving a canonical door through
//     page.evaluate has none. On a phone every one of those calls follows a tap.
// NOTE for whoever reads a failure here: WebKit reports the refused probe THREE ways
// on different runs — a console error naming the origin, a console error naming the
// worker URL, and (intermittently) a `pageerror` carrying "…workers.dev/v1/messages
// due to access control checks." So the host match below is applied to every entry
// type; everything else is console-only and an uncaught exception is never filtered.
const PROXY_HOST = 'phantom-api.wfj6t2fk7w.workers.dev';
const CONSOLE_ONLY_NOISE = [
  (t) => t.includes('Access-Control-Allow-Origin') && t.includes('127.0.0.1'),
  // Narrow on purpose: a genuinely missing local asset is served by our own static
  // server and reads "status of 404", not a transport code.
  (t) => t.trim() === 'Failed to load resource: net::ERR_FAILED',
  (t) => t.includes('Blocked call to navigator.vibrate'),
];
function appErrors(phantom) {
  return phantom.hardErrors().filter((e) => {
    const t = e.text || '';
    if (t.includes(PROXY_HOST)) return false;  // the refused off-origin probe, any type
    if (e.type === 'pageerror') return true;   // any other uncaught exception is a defect
    return !CONSOLE_ONLY_NOISE.some((m) => m(t));
  });
}

function fmt(errs) {
  return errs.map((e) => `  [${e.type}] ${e.text}`).join('\n');
}

/** Land on the Tools page the way a tech does: the bottom-nav slot. */
async function openTools(page) {
  await gotoMode(page, 'ref');
  await page.waitForFunction(() => {
    const p = document.getElementById('pg-ref');
    return !!p && p.classList.contains('active') && p.classList.contains('rf-grid');
  });
}

/**
 * Tap a Tools card the way a thumb does.
 * MEASURED: the scroller is #pg-ref (overflow-y:auto, scrollHeight 972 / clientHeight
 * 724 at 390x844), and #rd-botnav is a FIXED 110px strip laid over its bottom edge.
 * Playwright's auto-scroll aligns an element to the SCROLL CONTAINER's edge, which it
 * is entitled to do, but that edge is behind the nav — so the last row lands under the
 * nav and the click is intercepted by #bn-work. #pg-ref carries padding-bottom:128px
 * for exactly this, so scrolling a little further uses the clearance the app provides.
 * This is a harness correction, NOT a workaround for a defect: the clearance itself is
 * asserted as its own test below, and it holds.
 */
async function tapTool(page, name) {
  const card = page.locator(`#ref-grid .rf-card:has(.rf-cname:text-is("${name}"))`);
  await card.scrollIntoViewIfNeeded();
  const want = await page.evaluate((n) => {
    const pr = document.getElementById('pg-ref');
    const nav = document.getElementById('rd-botnav');
    const c = Array.from(document.querySelectorAll('#ref-grid .rf-card'))
      .find((x) => ((x.querySelector('.rf-cname') || {}).textContent || '') === n);
    if (!pr || !c || !nav) return null;
    const overlap = c.getBoundingClientRect().bottom - nav.getBoundingClientRect().top;
    if (overlap <= 0) return null;
    const target = Math.min(pr.scrollTop + overlap + 8, pr.scrollHeight - pr.clientHeight);
    pr.scrollTop = target;
    return target;
  }, name);
  // .page has scroll-behavior:smooth (:1067) — the assignment animates, so wait for it.
  if (want !== null) {
    await page.waitForFunction((t) => document.getElementById('pg-ref').scrollTop >= t - 2, want);
  }
  await card.click();
}

// The seven Tools cards, in DOM order, with the destination each one claims.
// Read from :13546-13552 — not guessed.
const TOOL_CARDS = [
  { name: 'OPTICS', door: "showRefTab('rf-optics')", panel: '#rf-optics', backTitle: 'OPTICS' },
  { name: 'PLATFORMS', door: 'rd_openPlatforms()', panel: '#rf-hw', backTitle: 'PLATFORMS', also: '#rf-platforms' },
  { name: 'CLI / IB', door: "showRefTab('rf-cli')", panel: '#rf-cli', backTitle: 'CLI / IB' },
  { name: 'PARTS', door: "showRefTab('rf-hwref')", panel: '#rf-hwref', backTitle: 'PARTS' },
  { name: 'KNOW', door: "showRefTab('rf-know')", panel: '#rf-know', backTitle: 'KNOW' },
  { name: 'COMPASS', door: 'ref_openCompass()', panel: '#rf-hw', backTitle: 'COMPASS', also: '#pw-compass' },
  // GHOST ECHO is a sheet, not a page panel — asserted separately.
];

// The nine ops tools. Tabs read from DEPLOY_TOOLS (:29770) and the OPS wall (:13489).
// `proof` is a selector the tool's OWN renderer emits, so "the host is non-empty"
// cannot be satisfied by leftovers from the previous tool.
// (rd_openOpsTool rewrites #wk-deploy wholesale on every open (:29828), so a proof can
// never be satisfied by leftovers from the previously opened tool.)
const OPS_TOOLS = [
  { tab: 'bom', title: 'BOM', proof: '#ops-tool-host .stab, #ops-tool-host #bom-tab-pane', text: 'BOM' },
  { tab: 'manifest', title: 'MANIFEST', proof: '#ops-tool-host', text: 'Manifest' },
  { tab: 'portmap', title: 'PORT MAP', proof: '#ops-tool-host #portmapInput', text: 'Port Map Validator' },
  { tab: 'rackmap', title: 'RACK MAP', proof: '#ops-tool-host #rack-viewer-input', text: 'Rack Map' },
  { tab: 'sops', title: 'SOPS', proof: '#ops-tool-host #sop-list-inner', text: 'Fiber' },
  { tab: 'burndown', title: 'BURNDOWN', proof: '#ops-tool-host .bd-action-row', text: 'Burndown' },
  // NB: #audit-new-form (:49403) ships display:none until '＋ NEW AUDIT' is tapped —
  // proving on it would be a bad-selector failure, not a defect. Prove on the button.
  { tab: 'audits', title: 'AUDITS', proof: '#ops-tool-host button[onclick="AUDIT.showNewForm()"]', text: 'Optic Audits' },
  { tab: 'blast', title: 'BLAST RADIUS', proof: '#ops-tool-host .br-wrap', text: 'BLAST RADIUS' },
  { tab: 'optics', title: 'OPTICS', proof: '#ops-tool-host', text: 'Optic' },
  { tab: 'isolate', title: 'ISOLATE', proof: '#ops-tool-host .iso', text: 'Down-link' },
];

// ═══════════════════════════════════════════════════════════════════════════
// TOOLS PAGE — the grid itself
// ═══════════════════════════════════════════════════════════════════════════
test.describe('Tools page grid (#pg-ref)', () => {
  test('the bottom-nav Tools slot lands on the card grid, not a drilled-in panel', async ({ phantom, page }) => {
    await phantom.boot();
    await openTools(page);

    await expect(page.locator('#pg-ref')).toHaveClass(/rf-grid/);
    expect(await surface(page, '#ref-grid')).toMatchObject({ rendered: true });

    // #ref-back is the drill-in back header; on the landing it must be gone (:8743).
    expect((await surface(page, '#ref-back')).rendered, 'the grid landing must not show a back header').toBe(false);

    const cards = page.locator('#ref-grid .rf-grid-wrap .rf-card');
    await expect(cards).toHaveCount(7);
    for (let i = 0; i < 7; i++) await expect(cards.nth(i)).toBeVisible();

    expect(appErrors(phantom), `console errors:\n${fmt(appErrors(phantom))}`).toEqual([]);
  });

  test('every card is a named, gloved-hand tap target', async ({ phantom, page }) => {
    await phantom.boot();
    await openTools(page);

    const cards = await page.evaluate(() =>
      Array.from(document.querySelectorAll('#ref-grid .rf-grid-wrap .rf-card')).map((c) => {
        const r = c.getBoundingClientRect();
        return {
          name: (c.querySelector('.rf-cname') || {}).textContent || '',
          label: c.getAttribute('aria-label') || '',
          role: c.getAttribute('role') || '',
          onclick: c.getAttribute('onclick') || '',
          w: Math.round(r.width),
          h: Math.round(r.height),
        };
      }));

    for (const c of cards) {
      expect(c.role, `${c.name}: a tappable card needs role=button`).toBe('button');
      expect(c.label.length, `${c.name}: no aria-label — a gloved tech's screen reader gets nothing`).toBeGreaterThan(0);
      expect(c.onclick.length, `${c.name}: card has no handler — a tap that does nothing is a ship failure`).toBeGreaterThan(0);
      expect(c.w, `${c.name}: ${c.w}x${c.h} is under the 44px gloved floor`).toBeGreaterThanOrEqual(44);
      expect(c.h, `${c.name}: ${c.w}x${c.h} is under the 44px gloved floor`).toBeGreaterThanOrEqual(44);
    }
  });

  test('the grid clears the fixed bottom nav at the end of its scroll', async ({ phantom, page }) => {
    // A card that can never be brought out from under the fixed nav is a dead door
    // dressed as a live one. MEASURED at 390x844: #pg-ref is the scroller (972/724),
    // #rd-botnav is fixed and 110px tall, and #pg-ref carries padding-bottom:128px as
    // its clearance term. This asserts the clearance actually covers the strip — the
    // recurring "every fixed strip needs its own clearance" defect class.
    await phantom.boot();
    // v1.14.412 - this asserts clearance over the BOTTOM NAV, a phone/tablet organ. At 1024+
    // the desktop rail replaces it and the strip height is 0, so the assertion has nothing
    // to measure against. The desktop scroll surface is covered by the overflow tests.
    test.skip(await railIsUp(page), 'the desktop shell composes a left rail at this width; there is no bottom-nav strip to clear');
    await openTools(page);

    // .page carries scroll-behavior:smooth (:1067), so a scrollTop assignment ANIMATES.
    // Reading rects in the same turn measures the pre-scroll layout — wait for the
    // scroller to actually reach its end before measuring.
    await page.evaluate(() => { const pr = document.getElementById('pg-ref'); pr.scrollTop = pr.scrollHeight; });
    await page.waitForFunction(() => {
      const pr = document.getElementById('pg-ref');
      return pr.scrollTop >= pr.scrollHeight - pr.clientHeight - 1;
    });

    const m = await page.evaluate(() => {
      const pr = document.getElementById('pg-ref');
      const nav = document.getElementById('rd-botnav').getBoundingClientRect();
      const cards = Array.from(document.querySelectorAll('#ref-grid .rf-grid-wrap .rf-card'));
      const last = cards[cards.length - 1];
      const r = last.getBoundingClientRect();
      const cx = Math.round(r.left + r.width / 2), cy = Math.round(r.top + r.height / 2);
      const hit = document.elementFromPoint(cx, cy);
      return {
        name: (last.querySelector('.rf-cname') || {}).textContent || '',
        cardBottom: Math.round(r.bottom),
        navTop: Math.round(nav.top),
        navH: Math.round(nav.height),
        pad: getComputedStyle(pr).paddingBottom,
        hitsSelf: !!hit && last.contains(hit),
        hitId: hit ? (hit.id || String(hit.className)) : 'nothing',
        scrolled: Math.round(pr.scrollTop),
      };
    });

    expect(
      m.cardBottom,
      `${m.name} still runs under the bottom nav at full scroll (card bottom ${m.cardBottom} > nav top ${m.navTop}); ` +
      `#pg-ref padding-bottom is ${m.pad} against a ${m.navH}px strip`
    ).toBeLessThanOrEqual(m.navTop);

    expect(m.hitsSelf, `${m.name}'s centre hit-tests to ${m.hitId}, not the card — the tap is intercepted`).toBe(true);
  });

  test('the Tools grid does not overflow horizontally', async ({ phantom, page }) => {
    await phantom.boot();
    await openTools(page);
    await phantom.assertNoHorizontalOverflow();
  });

  test('the filter narrows the grid, states a zero-match, and recovers', async ({ phantom, page }) => {
    await phantom.boot();
    await openTools(page);

    const cards = page.locator('#ref-grid .rf-grid-wrap .rf-card:not(.rf-hidden)');
    const noResult = page.locator('#ref-grid .rf-noresult');

    await page.locator('#ref-cardfilter').fill('compass');
    await expect(cards).toHaveCount(1);
    await expect(cards.first().locator('.rf-cname')).toHaveText('COMPASS');
    await expect(noResult).toBeHidden();

    // A zero-match must SAY so — a silently empty grid is the no-silent-failure violation.
    await page.locator('#ref-cardfilter').fill('zzzzz');
    await expect(cards).toHaveCount(0);
    await expect(noResult).toBeVisible();

    await noResult.locator('.rf-nr-clear').click();
    await expect(cards).toHaveCount(7);
    await expect(noResult).toBeHidden();
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// TOOLS PAGE — the seven doors
// ═══════════════════════════════════════════════════════════════════════════
test.describe('Tools page doors', () => {
  for (const card of TOOL_CARDS) {
    test(`${card.name} opens a VISIBLE surface and can be backed out of`, async ({ phantom, page }) => {
      await phantom.boot();
      await openTools(page);

      await tapTool(page, card.name);

      // Drill-in: the grid is replaced by the panel (:8741/:8742).
      await expect(page.locator('#pg-ref')).not.toHaveClass(/rf-grid/);

      const panel = await surface(page, card.panel);
      expect(panel.present, `${card.name} -> ${card.panel} is not in the DOM at all`).toBe(true);
      expect(panel.rendered, `${card.name} -> ${card.panel} mounted but is NOT visible (${panel.hiddenBy || 'zero box'}) — silent success into a hidden node`).toBe(true);
      expect(panel.textLen, `${card.name} -> ${card.panel} is visible but empty`).toBeGreaterThan(0);

      if (card.also) {
        const extra = await surface(page, card.also);
        expect(extra.rendered, `${card.name}: ${card.also} (the surface this door exists to show) is not visible (${extra.hiddenBy || 'zero box'})`).toBe(true);
      }

      // The return path: the back header names where you are and lands back on the grid.
      const back = await surface(page, '#ref-back');
      expect(back.rendered, `${card.name}: no back header on the drill-in — the tech is stranded`).toBe(true);
      await expect(page.locator('#ref-back-title')).toHaveText(card.backTitle);

      await page.locator('#ref-back .rf-back-btn').click();
      await expect(page.locator('#pg-ref')).toHaveClass(/rf-grid/);
      await expect(page.locator('#ref-grid .rf-grid-wrap .rf-card')).toHaveCount(7);

      expect(appErrors(phantom), `console errors opening ${card.name}:\n${fmt(appErrors(phantom))}`).toEqual([]);
    });
  }

  test('GHOST ECHO opens its sheet visibly and closes back to the grid', async ({ phantom, page }) => {
    await phantom.boot();
    await openTools(page);

    await tapTool(page, 'GHOST ECHO');

    // GE.open() (:47297) is async (IndexedDB) and ends by adding .visible.
    await expect(page.locator('#geSheet')).toHaveClass(/visible/, { timeout: 10_000 });
    const sheet = await surface(page, '#geSheet');
    expect(sheet.rendered, `Ghost Echo sheet is marked visible but does not render (${sheet.hiddenBy || 'zero box'})`).toBe(true);
    expect(sheet.textLen).toBeGreaterThan(0);
    // The log view is the default when there is nothing to replay (:47309).
    expect((await surface(page, '#ge-view-log')).rendered, 'Ghost Echo opened to neither the log nor the replay view').toBe(true);

    // The sheet body itself has to render, not just the backdrop.
    const inner = await surface(page, '#geSheet .ge-inner');
    expect(inner.rendered, `Ghost Echo sheet body did not render (${inner.hiddenBy || 'zero box'})`).toBe(true);

    await page.evaluate(() => window.geClose());
    await expect(page.locator('#geSheet')).not.toHaveClass(/visible/);
    // It is a sheet, so the caller's surface — the Tools grid — is still underneath.
    await expect(page.locator('#pg-ref')).toHaveClass(/rf-grid/);
    expect((await surface(page, '#ref-grid')).rendered).toBe(true);

    expect(appErrors(phantom), `console errors opening Ghost Echo:\n${fmt(appErrors(phantom))}`).toEqual([]);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// OPS TOOL DOORS — rd_openOpsTool(), the one canonical door
// ═══════════════════════════════════════════════════════════════════════════
test.describe('ops tool doors (rd_openOpsTool)', () => {
  test('the registry, the wall and the renderers agree', async ({ phantom, page }) => {
    await phantom.boot();

    const reg = await page.evaluate(() => ({
      // DEPLOY_TOOLS is `var` (on window); OPS_TABS is a top-level `const`
      // (global lexical binding, reachable by bare name only).
      registry: (window.DEPLOY_TOOLS || []).map((t) => t.tab),
      renderers: (typeof OPS_TABS !== 'undefined') ? Object.keys(OPS_TABS) : [],
      // v1.14.464 — THE WALL MOVED, SO THIS FOLLOWS IT. #wk-opswall was deleted with the Build
      // banner stack (owner ruling 2026-08-19: #bw-shell replaced that landing). The nine tools
      // now live in the Field tools row, in the SAME registry order the wall used. The invariant
      // is unchanged and is still the point: registry, doors and renderers must agree.
      wall: Array.from(document.querySelectorAll('.cs-tools .cs-tool'))
        .map((c) => ((c.getAttribute('onclick') || '').match(/rd_openOpsTool\('([a-z]+)'\)/) || [])[1]),
      wallHandlers: Array.from(document.querySelectorAll('.cs-tools .cs-tool')).map((c) => c.getAttribute('onclick')),
    }));

    expect(reg.wall, 'the Field tools row must carry the nine registry tools').toEqual(OPS_TOOLS.map((t) => t.tab));
    expect(reg.registry).toEqual(OPS_TOOLS.map((t) => t.tab));

    // Every wall cell must route through the ONE canonical door and name a tab that
    // has a renderer. A cell pointing at a missing OPS_TABS key is a guaranteed
    // "Unknown tool" toast — the dead tap this registry check exists to prevent (:29812).
    for (let i = 0; i < reg.wall.length; i++) {
      expect(reg.wallHandlers[i], `wall cell ${reg.wall[i]} does not use rd_openOpsTool`).toContain(`rd_openOpsTool('${reg.wall[i]}')`);
      expect(reg.renderers, `wall cell ${reg.wall[i]} has no OPS_TABS renderer`).toContain(reg.wall[i]);
    }
  });

  for (const tool of OPS_TOOLS) {
    test(`${tool.tab} mounts into a VISIBLE host and backs out to Build`, async ({ phantom, page }) => {
      await phantom.boot({ seed: SOP_SEED });

      // rd_openOpsTool IS the door — every wall cell, every Build tab and the desktop
      // Field-tools card call exactly this. It is driven directly here because on a
      // fresh phone boot NOTHING that calls it is on screen (see the reachability test
      // below, which is the finding); the door's own contract is still what is tested.
      await page.evaluate((t) => window.rd_openOpsTool(t), tool.tab);

      // The mount contract: the tool paints into #ops-tool-host inside the back header
      // rd_openOpsTool writes to deploy_opsHost() = #wk-deploy under rd (:29828-29830).
      await page.waitForFunction(() => {
        const h = document.getElementById('ops-tool-host');
        return !!h && (h.childElementCount > 0 || (h.textContent || '').trim().length > 0);
      }, undefined, { timeout: 10_000 });

      const host = await surface(page, '#ops-tool-host');
      expect(host.present, `${tool.tab}: no #ops-tool-host — the door did nothing`).toBe(true);
      expect(host.rendered, `${tool.tab}: mounted into a host that is NOT visible (${host.hiddenBy || 'zero box'}) — silent success into a hidden node`).toBe(true);
      expect(host.textLen, `${tool.tab}: host is visible but empty — a dead tap with no output`).toBeGreaterThan(0);

      const proof = await surface(page, tool.proof);
      expect(proof.rendered, `${tool.tab}: its own renderer's output (${tool.proof}) is not visible (${proof.hiddenBy || 'zero box'})`).toBe(true);
      await expect(page.locator('#ops-tool-host'), `${tool.tab}: the host is visible but shows another tool's output`).toContainText(tool.text);

      // The legacy sink must stay empty. #ops-content lives inside the never-active
      // #pg-sop under body.rd; anything painted there is invisible by construction.
      const sink = await surface(page, '#ops-content');
      expect(sink.textLen, `${tool.tab}: painted ${sink.textLen} chars into the hidden legacy #ops-content`).toBe(0);

      // The header names the tool it opened (DEPLOY_TOOLS meta, :29828).
      // A 'TOOL' fallback here means the registry row is missing.
      await expect(page.locator('#wk-deploy > div:nth-child(1)')).toContainText(tool.title);

      // Return path: the tool's own '‹ Back' lands on the Build workspace it came from.
      const back = page.locator('#wk-deploy > div:nth-child(1) button');
      await expect(back).toBeVisible();
      await back.click();
      await expect(page.locator('#pg-work')).toHaveClass(/wk-grid/);
      expect((await surface(page, '#ops-tool-host')).rendered, `${tool.tab}: the tool is still on screen after Back`).toBe(false);
      const build = await surface(page, '#bw-shell');
      expect(build.rendered, 'Back left the tech on no visible Build surface').toBe(true);
      expect(build.textLen).toBeGreaterThan(0);

      expect(appErrors(phantom), `console errors opening ${tool.tab}:\n${fmt(appErrors(phantom))}`).toEqual([]);
    });
  }

  test('an unknown tab fails loudly instead of silently', async ({ phantom, page }) => {
    await phantom.boot();
    // :29812 — an unrecognised tab must reach the operator, not return into nothing.
    // phantomToast (:50815) appends a plain <div> to #toast-container, so the visible
    // toast text is what gets asserted, not merely that the call returned.
    await page.evaluate(() => window.rd_openOpsTool('not-a-tool'));
    const toast = page.locator('#toast-container > div', { hasText: 'Unknown tool' });
    await expect(toast, 'rd_openOpsTool swallowed an unknown tab with no user-visible message').toBeVisible();
    await expect(toast).toContainText('not-a-tool');
    // and it must not have half-opened anything.
    expect((await surface(page, '#ops-tool-host')).present, 'an unknown tab still built a tool host').toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// REACHABILITY — the doors a tech can actually reach with a thumb
// ═══════════════════════════════════════════════════════════════════════════
test.describe('ops tool reachability', () => {
  test('the OPS wall keeps its nine tools one tap from the Build landing', async ({ phantom, page }) => {
    // ⛔ EXPECTED FAILURE — GENUINE APP DEFECT (reachability regression, v1.14.385).
    // bw_render() adds `bw-on` to #pg-work on EVERY path (:20458, :20471, :20489) and
    // never removes it; CSS :54055 `body.rd #pg-work.bw-on #work-grid {display:none}`
    // then hides #work-grid — which is where the OPS row (:13485) and its nine-cell
    // wall (:13487-13498) live. showMode('work') calls bw_render (:18815), so the wall
    // is hidden the first time Build is ever opened and stays hidden.
    // Net effect on a fresh phone: ZERO visible doors call rd_openOpsTool. The four
    // bw-tabs (:20632) only exist in the populated branch, which needs a Master + a
    // resolved rack. The comment the wall shipped with (:13459) states the contract
    // this breaks: "every tool stays ONE tap from this landing".
    // ── UPDATED v1.14.464. THE CAUSE CHANGED; THE DEFECT THIS ASSERTS DID NOT. ──
    // The wall is no longer hidden — it is GONE. Owner ruled 2026-08-19 that #bw-shell replaced
    // the banner landing, so the stack was deleted and its nine tools were restored into the
    // Field tools row FIRST (SOPS and BURNDOWN had no other caller in the file and were
    // unreachable in shipped .463; deleting the stack without restoring them would have removed
    // two tools from the product).
    // ⛔ THAT ROW LIVES IN #pg-cmd — COMMAND, NOT BUILD. So every tool is reachable again, but
    // NOT "one tap from the Build landing", which is what this test asserts and what the wall's
    // own shipped comment promised. Contract A7 says Build is the operational centre, so the pin
    // STAYS: a tech standing on Build still has zero ops-tool doors under the thumb.
    // ⚠ Do not repoint this at Command to make it green. That would be weakening the test to fit
    // the code, and this block's own header forbids it. It flips only when Build has a door.
    test.fail(true, 'ops tools live on Command (#cs-fieldtools), not the Build landing — Contract A7 unmet');

    await phantom.boot();
    await gotoMode(page, 'work');
    await page.waitForFunction(() => document.getElementById('pg-work').classList.contains('active'));

    const doors = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('[onclick]').forEach((el) => {
        if ((el.getAttribute('onclick') || '').indexOf('rd_openOpsTool') === -1) return;
        const r = el.getBoundingClientRect();
        let hidden = false;
        for (let p = el; p && p !== document.documentElement; p = p.parentElement) {
          const cs = getComputedStyle(p);
          if (cs.display === 'none' || cs.visibility === 'hidden') { hidden = true; break; }
        }
        if (!hidden && r.width > 0 && r.height > 0) out.push(el.getAttribute('aria-label') || el.textContent.trim().slice(0, 20));
      });
      return out;
    });

    expect(doors.length, 'no visible door on the Build landing calls rd_openOpsTool — the nine ops tools are unreachable').toBeGreaterThan(0);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// KNOWN DEAD DOORS — every test below is expected to FAIL until the app is fixed.
// Do not weaken or delete them. When one starts passing, Playwright reports
// "expected to fail but passed" — that is the signal to drop the annotation.
// ═══════════════════════════════════════════════════════════════════════════
test.describe('known dead doors', () => {
  test('DEAD DOOR 1 — a SOP card tap opens the SOP detail where the tech is looking', async ({ phantom, page }) => {
    // ⛔ EXPECTED FAILURE — GENUINE APP DEFECT.
    // openSopDetail() :45902 hard-codes `document.getElementById('ops-content')` (:45908).
    // Under body.rd #ops-content (:15771) sits inside #pg-sop, which showMode never
    // activates, so the detail is written into a display:none node. BOTH SOP card
    // handlers reach it: the RECOMMENDED strip card (:45856) and the ALL SOPS list
    // card (:45888). The tap "succeeds", nothing is logged, and the SOPs list stays
    // on screen — the exact silent-success-into-a-hidden-node class.
    // The file already admits this at :29798.
    test.fail(true, 'openSopDetail renders into hidden #ops-content (:45908)');

    await phantom.boot({ seed: SOP_SEED });
    await page.evaluate(() => window.rd_openOpsTool('sops'));
    await page.waitForSelector('#sop-list-inner .sop-card');

    await page.locator('#sop-list-inner .sop-card').first().click();

    const detail = await surface(page, '.sop-detail-bar');
    expect(detail.present, 'the SOP detail was never rendered at all').toBe(true);
    expect(detail.rendered, `SOP detail rendered into a hidden node (${detail.hiddenBy}) — the tap does nothing the tech can see`).toBe(true);
  });

  test('DEAD DOOR 2 — the SOP detail Back and DELETE controls are reachable', async ({ phantom, page }) => {
    // ⛔ EXPECTED FAILURE — GENUINE APP DEFECT, downstream of DEAD DOOR 1.
    // The detail markup carries its own '‹ SOPs' (:45915) and 'DELETE' (:45917)
    // buttons. They are written into the same hidden #ops-content, so the only exit
    // and the only destructive control on that screen are both untappable. This is
    // the "strands the user" half: state (currentSOPId, :45906) is now set on a
    // screen that does not exist.
    test.fail(true, 'the SOP detail bar and its DELETE live in hidden #ops-content (:45908)');

    await phantom.boot({ seed: SOP_SEED });
    await page.evaluate(() => window.rd_openOpsTool('sops'));
    await page.waitForSelector('#sop-list-inner .sop-card');
    await page.locator('#sop-list-inner .sop-card').first().click();

    const del = await surface(page, '.sop-del-btn');
    const backBtn = await surface(page, '.sop-back-btn');
    expect(backBtn.rendered, `the SOP detail's own back control is not visible (${backBtn.hiddenBy || 'absent'})`).toBe(true);
    expect(del.rendered, `the SOP detail's DELETE is not visible (${del.hiddenBy || 'absent'})`).toBe(true);
  });

  test('DEAD DOOR 3 — deleteSOP leaves the tech with a way back', async ({ phantom, page }) => {
    // ⛔ EXPECTED FAILURE — GENUINE APP DEFECT.
    // deleteSOP() :45929 ends with showOpsTab('sops') (:45934). Under rd that renders
    // the SOPs list straight into deploy_opsHost() = #wk-deploy (:22825/:29654),
    // OVERWRITING the tool back-header rd_openOpsTool built (:29828) — #ops-tool-host
    // and the '‹ Back' button both cease to exist. body.ops-detail is still set, so
    // CSS :8767 keeps the page-level #work-back hidden too. Result: a bare SOPs list
    // with no back control of any kind. The bottom nav is the only escape.
    test.fail(true, "deleteSOP -> showOpsTab('sops') overwrites the tool back header (:45934)");

    await phantom.boot({ seed: SOP_SEED });
    await page.evaluate(() => window.rd_openOpsTool('sops'));
    await page.waitForSelector('#sop-list-inner .sop-card');
    await page.locator('#sop-list-inner .sop-card').first().click();

    // deleteSOP() is only callable from the (invisible) detail bar; call it directly
    // so the strand it causes is what gets measured, not the unreachability above.
    await page.evaluate(() => window.deleteSOP());
    await page.waitForSelector('#sop-empty');

    // Look for ANY visible way back on the Work page — the tool header's '‹ Back',
    // the page-level #work-back, or any other back affordance. The bottom nav is
    // deliberately excluded: jumping to another destination is not "going back".
    const escape = await page.evaluate(() => {
      const vis = (el) => {
        const r = el.getBoundingClientRect();
        if (r.width <= 0 || r.height <= 0) return false;
        for (let p = el; p && p !== document.documentElement; p = p.parentElement) {
          const cs = getComputedStyle(p);
          if (cs.display === 'none' || cs.visibility === 'hidden') return false;
        }
        return true;
      };
      const wb = document.getElementById('work-back');
      const toolHost = document.getElementById('ops-tool-host');
      const backish = Array.from(document.querySelectorAll('#pg-work button, #pg-work [role="button"]'))
        .filter(vis)
        .map((b) => ((b.textContent || '') + ' ' + (b.getAttribute('aria-label') || '')).trim())
        .filter((t) => /back|‹|←/i.test(t));
      return {
        workBack: !!wb && vis(wb),
        toolHostAlive: !!toolHost,
        backish,
        opsDetail: document.body.classList.contains('ops-detail'),
      };
    });

    expect(
      escape.workBack || escape.backish.length > 0,
      `after deleteSOP there is no back control on Work: #ops-tool-host ${escape.toolHostAlive ? 'alive' : 'DESTROYED'}, ` +
      `#work-back ${escape.workBack ? 'visible' : 'hidden (body.ops-detail=' + escape.opsDetail + ', CSS :8767)'}, ` +
      `back-ish controls found: ${JSON.stringify(escape.backish)}`
    ).toBe(true);
  });

  test('DEAD DOOR 4 — the deployment-list Rack Map button opens a visible rack map', async ({ phantom, page }) => {
    // ⛔ EXPECTED FAILURE — GENUINE APP DEFECT.
    // deploy_showList() :29868 wires its header Rack Map button to showOpsTab('rackmap').
    // showOpsTab treats rackmap as "un-homed" (:22824) and hard-routes it to
    // #ops-content (:22825) — hidden under rd. Tapping it paints a full rack viewer
    // into a display:none node: nothing moves, nothing is logged, no toast.
    // The canonical door rd_openOpsTool('rackmap') renders the same tool correctly,
    // which is what makes this a one-door-per-feature violation and not a missing feature.
    test.fail(true, "deploy_showList Rack Map -> showOpsTab('rackmap') -> hidden #ops-content (:29868/:22825)");

    await phantom.boot();
    // deploy_quick() (:23507) is the canonical Build->Deploy door (the DEPLOY banner
    // row :13481 and the #wk-deploy launcher :13512 both call it). With no active
    // context it lands on the Command Center, whose LIST button opens deploy_showList.
    await page.evaluate(() => window.deploy_quick());
    await page.locator('#wk-deploy button:has-text("LIST")').click();

    const rackMapBtn = page.locator('#wk-deploy button[aria-label="Rack Map"]');
    await expect(rackMapBtn, 'the deployment list has no Rack Map button — surface changed').toBeVisible();
    await rackMapBtn.click();

    const viewer = await surface(page, '#rack-viewer-input');
    expect(viewer.present, 'the rack viewer never rendered').toBe(true);
    expect(viewer.rendered, `the rack map rendered into a hidden node (${viewer.hiddenBy}) — dead tap`).toBe(true);
  });
});

