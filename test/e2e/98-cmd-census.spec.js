// ─────────────────────────────────────────────────────────────────────────────
// 98 — pg-cmd DOM CENSUS (probe, FIRST-DOOR Ship A)
//
// Owner ruling 2026-09-03: the real first screen is looked at, in BOTH states, at
// iPhone 15 / WebKit, and diffed against the SOURCE census in
// docs/FIRST-DOOR-SHIPA-PHASE0-EVIDENCE.md BEFORE any deletion. Discrepancies are
// reported, not absorbed.
//
// ⛔ This exists because the source census was already read wrong once. Rev 1 of that
// document trusted a CODE COMMENT (:13813) over the cascade and got two of five
// no-Master elements wrong. A rule's presence is not proof of what paints.
// ─────────────────────────────────────────────────────────────────────────────
const { test, expect } = require('./fixtures');

// A Master is "loaded" iff master_hasMaster() sees racksByCab with >=1 key (dct-ios).
function masterSeed() {
  return {
    phantom_master_v1: JSON.stringify({
      siteCode: 'AUS-01',
      sourceFile: 'census-fixture.xlsx',
      savedAt: 1750000000000,
      ingestedAt: 1750000000000,
      racksByCab: {
        's1:001': { cabId: 's1:001', locode: 'AUS-01', rows: [] },
        's1:002': { cabId: 's1:002', locode: 'AUS-01', rows: [] },
      },
    }),
  };
}

// Visible = painted. Not "is in the DOM" - that is the guard class .441 was written about.
const census = (page) => page.evaluate(() => {
  const pg = document.getElementById('pg-cmd');
  if (!pg) return { error: 'pg-cmd missing' };
  const out = [];
  const walk = (el, depth) => {
    for (const c of el.children) {
      const cs = getComputedStyle(c);
      const r = c.getBoundingClientRect();
      const painted = cs.display !== 'none' && cs.visibility !== 'hidden' && r.height > 0;
      const name = (c.id ? '#' + c.id : '') + (c.className && typeof c.className === 'string'
        ? '.' + c.className.trim().split(/\s+/).join('.') : '');
      if (painted) {
        out.push({ d: depth, n: name || c.tagName.toLowerCase(), h: Math.round(r.height) });
        if (depth < 2) walk(c, depth + 1);
      }
    }
  };
  walk(pg, 0);
  return {
    vw: window.innerWidth, vh: window.innerHeight,
    dpanelDisplay: (function(){var e=document.getElementById('cs-ready');return e?getComputedStyle(e).display:'absent';})(),
    dataMaster: pg.getAttribute('data-master'),
    bodyClass: document.body.className,
    painted: out,
  };
});

test.describe('pg-cmd DOM census — the real first screen', () => {
  test('NO MASTER: what actually paints on pg-cmd', async ({ phantom, page }) => {
    test.setTimeout(180000);
    await phantom.boot({ seed: {} });
    await page.evaluate(() => { if (typeof showMode === 'function') showMode('command'); });
    await page.waitForTimeout(1500);
    const c = await census(page);
    console.log('\n=== NO MASTER === data-master=' + c.dataMaster + '  body="' + c.bodyClass + '"');
    (c.painted || []).forEach((e) => console.log('  '.repeat(e.d) + '- ' + e.n + '  [' + e.h + 'px]'));
    expect(c.error, 'pg-cmd did not exist').toBeUndefined();
  });

  test('MASTER LOADED: what actually paints on pg-cmd', async ({ phantom, page }) => {
    test.setTimeout(180000);
    await phantom.boot({ seed: masterSeed() });
    // Put the app in the Master-loaded STATE the same way the loader does (:34409 sets
    // window._lastPhantomMaster). master_hasMaster() reads exactly this. Not a faked
    // measurement - the census still reads whatever the app then paints.
    await page.evaluate(() => {
      window._lastPhantomMaster = JSON.parse(localStorage.getItem('phantom_master_v1'));
      if (typeof showMode === 'function') showMode('command');
      if (typeof cmd_render === 'function') cmd_render();
    });
    await page.waitForTimeout(1500);
    const has = await page.evaluate(() => (typeof master_hasMaster === 'function') ? master_hasMaster() : null);
    const c = await census(page);
    console.log('\n=== MASTER LOADED === master_hasMaster=' + has + '  data-master=' + c.dataMaster);
    (c.painted || []).forEach((e) => console.log('  '.repeat(e.d) + '- ' + e.n + '  [' + e.h + 'px]'));
    expect(has, 'the fixture did not produce a loaded Master - census would be meaningless').toBe(true);
  });
});
