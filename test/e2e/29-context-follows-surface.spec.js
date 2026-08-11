// ─────────────────────────────────────────────────────────────────────────────
// 29 — THE ONE WEBGL CONTEXT FOLLOWS THE VISIBLE SURFACE (v1.14.441)
//
// Contract A6: one live WebGL attachment, ever. What that contract never pinned is WHICH surface
// should be holding it, and the answer is the one the technician is looking at.
//
// ⛔ THE DEFECT THIS SPEC EXISTS FOR. Opening a rack detail does not remove #bw-mount from the
// DOM — the detail renders into #wk-deploy INSIDE #pg-work — so Build's bounded re-arm (12 x
// 400ms, from .391) kept firing for ~5s after the detail opened, and every retry disposed the
// detail's mount. Measured before the fix: Build held a LIVE 652x640 context at every step while
// #reh3dMount ended at canvas=NONE. The rack detail NEVER DREW, and the CSS held its 60vh mount
// open and black over a hidden U1-U48 rail.
//
// .405 wrote the correct reasoning for exactly this class — "a retry loop that outlives a
// navigation to another WebGL surface is a stale callback" — and guarded only the aisle. The rack
// detail is the second surface with the same property.
//
// ⚠ These assertions are EXACT, never bounds. The defect value for the detail's context is
// "no-canvas", and any assertion admitting it (toBeTruthy, >= 0, "at most one") would have passed
// against the broken build for months — the failure mode that hid the .427 aisle defect.
// ─────────────────────────────────────────────────────────────────────────────
const { test, expect } = require('./fixtures');

const DEP = 'dep_ctx', RACK = 'rack_ctx_0';
const PHASES = ['mechanical', 'power', 'network', 'compute', 'validation'];

function seed() {
  const now = 1750000000000;
  const slots = [];
  for (let i = 0; i < 8; i++) slots.push({ uStart: 1 + i * 5, uEnd: 4 + i * 5, type: 'gpu',
    name: 'g' + i, dns: 'g' + i, model: 'HGX', status: 'racked' });
  return {
    phantom_deployments_v1: JSON.stringify([{ id: DEP, name: 'AUS-01 BUILD', status: 'active',
      buildLead: 'J. Hamilton', created: now, updated: now, createdAt: now, updatedAt: now,
      rackCount: 1, phaseCount: 5 }]),
    phantom_deploy_racks_v1: JSON.stringify([{ id: RACK, deploymentId: DEP, rackId: 'l1:001',
      room: 'HALL-1', totalU: 48, slots, notes: '', powerCircuits: [], currentPhase: 'network',
      hosts: [{ dns: 'g0', platform: 'HGX', type: 'gpu', installed: true }] }]),
    phantom_deploy_phases_v1: JSON.stringify(PHASES.map((t, i) => ({
      id: 'phase_' + RACK + '_' + t, deploymentId: DEP, rackId: RACK, type: t, seqOrder: i + 1,
      status: i < 2 ? 'complete' : (i === 2 ? 'in_progress' : 'pending'),
      tasksTotal: 0, tasksDone: 0, signedOffBy: null, signedOffAt: null,
      _gateOverride: false, _notes: '' }))),
    phantom_active_deployment: DEP, phantom_manifest_last_deploy: DEP,
  };
}

// Read back the context each mount actually holds. getContext on an EXISTING canvas returns the
// context three.js already owns, so this is a read and never a second allocation.
const contexts = (page) => page.evaluate(() => {
  const read = (id) => {
    const el = document.getElementById(id);
    if (!el) return 'absent';
    const cv = el.querySelector('canvas');
    if (!cv) return 'no-canvas';
    try {
      const g = cv.getContext('webgl2') || cv.getContext('webgl');
      if (!g) return 'refused';
      return g.isContextLost() ? 'lost' : 'live';
    } catch (_) { return 'threw'; }
  };
  const all = Array.from(document.querySelectorAll('canvas')).filter((cv) => {
    try { const g = cv.getContext('webgl2') || cv.getContext('webgl'); return !!g && !g.isContextLost(); }
    catch (_) { return false; }
  });
  return { bw: read('bw-mount'), reh: read('reh3dMount'),
    opsDetail: document.body.classList.contains('ops-detail'), liveTotal: all.length };
});

test.describe('the one WebGL context follows the visible surface', () => {

  test('⛔ THE RACK DETAIL DRAWS — it held an empty 60vh box before .441', async ({ phantom, page }) => {
    test.setTimeout(240_000);
    await phantom.boot({ seed: seed() });

    await page.evaluate(() => showMode('work'));
    await page.waitForTimeout(3000);
    const build = await contexts(page);
    expect(build.bw, 'Build opened cold and its rack preview has no live context').toBe('live');

    await page.evaluate((i) => deploy_showRackDetail(i.d, i.r), { d: DEP, r: RACK });
    await page.waitForTimeout(3000);
    const detail = await contexts(page);
    expect(detail.opsDetail, 'the rack detail did not take the screen — the test proves nothing').toBe(true);
    // THE ASSERTION. Before .441 this was 'no-canvas' forever: Build's re-arm disposed this mount
    // on every retry, so the rack area stayed an empty black 60vh box over a hidden U1-U48 rail.
    expect(detail.reh, 'the rack detail rendered NO rack — the empty-box defect is back').toBe('live');
    // And Build must have let go, because there is only ever one (Contract A6).
    expect(detail.bw, 'Build kept its context while the detail owned the screen').not.toBe('live');
  });

  test('the context comes BACK to Build on return', async ({ phantom, page }) => {
    test.setTimeout(240_000);
    await phantom.boot({ seed: seed() });
    await page.evaluate(() => showMode('work'));
    await page.waitForTimeout(2500);
    await page.evaluate((i) => deploy_showRackDetail(i.d, i.r), { d: DEP, r: RACK });
    await page.waitForTimeout(2500);
    await page.evaluate(() => { if (typeof nav_back === 'function') nav_back(); });
    await page.waitForTimeout(3000);

    const back = await contexts(page);
    expect(back.opsDetail, 'the rack detail never released the screen').toBe(false);
    // The half that matters most: deferring must not COST Build its preview. A guard that made
    // Build permanently blank would trade one empty rack area for another.
    expect(back.bw, 'Build came back from the rack detail with a dead rack preview').toBe('live');
  });

  test('Contract A6 — exactly one live context, on every surface', async ({ phantom, page }) => {
    test.setTimeout(240_000);
    await phantom.boot({ seed: seed() });

    await page.evaluate(() => showMode('work'));
    await page.waitForTimeout(2500);
    expect((await contexts(page)).liveTotal, 'more than one live WebGL context on Build').toBe(1);

    await page.evaluate((i) => deploy_showRackDetail(i.d, i.r), { d: DEP, r: RACK });
    await page.waitForTimeout(2500);
    // Exact, not "<= 1": the pre-.441 defect value was ONE — Build's — while the surface the
    // technician was looking at had none. A bound of "at most one" called that healthy.
    expect((await contexts(page)).liveTotal, 'not exactly one live WebGL context on the rack detail').toBe(1);

    await page.evaluate(() => { if (typeof nav_back === 'function') nav_back(); });
    await page.waitForTimeout(2500);
    expect((await contexts(page)).liveTotal, 'not exactly one live WebGL context back on Build').toBe(1);
  });

  test('the deferral is stated, never silent', async ({ phantom, page }) => {
    test.setTimeout(240_000);
    const warns = [];
    page.on('console', (m) => { if (m.type() === 'warning') warns.push(m.text()); });
    await phantom.boot({ seed: seed() });
    await page.evaluate(() => showMode('work'));
    await page.waitForTimeout(2000);
    await page.evaluate((i) => deploy_showRackDetail(i.d, i.r), { d: DEP, r: RACK });
    await page.waitForTimeout(2500);
    // Contract 14. Build stepping aside is the CORRECT outcome, so it must not toast over a
    // surface the technician is not looking at — but it must not vanish either.
    expect(warns.join(' '), 'Build deferred to the rack detail without saying so')
      .toContain('rack detail owns the screen');
  });
});
