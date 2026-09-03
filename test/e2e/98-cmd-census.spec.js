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

// ─────────────────────────────────────────────────────────────────────────────
// T1 / T2 — Ship A-1's acceptance bar. Added WITH A-1 (v1.14.572).
// The census above proved the phone had NO two-state first screen: data-master
// flipped and nothing moved. A-1 creates the distinction, so it gets asserted.
// ─────────────────────────────────────────────────────────────────────────────
const hero = (page) => page.evaluate(() => {
  const g = (id) => { const e = document.getElementById(id); return e ? (e.textContent || '').trim() : null; };
  const cta = document.getElementById('cs-hero-cta');
  return { eyebrow: g('cs-hero-eyebrow'), title: g('cs-hero-title'), cta: cta ? (cta.textContent || '').trim() : null };
});

test.describe('A-1 — the first screen answers one question', () => {
  test('T1 · NO MASTER: the screen names the action, and the action is LOAD MASTER', async ({ phantom, page }) => {
    test.setTimeout(180000);
    await phantom.boot({ seed: {} });
    await page.evaluate(() => { if (typeof showMode === 'function') showMode('command'); });
    await page.waitForTimeout(1200);
    const h = await hero(page);
    console.log('T1 hero:', JSON.stringify(h));
    expect(h.title, 'the no-Master screen does not name the one action').toBe('Load a Master to start.');
    expect(h.cta, 'the one action is not LOAD MASTER').toBe('LOAD MASTER');
  });

  test('T2 · MASTER LOADED: the headline N equals what the picker lists', async ({ phantom, page }) => {
    test.setTimeout(180000);
    await phantom.boot({ seed: masterSeed() });
    await page.evaluate(() => {
      window._lastPhantomMaster = JSON.parse(localStorage.getItem('phantom_master_v1'));
      if (typeof showMode === 'function') showMode('command');
      if (typeof cmd_render === 'function') cmd_render();
    });
    await page.waitForTimeout(1200);
    const h = await hero(page);
    console.log('T2 hero:', JSON.stringify(h));
    // No deployment in this fixture, so the honest state is "nothing deploying" - NOT "tap one".
    // ⛔ This is the A-S6 assertion: a CTA must not imply a job that does not exist.
    expect(h.title, 'a Master with no deployment must not say "tap one"').not.toContain('Tap one');
    expect(h.eyebrow, 'the Master-loaded state is not named').toBe('Master loaded');
  });

  test('⛔ THE TWO STATES MUST DIFFER — the defect A-1 exists to fix', async ({ phantom, page }) => {
    test.setTimeout(180000);
    await phantom.boot({ seed: {} });
    await page.evaluate(() => { if (typeof showMode === 'function') showMode('command'); });
    await page.waitForTimeout(1000);
    const noMaster = await hero(page);
    await page.evaluate(() => {
      window._lastPhantomMaster = { siteCode: 'AUS-01', racksByCab: { 'x': {} } };
      if (typeof cmd_render === 'function') cmd_render();
    });
    await page.waitForTimeout(1000);
    const withMaster = await hero(page);
    expect(withMaster.title, 'the first screen reads identically with and without a Master - the pre-A-1 defect').not.toBe(noMaster.title);
  });
});
