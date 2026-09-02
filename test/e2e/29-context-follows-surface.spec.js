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
    // ⭐ REWRITTEN AT v1.14.561 — THIS ASSERTED A DESIGN THAT `.531` RETIRED. It required
    // `detail.reh === 'live'`: a live WebGL context at #reh3dMount. But `.531` (Ship A of
    // RACK-DETAIL-CLEANUP, owner-approved) DELETED #reh3dMount as the dead half of a two-surface
    // card, making the FLAT elevation the single rack visual on this page. The element is gone, so
    // 'absent' is now the CORRECT reading and this test had been red since 2026-08-29 — unnoticed,
    // because no full sweep ran between `.531` and 2026-09-01.
    // ⛔ THE INVARIANT THIS SPEC EXISTS FOR IS UNCHANGED AND STILL ASSERTED BELOW: the rack detail
    // must DRAW A RACK, and Build must let go of the one context. Only the mechanism moved — from a
    // GL mount to the flat rail — so the assertion follows the mechanism rather than being deleted.
    expect(detail.reh, 'a WebGL mount is back on the rack detail — `.531` made the flat elevation '
      + 'the single visual here; two surfaces is the card that shipped empty').toBe('absent');
    // The rack detail must still show SOMETHING of the rack. This is the half of the original
    // assertion that was never about WebGL.
    // ⚠ v1.14.565 (Ship 2a) — THE INSTRUMENT MOVED FOR THE SECOND TIME, AND FOR THE SAME REASON.
    // It was a WebGL mount until `.531`, then #rackCanvas (the flat elevation) until here. Ship 2a
    // removed the elevation and the minimap from this surface by owner ruling, so what a tech can
    // see of the rack is now the DEVICES list — which `.564` made the primary home of the U data.
    // The assertion follows the mechanism rather than being deleted; only the mechanism moved.
    const flat = await page.evaluate(() => {
      const sum = Array.from(document.querySelectorAll('summary'))
        .find((el) => (el.textContent || '').trim().indexOf('DEVICES') === 0);
      if (!sum || !sum.parentElement) return { present: false };
      const d = sum.parentElement;
      const r = d.getBoundingClientRect();
      return { present: true, h: Math.round(r.height), rows: d.querySelectorAll('.gsk').length,
               visible: getComputedStyle(d).display !== 'none' && r.height > 0 };
    });
    expect(flat.present, 'the rack detail rendered NO device list — nothing of the rack is on screen').toBe(true);
    expect(flat.visible, `the rack detail drew nothing visible — the empty-box defect is back (h=${flat.h})`).toBe(true);
    // ⛔ THE ORIGINAL LAST ASSERTION WAS `expect(detail.bw).not.toBe('live')` — Build must hand the
    // context over. `.531` removed the thing it handed over TO, so Build now keeps it while the
    // detail draws a flat rack. ⚠ I AM DELIBERATELY NOT ASSERTING THAT THE NEW BEHAVIOUR IS
    // CORRECT, because I do not know that it is, and asserting it would be rewriting a test to
    // agree with whatever the code happens to do.
    // ⭐ WHAT IS CERTAIN, AND IS ASSERTED: the technician sees a rack (above), and Contract A6's
    // bound holds — exactly one live context in total, which `:129` pins on every surface.
    // ⏳ WHAT IS OPEN, AND IS AN OWNER QUESTION: should Build RELEASE its context while it is
    // off-screen? `:129`'s own comment records that the pre-`.441` defect value was also "one —
    // Build's — while the surface the technician was looking at had none". The shape is similar;
    // the difference is that the detail is no longer empty, it draws the flat elevation. An
    // off-screen surface holding a GPU context is still the pressure Contract A6 / spec I1 exist
    // to bound, and nobody has ruled on it since `.531` changed the picture. Recorded here rather
    // than silently encoded either way.
    const total = detail.liveTotal;
    expect(total, `Contract A6 bound broken: ${total} live contexts while the rack detail is up`).toBe(1);
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

    // ⭐ REWRITTEN AT v1.14.561, AND THE REASON MATTERS MORE THAN THE EDIT. This waited for the
    // warning to appear on its own after opening the rack detail. That worked while the detail took
    // the GL context from Build: the contention forced a re-acquisition, which hit the guard.
    // ⛔ `.531` DELETED the rack detail's mount, so there is no contention left — Build is never
    // asked to re-acquire here, the guard is never reached, and the wait produced ''. The GUARD is
    // fine; the SCENARIO stopped happening. The test had been red since 2026-08-29.
    // ⚠ HONEST ABOUT WHAT IS BEING TESTED NOW: this no longer proves the natural path emits the
    // warning, because no natural path reaches it. It proves the guard still EXISTS and still fires
    // when bw_mount3D runs while the detail owns the screen — which is what Contract 14 is about,
    // and which will matter again the moment anything re-introduces a context on this page.
    // Driving it directly is the honest way to keep the guard covered rather than deleting it.
    const opsDetailNow = await page.evaluate(() => document.body.classList.contains('ops-detail'));
    expect(opsDetailNow, 'the rack detail did not take the screen — the guard cannot be exercised').toBe(true);

    const src = await page.evaluate(() => String(bw_mount3D));
    expect(src, 'the ops-detail deferral guard is gone from bw_mount3D — Contract 14 silently lost')
      .toContain('rack detail owns the screen');

    warns.length = 0;
    await page.evaluate(() => {
      // The mount is Build's, and Build is not on screen; this is exactly the state the guard is for.
      const m = document.getElementById('bw-mount');
      try { bw_mount3D(window._bwProbeRack || null, m); } catch (_) { /* the guard returns before any render */ }
    });
    await page.waitForTimeout(400);
    expect(warns.join(' '), 'Build deferred to the rack detail without saying so')
      .toContain('rack detail owns the screen');
  });
});
