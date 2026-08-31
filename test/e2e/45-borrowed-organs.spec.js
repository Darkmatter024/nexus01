// ─────────────────────────────────────────────────────────────────────────────
// 45 — THE BORROWED ORGANS (LEGACY-RETIRE Stage 6 guard)
//
// ⛔ WHY THIS FILE EXISTS, AND WHY IT EXISTS *BEFORE* STAGE 6 SHIPS.
// The redesign's Reference and Work surfaces are EMPTY SCAFFOLDS in the served HTML — #rf-know,
// #rf-optics, #wk-scan and #wk-issues are literally empty divs. They are filled at DOMContentLoaded
// by eight redesign_home* functions that MOVE legacy DOM out of legacy pages into them.
//
// Every one of those functions guards on `if (src && dest && src.firstChild)`. So when Stage 6
// deletes a legacy shell before its organ is re-sourced, the re-home becomes a NO-OP: no warning,
// no toast, nothing thrown. The surface renders BLANK and reports success. A tech taps
// REFERENCE → OPTICS and gets an empty panel.
//
// ⭐ That failure is invisible to every other spec in this suite, to node --check, and to the commit
// hook. It is visible here, and it costs no device pass to find. Written against v1.14.544 as the
// GREEN baseline, so any Stage 6 ship that empties a surface turns this red immediately.
//
// See docs/LEGACY-RETIRE-ORGAN-INVENTORY.md — the owner-approved gate this file enforces.
// ─────────────────────────────────────────────────────────────────────────────
const { test, expect } = require('./fixtures');

// The nine organs, as the inventory lists them. `dest` is the redesign scaffold that must not be
// empty after boot; `organ` is a selector that must resolve INSIDE it.
const ORGANS = [
  { n: 1, name: 'KNOW / Runbook',      dest: '#rf-know',   organ: '#rf-know #pw-rb',            fn: 'redesign_homeKnow' },
  { n: 2, name: 'Optic Selector',      dest: '#rf-optics', organ: '#rf-optics .subtab-strip',   fn: 'redesign_homeOptics' },
  { n: 3, name: 'SCAN',                dest: '#wk-scan',   organ: '#wk-scan *',                 fn: 'redesign_homeScan' },
  { n: 4, name: 'Deployment Issue Log',dest: '#wk-issues', organ: '#wk-issues #issue-page',     fn: 'redesign_homeIssues' },
  { n: 5, name: 'Hardware / Power',    dest: '#rf-hw',     organ: '#rf-hw .subtab-strip',       fn: 'redesign_homeHardware' },
  { n: 6, name: 'Cage Nut Compass',    dest: '#rf-hw',     organ: '#rf-hw #pw-compass',         fn: 'redesign_homeCompass' },
  { n: 7, name: 'CLI / IB',            dest: '#rf-cli',    organ: '#rf-cli .subtab-strip',      fn: 'redesign_homeCLI' },
  { n: 8, name: 'HW REF Matrix',       dest: '#rf-hwref',  organ: '#rf-hwref .hwm-inner',       fn: 'redesign_homeHWRef' },
];

test.describe('the borrowed organs', () => {

  // ── THE HEADLINE GUARD ──────────────────────────────────────────────────────
  // One assertion per organ. If Stage 6 deletes a shell without re-sourcing its content, the
  // destination is still in the DOM and still tappable — it is just EMPTY. That is what this
  // catches, and it is why "does the element exist" would be the wrong assertion.
  for (const o of ORGANS) {
    test(`organ ${o.n} — ${o.name} actually arrives in ${o.dest}`, async ({ phantom, page }) => {
      await phantom.boot();

      const r = await page.evaluate(({ dest, organ }) => {
        const d = document.querySelector(dest);
        if (!d) return { dest: false };
        return {
          dest: true,
          // childElementCount, not textContent: a surface can be non-empty and still render
          // nothing visible, but an EMPTY container is unambiguous.
          children: d.childElementCount,
          organ: !!document.querySelector(organ),
        };
      }, { dest: o.dest, organ: o.organ });

      expect(r.dest, `${o.dest} is not in the DOM at all — the redesign scaffold is gone`).toBe(true);
      expect(r.children, `${o.dest} is EMPTY after boot — ${o.fn} did not deliver its organ. `
        + `Its guard is "if (src && dest && src.firstChild)", so a missing source fails SILENTLY.`).toBeGreaterThan(0);
      expect(r.organ, `${o.organ} did not resolve — ${o.dest} has content, but not this organ`).toBe(true);
    });
  }

  // ── THE ORDERING CHAIN ──────────────────────────────────────────────────────
  // These two are the failures the inventory predicts if the DOMContentLoaded registration order
  // is disturbed. Both are silent; neither shows up as an error.

  test('⛔ ORDER — #pw-rb lands in Know, NOT swept into Hardware', async ({ phantom, page }) => {
    await phantom.boot();
    const where = await page.evaluate(() => {
      const rb = document.getElementById('pw-rb');
      if (!rb) return 'missing';
      if (document.querySelector('#rf-know #pw-rb')) return 'know';
      if (document.querySelector('#rf-hw #pw-rb')) return 'hardware';
      return 'elsewhere';
    });
    // homeKnow moves #pw-rb out of pg-power BEFORE homeHardware drains what remains. Reverse the
    // registration order and the Runbook is swept into Reference→Hardware and Know renders empty.
    // The code states this dependency at its own :23098.
    expect(where, 'the Runbook was swept into Hardware — homeKnow no longer runs before homeHardware').toBe('know');
  });

  test('⛔ ORDER — Cage Nut exists, which proves Compass ran AFTER Hardware', async ({ phantom, page }) => {
    await phantom.boot();
    const r = await page.evaluate(() => ({
      panel: !!document.querySelector('#rf-hw #pw-compass'),
      stab: !!document.getElementById('stab-pw-compass'),
    }));
    // homeCompass appends into #rf-hw .subtab-strip — a strip that is only there because
    // homeHardware moved it. Run it first and it returns early on !strip, silently, forever.
    expect(r.panel, 'no #pw-compass panel — homeCompass returned early, most likely on a missing strip').toBe(true);
    expect(r.stab, 'no Cage Nut stab — the panel exists but nothing can reach it').toBe(true);
  });

  // ── RUNTIME SIDE EFFECTS ────────────────────────────────────────────────────
  // Not DOM moves, so a markup diff will never show these. The inventory lists them because
  // deleting a re-home function without replicating them breaks subtab switching quietly.

  test('STAB_GROUPS carries both re-home mutations', async ({ phantom, page }) => {
    await phantom.boot();
    const g = await page.evaluate(() => (typeof STAB_GROUPS !== 'undefined' ? STAB_GROUPS['pwr-sub'] : null));
    expect(g, 'STAB_GROUPS["pwr-sub"] is gone').not.toBeNull();
    // homeKnow REMOVES pw-rb so Hardware's subtab switching cannot strip the Know panel's
    // stab-active; homeCompass PUSHES pw-compass so the new tab participates in the group.
    expect(g, 'pw-rb is still in pwr-sub — homeKnow no longer drops it, so switching Hardware subtabs will hide Know')
      .not.toContain('pw-rb');
    expect(g, 'pw-compass is not in pwr-sub — the Cage Nut tab will not switch correctly').toContain('pw-compass');
  });

  // ── THE MOVE IS A MOVE, NOT A COPY ──────────────────────────────────────────
  // "Re-home, don't rebuild" (§1). If a shell were ever re-populated instead of drained, the same
  // ids would exist twice and getElementById would start resolving the wrong one.
  test('no organ is duplicated — the shells are drained, not copied', async ({ phantom, page }) => {
    await phantom.boot();
    const dupes = await page.evaluate(() => {
      const ids = ['pw-rb', 'issue-page', 'pw-compass'];
      return ids.filter((id) => document.querySelectorAll('#' + CSS.escape(id) + ', [id="' + id + '"]').length > 1);
    });
    expect(dupes, `duplicated organ ids: ${dupes.join(', ')} — a shell was copied instead of drained`).toEqual([]);
  });

  // ── LEGACY IS UNTOUCHED ─────────────────────────────────────────────────────
  // Every re-home early-returns on !redesign_isOn(). Until Stage 7, ?legacy=1 must still find its
  // organs where they were authored — this is what makes the rip-cord worth having during Stage 6.
  test('under ?legacy=1 the organs stay in their original shells', async ({ phantom, page }) => {
    await phantom.boot({ query: '?legacy=1' });
    expect(await phantom.isRedesign(), '?legacy=1 must not apply body.rd').toBe(false);
    const r = await page.evaluate(() => ({
      rbInPower: !!document.querySelector('#pg-power #pw-rb'),
      knowEmpty: (document.getElementById('rf-know') || { childElementCount: 0 }).childElementCount === 0,
      twinGone: !document.getElementById('pg-twin'),
    }));
    expect(r.rbInPower, 'the Runbook left pg-power under legacy — a re-home ran in the wrong house').toBe(true);
    expect(r.knowEmpty, 'the redesign scaffold was filled under legacy — a re-home is no longer house-gated').toBe(true);
    // ⛔ RE-POINTED v1.14.545 by Stage 6.1, which is the rule this campaign runs on: a legacy
    // assertion is rewritten in the ship that removes what it tests. This used to assert
    // `#pg-twin #issue-page` — that the Issue Log was still in its legacy shell. 6.1 decoupled that
    // organ, so pg-twin is deleted and the legacy house no longer has the Issue Log at all.
    // ⭐ That is not a regression, it is what decoupling COSTS: an organ is a single node, so
    // moving it out of the borrowed shell necessarily removes it from one house. Expect to rewrite
    // this block seven more times, once per organ, as each is decoupled.
    expect(r.twinGone, 'pg-twin is back — Stage 6.1 deleted it').toBe(true);
  });

});
