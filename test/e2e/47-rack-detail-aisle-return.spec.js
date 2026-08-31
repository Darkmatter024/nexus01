// ─────────────────────────────────────────────────────────────────────────────
// 47 — THE RACK COMES BACK AFTER THE AISLE (v1.14.557)
//
// THE DEFECT. v1.14.531 (Ship A) deleted #reh3dMount and the reh3d_restore() call inside
// deploy_showRackDetail. But reh3d_activate3D has a SECOND caller — forge3d_close's no-lender
// branch (:19693) — which Ship A did not audit. Reached from there, the old code added .is-3d to
// #reh3dCanvasHost BEFORE looking for the mount, and :11119
// `body.rd .rack-hybrid-canvas.is-3d .reh-flat-wrap { display:none }` hides #rehFlatWrap — which
// since .531 is the ONLY rack visual on the page. The mount lookup then returned null,
// rackElevation_ensure3D early-returned, and nothing removes the class again (only reh3d_fail
// does, and it is never reached because no load was attempted).
//
// WHY IT HID. Nothing throws anywhere on the path. The .461 instrument measures the OPS host,
// which survives at 51px — above its own 8px floor — so no warning and no toast fired while the
// rack itself sat at 0px. And it self-heals on any re-render (c.innerHTML at :41730), so it
// presented as intermittent: "sometimes the rack is missing."
//
// WHY THE BUILD PATH LOOKED FINE. forge3d_open captures its lender from RackEngine.active().
// After .531 the rack detail registers NOTHING — rackElevation_render3D (:40773) is the only
// non-aisle registrar and this page no longer calls it. Opened from Build, Build's own preview is
// the lender and close hands the context back, never reaching reh3d_activate3D. Opened from Home,
// there is no lender at all. That is the whole difference, and it is why this survived review.
//
// ⚠ MEASUREMENT. #rehFlatWrap is `display: contents` (:11117) and therefore has NO box of its
// own — measuring IT for height reports a false zero even when the rack renders perfectly. The
// honest instrument is its child #rackCanvas (:40794). This is the recorded
// display:contents-killing-a-measured-mount class, and it failed the first probe of this bug.
// ─────────────────────────────────────────────────────────────────────────────
const { test, expect } = require('./fixtures');

const DEP = 'dep_ar', RACK = 'rack_ar_0';
const PHASES = ['mechanical', 'power', 'network', 'compute', 'validation'];

function seed() {
  const now = 1750000000000;
  const slots = [];
  for (let i = 0; i < 5; i++) slots.push({ uStart: 1 + i * 5, uEnd: 4 + i * 5, type: 'gpu',
    name: 'g' + i, dns: 'g' + i, model: 'HGX', status: i < 2 ? 'racked' : 'pending' });
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
      tasksTotal: 0, tasksDone: 0, signedOffBy: null, signedOffAt: null, _gateOverride: false, _notes: '' }))),
    phantom_active_deployment: DEP,
    phantom_manifest_last_deploy: DEP,
  };
}

// What the technician can actually see of the rack. Measures #rackCanvas, never the
// display:contents wrapper — see the header note.
const elevation = (page) => page.evaluate(() => {
  const wrap = document.getElementById('rehFlatWrap');
  const host = document.getElementById('reh3dCanvasHost');
  const canvas = document.getElementById('rackCanvas');
  const vis = (el) => {
    if (!el) return false;
    const cs = getComputedStyle(el);
    return cs.display !== 'none' && cs.visibility !== 'hidden' && el.getBoundingClientRect().height > 0;
  };
  return {
    flatWrapDisplay: wrap ? getComputedStyle(wrap).display : '(absent)',
    flatVisible: vis(canvas),
    flatHeight: canvas ? Math.round(canvas.getBoundingClientRect().height) : -1,
    hostIs3d: !!host && host.classList.contains('is-3d'),
    hostHeight: host ? Math.round(host.getBoundingClientRect().height) : -1,
    mountPresent: !!document.getElementById('reh3dMount'),
  };
});

async function aisleRoundTrip(page) {
  await page.evaluate(() => { forge3d_open(); });
  await page.waitForTimeout(2500);
  await page.evaluate(() => { forge3d_close(); });
  await page.waitForTimeout(1200);
}

test.describe('the rack comes back after the aisle', () => {

  // ── CONTROL 1. Proves the fixture reaches a real rack detail before anything is asserted about
  // losing it. Passes before and after the fix; a failure here means the test is broken, not the app.
  test('CONTROL: the flat elevation is the single rack visual and it renders', async ({ phantom, page }) => {
    test.setTimeout(180000);
    await phantom.boot({ seed: seed() });
    await page.evaluate(() => showWorkTab('deploy'));
    await page.waitForTimeout(1200);
    await page.evaluate((ids) => deploy_showRackDetail(ids.d, ids.r), { d: DEP, r: RACK });
    await page.waitForTimeout(1600);

    const e = await elevation(page);
    expect(e.mountPresent, '#reh3dMount is back — .531 removed it and nothing should re-add it').toBe(false);
    expect(e.flatVisible, 'the flat elevation did not render at all').toBe(true);
    expect(e.hostIs3d, 'the host started in .is-3d with no mount to draw into').toBe(false);
  });

  // ── THE DEFECT, through the real door. FAILS without the guard.
  test('⛔ FROM HOME: opening and closing the aisle must not take the rack with it', async ({ phantom, page }) => {
    test.setTimeout(180000);
    await phantom.boot({ seed: seed() });
    await page.evaluate(() => showMode('command'));
    await page.waitForTimeout(800);
    // The deep-link / back-nav restore reaches this from wherever the operator is, so Build's 3D
    // preview never mounts and no lender is ever captured.
    await page.evaluate((ids) => deploy_showRackDetail(ids.d, ids.r), { d: DEP, r: RACK });
    await page.waitForTimeout(1600);

    const before = await elevation(page);
    expect(before.flatVisible, 'precondition: the elevation must be up before the aisle opens').toBe(true);

    const lender = await page.evaluate(() => {
      try { const a = RackEngine.active(); return a ? { kind: a.kind } : null; } catch (e) { return 'threw'; }
    });
    expect(lender, 'this path is supposed to have NO lender — if it gained one the test no longer covers the branch').toBeNull();

    await aisleRoundTrip(page);
    const after = await elevation(page);

    expect(after.hostIs3d,
      'forge3d_close put the host into .is-3d with no mount — hostHeight=' + after.hostHeight).toBe(false);
    expect(after.flatVisible,
      'THE DEFECT: the rack elevation is gone after the aisle round trip. flatHeight='
      + after.flatHeight + ' wrapDisplay=' + after.flatWrapDisplay).toBe(true);
  });

  // ── THE GUARD ITSELF. FAILS without the fix. Calls the function the way forge3d_close's
  // no-lender branch does, with no aisle involved, so the assertion is about the guard alone.
  test('⛔ THE GUARD: reh3d_activate3D must not claim a host it cannot draw into', async ({ phantom, page }) => {
    test.setTimeout(180000);
    await phantom.boot({ seed: seed() });
    await page.evaluate(() => showWorkTab('deploy'));
    await page.waitForTimeout(1200);
    await page.evaluate((ids) => deploy_showRackDetail(ids.d, ids.r), { d: DEP, r: RACK });
    await page.waitForTimeout(1600);
    expect((await elevation(page)).flatVisible, 'precondition: elevation must be visible first').toBe(true);

    await page.evaluate(() => reh3d_activate3D());
    await page.waitForTimeout(600);
    const after = await elevation(page);

    expect(after.hostIs3d,
      '.is-3d was added with #reh3dMount absent — the class must be gated on the mount').toBe(false);
    expect(after.flatVisible,
      'the flat elevation was hidden by a 3D view that never mounted. flatHeight=' + after.flatHeight).toBe(true);
  });

  // ── CONTROL 2. The lender path was never broken; the fix must not disturb it. Passes before and
  // after — this is what catches a "fix" that neuters forge3d_close's reacquire handoff instead.
  test('CONTROL: the Build path still hands the context back on close', async ({ phantom, page }) => {
    test.setTimeout(180000);
    await phantom.boot({ seed: seed() });
    await page.evaluate(() => showWorkTab('deploy'));
    await page.waitForTimeout(1200);
    await page.evaluate((ids) => deploy_showRackDetail(ids.d, ids.r), { d: DEP, r: RACK });
    await page.waitForTimeout(1600);

    const lender = await page.evaluate(() => {
      try { const a = RackEngine.active(); return a ? { kind: a.kind, hasReacquire: typeof a.reacquire === 'function' } : null; }
      catch (e) { return 'threw'; }
    });
    expect(lender, 'the Build path lost its lender — forge3d_close would now fall to the no-lender branch').not.toBeNull();

    await aisleRoundTrip(page);
    const after = await elevation(page);
    expect(after.flatVisible, 'the Build round trip lost the rack. flatHeight=' + after.flatHeight).toBe(true);
    expect(after.hostIs3d, 'the Build round trip left the host in .is-3d').toBe(false);
  });
});
