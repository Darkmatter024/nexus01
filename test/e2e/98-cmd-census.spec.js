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
// A live active deployment - what makes cs_renderHero take the "Tap one" branch.
function deploymentSeed() {
  const now = 1750000000000, DEP = 'dep_a1', RACK = 'rack_a1_0';
  const P = ['mechanical','power','network','compute','validation'];
  return {
    phantom_deployments_v1: JSON.stringify([{ id: DEP, name: 'AUS-01 BUILD', status: 'active',
      buildLead: 'J. Hamilton', created: now, updated: now, createdAt: now, updatedAt: now,
      rackCount: 1, phaseCount: 5 }]),
    phantom_deploy_racks_v1: JSON.stringify([{ id: RACK, deploymentId: DEP, rackId: 's1:001',
      room: 'HALL-1', totalU: 48, slots: [], notes: '', powerCircuits: [], currentPhase: 'network', hosts: [] }]),
    phantom_deploy_phases_v1: JSON.stringify(P.map((ty, i) => ({
      id: 'phase_' + RACK + '_' + ty, deploymentId: DEP, rackId: RACK, type: ty, seqOrder: i + 1,
      status: i < 2 ? 'complete' : 'pending', tasksTotal: 0, tasksDone: 0,
      signedOffBy: null, signedOffAt: null, _gateOverride: false, _notes: '' }))),
    phantom_active_deployment: DEP, phantom_manifest_last_deploy: DEP,
  };
}
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

// ─────────────────────────────────────────────────────────────────────────────
// v1.14.573 — THE DEFECT THE OWNER CAUGHT ON DEVICE AT .572.
// "98 racks on US-SPK03. Tap one." rendered above a button reading GO TO HANDOFF.
// The headline promised the picker; the button opened somewhere else. This pins
// the pairing, not the wording: whatever the headline promises, the button opens.
// ⛔ EXACT, not a bound. .572 passed every other test in this file.
// ─────────────────────────────────────────────────────────────────────────────
test.describe('the hero button opens what the headline promises', () => {
  test('⛔ ACTIVE DEPLOYMENT: headline says "Tap one" -> the CTA is the picker, whatever the NBA wants',
    async ({ phantom, page }) => {
      test.setTimeout(180000);
      // ⛔ THIS FIXTURE IS THE OWNER'S SCREEN, AND THE FIRST VERSION OF IT WAS VACUOUS.
      // It seeded only a Master, so `live` was false, the headline never said "Tap one", and the
      // assertion below was skipped while the test reported PASS. Two corrections: an ACTIVE
      // DEPLOYMENT is seeded so the headline reaches the "Tap one" branch, and the handoff key is
      // `phantom_handoff_v1` - what cmd_render actually reads - not the invented name used first.
      await phantom.boot({ seed: Object.assign({}, masterSeed(), deploymentSeed()) });
      await page.evaluate(() => {
        window._lastPhantomMaster = JSON.parse(localStorage.getItem('phantom_master_v1'));
        // An open handoff draft drives cmd_nba to the GO TO HANDOFF branch, ABOVE the picker
        // branch - so the NBA and the headline genuinely disagree. That disagreement is the defect.
        try { localStorage.setItem('phantom_handoff_v1', JSON.stringify({ open: true, summary: '' })); } catch (_) {}
        if (typeof showMode === 'function') showMode('command');
        if (typeof cmd_render === 'function') cmd_render();
      });
      await page.waitForTimeout(1200);
      const h = await page.evaluate(() => {
        const g = (id) => { const e = document.getElementById(id); return e ? (e.textContent || '').trim() : null; };
        const sub = document.getElementById('cs-hero-sub');
        return {
          title: g('cs-hero-title'), cta: g('cs-hero-cta'),
          subShown: !!(sub && getComputedStyle(sub).display !== 'none'),
          subText: sub ? (sub.textContent || '').trim() : null,
        };
      });
      console.log('573 hero:', JSON.stringify(h));
      // ⛔ UNCONDITIONAL. The first cut wrapped this in `if (/Tap one/...)` and the fixture never
      // reached that state, so it passed while asserting nothing - the tolerant-bound failure this
      // repo keeps getting bitten by. If the fixture stops producing the "Tap one" headline, THIS
      // line fails and says so, which is the correct outcome: the reproduction is gone.
      expect(h.title, 'fixture did not reach the "Tap one" state - the reproduction is broken, not the code')
        .toContain('Tap one');
      expect(h.cta, 'the headline promised the picker and the button opened something else - the .572 defect')
        .toBe('PICK A RACK');
      // And the NBA is not lost: it moved to the secondary line rather than being displaced.
      expect(h.subShown, 'the NBA verb vanished instead of moving to the secondary line').toBe(true);
      expect(h.subText, 'the secondary line is blank while the NBA had something to say').toBeTruthy();
    });

  test('the NBA is not silently dropped - it survives as the secondary line', async ({ phantom, page }) => {
    test.setTimeout(180000);
    await phantom.boot({ seed: {} });
    await page.evaluate(() => { if (typeof showMode === 'function') showMode('command'); });
    await page.waitForTimeout(1000);
    const sub = await page.evaluate(() => {
      const e = document.getElementById('cs-hero-sub');
      return { exists: !!e, display: e ? getComputedStyle(e).display : null, text: e ? (e.textContent || '').trim() : null };
    });
    expect(sub.exists, 'the secondary NBA line is missing from the hero').toBe(true);
    // No Master: nothing to say, so it must be hidden AND empty - never a tap target that does nothing.
    expect(sub.display, 'an empty secondary line is still on screen wearing a tap target').toBe('none');
    expect(sub.text, 'a hidden line still carries text').toBe('');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// v1.14.574 — A-2a. SHIFT's door is KEPT and GATED (owner ruling).
// ⛔ The first cut of the gate sat INSIDE shift_renderHero's signature guard,
// which only fires when the SHIFT STATE changes - so loading a Master left the
// door hidden until the clock ticked. Present, wired, correct and dead: the
// exact failure the 2026-08-14 ruling put this door in #cs-grid to prevent.
// The DOM census caught it. This pins both halves so it cannot come back.
// ─────────────────────────────────────────────────────────────────────────────
const shiftbar = (page) => page.evaluate(() => {
  const e = document.getElementById('cs-shiftbar');
  if (!e) return { exists: false };
  return { exists: true, display: getComputedStyle(e).display, h: Math.round(e.getBoundingClientRect().height) };
});

test.describe('A-2a — SHIFT door kept, gated on the Master', () => {
  test('NO MASTER: the shift door is hidden - A-S1 says nothing else competes', async ({ phantom, page }) => {
    test.setTimeout(180000);
    await phantom.boot({ seed: {} });
    await page.evaluate(() => { if (typeof showMode === 'function') showMode('command'); });
    await page.waitForTimeout(1200);
    const s = await shiftbar(page);
    expect(s.exists, 'the shift door was deleted - it must be KEPT and gated, per the 2026-08-14 ruling').toBe(true);
    expect(s.display, 'a shift-end control on a device with no Master is a job that does not exist').toBe('none');
  });

  test('⛔ MASTER LOADED: the shift door RETURNS - it must not stay dead after a Master arrives',
    async ({ phantom, page }) => {
      test.setTimeout(180000);
      await phantom.boot({ seed: {} });
      await page.evaluate(() => { if (typeof showMode === 'function') showMode('command'); });
      await page.waitForTimeout(800);
      // Load the Master AFTER first paint. This is the ordering that broke: the signature guard had
      // already run once, so a gate inside it never re-evaluated and the door stayed hidden forever.
      await page.evaluate(() => {
        window._lastPhantomMaster = { siteCode: 'AUS-01', racksByCab: { 'x': {} } };
        if (typeof cmd_render === 'function') cmd_render();
        if (typeof shift_renderHero === 'function') shift_renderHero();
      });
      await page.waitForTimeout(800);
      const s = await shiftbar(page);
      expect(s.display, 'the shift door stayed hidden after a Master loaded - present, wired, correct and dead')
        .not.toBe('none');
      expect(s.h, 'the shift door has no height - it is not structurally visible').toBeGreaterThan(40);
    });

  test('the two deleted panels are gone, markup and all', async ({ phantom, page }) => {
    test.setTimeout(180000);
    await phantom.boot({ seed: {} });
    await page.evaluate(() => { if (typeof showMode === 'function') showMode('command'); });
    await page.waitForTimeout(800);
    const gone = await page.evaluate(() => ({
      intel: !!document.getElementById('cs-intel'),
      build: !!document.getElementById('cs-build'),
      body:  !!document.getElementById('cs-build-body'),
    }));
    expect(gone.intel, '#cs-intel is still in the DOM - removed, not hidden (section 6)').toBe(false);
    expect(gone.build, '#cs-build is still in the DOM - removed, not hidden').toBe(false);
    expect(gone.body,  '#cs-build-body survived its panel - a permanently-null host is the .473 shape').toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// v1.14.575 — A-2b. Local system state re-homed to SYS -> DIAGNOSTICS.
// ⛔ THE TRAP: rd_renderErrors RETURNS EARLY when the crash log is empty, which
// is the common case. A block appended only to the entries path would render
// exclusively on devices that had already crashed. Both branches are asserted.
// ─────────────────────────────────────────────────────────────────────────────
test.describe('A-2b — local system state lives in SYS, not on Command', () => {
  test('it is GONE from Command', async ({ phantom, page }) => {
    test.setTimeout(180000);
    await phantom.boot({ seed: {} });
    await page.evaluate(() => { if (typeof showMode === 'function') showMode('command'); });
    await page.waitForTimeout(900);
    const g = await page.evaluate(() => ({
      card: !!document.getElementById('cs-health'),
      rows: !!document.getElementById('cs-health-rows'),
    }));
    expect(g.card, '#cs-health is still on Command - removed, not hidden').toBe(false);
    expect(g.rows, '#cs-health-rows survived its card - a permanently-null host is the .473 shape').toBe(false);
  });

  test('⛔ EMPTY CRASH LOG: system state still renders - the early-return trap', async ({ phantom, page }) => {
    test.setTimeout(180000);
    await phantom.boot({ seed: {} });
    const out = await page.evaluate(() => {
      try { localStorage.removeItem('phantom_crash_log'); } catch (_) {}
      if (typeof rd_renderErrors === 'function') rd_renderErrors();
      const b = document.getElementById('rd-errors-body');
      return { html: b ? b.innerHTML : null, txt: b ? (b.textContent || '') : '' };
    });
    expect(out.html, 'the diagnostics body does not exist').toBeTruthy();
    expect(out.txt, 'local system state is missing when the crash log is empty - it would only ever '
      + 'appear on a device that had already crashed').toContain('LOCAL SYSTEM STATE');
    expect(out.txt, 'the honesty caption did not travel with the rows')
      .toContain('receives no facility telemetry');
    expect(out.txt, 'the Master row is missing').toContain('Master file');
  });

  test('WITH CRASH ENTRIES: system state renders alongside them', async ({ phantom, page }) => {
    test.setTimeout(180000);
    await phantom.boot({ seed: {} });
    const out = await page.evaluate(() => {
      try {
        localStorage.setItem('phantom_crash_log', JSON.stringify([
          { ts: '2026-09-03T10:00:00Z', type: 'error', ctx: 'probe', msg: 'seeded for the census' }
        ]));
      } catch (_) {}
      if (typeof rd_renderErrors === 'function') rd_renderErrors();
      const b = document.getElementById('rd-errors-body');
      return b ? (b.textContent || '') : '';
    });
    expect(out, 'system state vanished once the log had entries').toContain('LOCAL SYSTEM STATE');
    expect(out, 'the crash entry itself stopped rendering').toContain('seeded for the census');
  });

  test('the SYS row reads DIAGNOSTICS, the name INTEL-DOCK assigns it', async ({ phantom, page }) => {
    test.setTimeout(180000);
    await phantom.boot({ seed: {} });
    const name = await page.evaluate(() => {
      const r = document.getElementById('hdr-agg-errors-row');
      const n = r ? r.querySelector('.hdr-agg-row-name') : null;
      return n ? (n.textContent || '').trim() : null;
    });
    expect(name, 'the SYS row still says ERRORS - system state would be hidden behind the wrong word')
      .toBe('DIAGNOSTICS');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// v1.14.576 — A-3. Rows 7 and 8 close: #cs-fieldops and #cs-fieldtools.
// ⛔ These are DOOR closures, not feature removals, and the difference has to be
// asserted or it is just a claim in a commit message. Both functions #cs-fieldops
// carried must still be reachable, and every tool behind #cs-fieldtools must
// still be one tap from Build's OPS row - its canonical door since .558/.559.
// ─────────────────────────────────────────────────────────────────────────────
test.describe('A-3 — duplicate doors close, functions survive', () => {
  test('both panels are gone from the Deck', async ({ phantom, page }) => {
    test.setTimeout(180000);
    await phantom.boot({ seed: {} });
    await page.evaluate(() => { if (typeof showMode === 'function') showMode('command'); });
    await page.waitForTimeout(900);
    const g = await page.evaluate(() => ({
      ops: !!document.getElementById('cs-fieldops'),
      tools: !!document.getElementById('cs-fieldtools'),
      toolsShown: (function(){var e=document.getElementById('cs-fieldtools');return e?getComputedStyle(e).display!=='none':null;})(),
      ready: !!document.getElementById('cs-ready'),
      lower: !!document.getElementById('cs-lower'),
    }));
    expect(g.ops, '#cs-fieldops is still in the DOM - removed, not hidden').toBe(false);
    // ⛔ CORRECTED: #cs-fieldtools is NOT deleted. The owner ruling of 2026-09-01 keeps the DESKTOP
    // door - "the phone loses the duplicate, the desktop keeps its door. It is a re-home, not a
    // close." Deleting the markup would strip it at every width. It must be PRESENT and HIDDEN.
    expect(g.tools, '#cs-fieldtools was DELETED - that strips desktop tool access and breaks the 2026-09-01 ruling').toBe(true);
    expect(g.toolsShown, '#cs-fieldtools is visible on the phone - it is P-4 duplicate ten-tool path').toBe(false);
    expect(g.ready, '#cs-ready was taken with them - it is row 9 and is KEPT').toBe(true);
    expect(g.lower, '#cs-lower was removed - it still holds readiness').toBe(true);
  });

  test('⛔ readiness still RENDERS after losing its two siblings', async ({ phantom, page }) => {
    test.setTimeout(180000);
    await phantom.boot({ seed: {} });
    await page.evaluate(() => { if (typeof showMode === 'function') showMode('command'); });
    await page.waitForTimeout(1000);
    const r = await page.evaluate(() => {
      const rows = document.getElementById('cs-ready-rows');
      const k = document.getElementById('cs-ready-k');
      return { rowCount: rows ? rows.children.length : -1, k: k ? (k.textContent || '').trim() : null };
    });
    // cs_renderReady kept its gate loop; only the fieldops fillers left it. If removing those lines
    // had broken the function, the four gates would be missing and this is where it shows.
    expect(r.rowCount, 'the readiness gates stopped rendering - cs_renderReady was damaged by the cut')
      .toBeGreaterThan(0);
  });

  test('⛔ THE LEDGER CLAIM: both #cs-fieldops functions are still reachable', async ({ phantom, page }) => {
    test.setTimeout(180000);
    await phantom.boot({ seed: {} });
    const doors = await page.evaluate(() => {
      const all = Array.from(document.querySelectorAll('[onclick]'));
      const has = (frag) => all.some((el) => (el.getAttribute('onclick') || '').indexOf(frag) !== -1);
      return { scan: has("'scan'"), handoff: has("'handoff'") };
    });
    expect(doors.scan, 'deleting #cs-fieldops removed the last SCAN door - that is a feature loss, not a door closure').toBe(true);
    expect(doors.handoff, 'deleting #cs-fieldops removed the last HANDOFF door').toBe(true);
  });

  test('⛔ THE LEDGER CLAIM: the ten tools are still reachable from Build', async ({ phantom, page }) => {
    test.setTimeout(180000);
    await phantom.boot({ seed: {} });
    const canOpen = await page.evaluate(() => typeof rd_openOpsTool === 'function');
    expect(canOpen, 'rd_openOpsTool is gone - #cs-fieldtools was a duplicate PATH, not the tools themselves')
      .toBe(true);
  });
});
