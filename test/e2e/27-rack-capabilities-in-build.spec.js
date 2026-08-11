// ─────────────────────────────────────────────────────────────────────────────
// 27 — THE RACK DETAIL'S CAPABILITIES COME HOME (v1.14.438 · merge step 2 of 4)
//
// Measured at .437: the rack-detail surface is a SECOND Build workspace. Both carry the current
// rack, the next action, OPEN AISLE, a rack elevation and phase state. The ONLY things that existed
// solely there were ASSIGN, QR and LOG NOTE — three capabilities a technician could reach only by
// leaving the operational centre for a parallel screen doing the same job. Contract A7: Build IS
// the operational centre.
//
// ⛔ ADDITIVE BY DESIGN. The rack detail keeps working and keeps its own buttons. Retiring it is the
// LAST step, after the phase dock moves, because the back-nav restore path lands there and .437
// only just made that landing coherent. This spec asserts BOTH halves of that.
// ─────────────────────────────────────────────────────────────────────────────
const { test, expect } = require('./fixtures');

const DEP = 'dep_cap', RACK = 'rack_cap_0';
const PHASES = ['mechanical', 'power', 'network', 'compute', 'validation'];

function seed() {
  const now = 1750000000000;
  const slots = [];
  for (let i = 0; i < 5; i++) slots.push({ uStart: 1 + i * 5, uEnd: 4 + i * 5, type: 'gpu',
    name: 'g' + i, dns: 'g' + i, model: 'HGX', status: i < 2 ? 'racked' : 'pending' });
  return {
    phantom_deployments_v1: JSON.stringify([{ id: DEP, name: 'AUS-01 BUILD', status: 'active',
      buildLead: 'J. Hamilton', created: now, updated: now, createdAt: now, updatedAt: now, rackCount: 1, phaseCount: 5 }]),
    phantom_deploy_racks_v1: JSON.stringify([{ id: RACK, deploymentId: DEP, rackId: 'l1:001', room: 'HALL-1',
      totalU: 48, slots, notes: '', powerCircuits: [], currentPhase: 'network',
      hosts: [{ dns: 'g0', platform: 'HGX', type: 'gpu', installed: true }] }]),
    phantom_deploy_phases_v1: JSON.stringify(PHASES.map((t, i) => ({
      id: 'phase_' + RACK + '_' + t, deploymentId: DEP, rackId: RACK, type: t, seqOrder: i + 1,
      status: i < 2 ? 'complete' : (i === 2 ? 'in_progress' : 'pending'),
      tasksTotal: 0, tasksDone: 0, signedOffBy: null, signedOffAt: null, _gateOverride: false, _notes: '' }))),
    phantom_active_deployment: DEP, phantom_manifest_last_deploy: DEP,
  };
}

const buildActions = (page) => page.evaluate(() =>
  Array.from(document.querySelectorAll('#bw-shell .bw-acts button'))
    .filter((b) => b.getBoundingClientRect().height > 0)
    .map((b) => (b.textContent || '').trim()));

test.describe('the rack capabilities live in Build', () => {

  test('ASSIGN, QR and LOG NOTE are reachable from the operational centre', async ({ phantom, page }) => {
    test.setTimeout(180_000);
    await phantom.boot({ seed: seed() });
    await page.evaluate(() => showMode('work'));
    await page.waitForTimeout(1500);
    const acts = await buildActions(page);
    for (const label of ['Assign', 'QR', 'Log note']) {
      expect(acts, `${label} is still only on the rack-detail surface`).toContain(label);
    }
    // The ones that were already there must not have been displaced.
    expect(acts).toContain('Scan');
    expect(acts).toContain('Log blocker');
  });

  test('⛔ THEY ARE THE SAME DOORS, not copies — and all three are reachable', async ({ phantom, page }) => {
    await phantom.boot({ seed: seed() });
    const reachable = await page.evaluate(() => ({
      assign: typeof window.deploy_assignRack,
      qr: typeof window.deploy_generateRackQR,
      note: typeof window.stripeRack_logNote,
    }));
    // ⚠ Worth pinning: two of these are `async function` declarations, which a `^function` grep
    // misses. If any ever becomes IIFE-scoped, Build's buttons go dead — the exact trap that has
    // bitten this file before (showToast, deploy_forge_master, statusOf).
    expect(reachable.assign, 'deploy_assignRack is not reachable at page scope').toBe('function');
    expect(reachable.qr, 'deploy_generateRackQR is not reachable at page scope').toBe('function');
    expect(reachable.note, 'stripeRack_logNote is not reachable at page scope').toBe('function');
  });

  test('Contract 14 — with no rack resolved the buttons are ABSENT, not dead', async ({ phantom, page }) => {
    test.setTimeout(180_000);
    // No deployment, no rack: there is nothing to assign, label or annotate.
    await phantom.boot();
    await page.evaluate(() => showMode('work'));
    await page.waitForTimeout(1500);
    const acts = await buildActions(page);
    for (const label of ['Assign', 'QR', 'Log note']) {
      expect(acts, `${label} is offered with no rack to act on — a dead control`).not.toContain(label);
    }
  });

  test('ADDITIVE — the rack detail still works and still has its own buttons', async ({ phantom, page }) => {
    test.setTimeout(180_000);
    await phantom.boot({ seed: seed() });
    await page.evaluate((i) => deploy_showRackDetail(i.d, i.r), { d: DEP, r: RACK });
    await page.waitForTimeout(1600);
    const detail = await page.evaluate(() =>
      Array.from(document.querySelectorAll('button')).filter((b) => b.getBoundingClientRect().height > 0)
        .map((b) => (b.textContent || '').trim().replace(/\s+/g, ' ')));
    // Retiring the detail is the LAST step of the merge, not this one. Deleting it here would strand
    // the back-nav restore path that .437 just made coherent.
    expect(detail.join(' '), 'the rack detail lost ASSIGN — this step is meant to be additive').toMatch(/ASSIGN/i);
    expect(detail.join(' '), 'the rack detail lost QR').toMatch(/\bQR\b/i);
    expect(detail.join(' '), 'the rack detail lost LOG NOTE').toMatch(/LOG NOTE/i);
  });

  test('the new buttons fail LOUDLY if a door goes missing', async ({ phantom, page }) => {
    await phantom.boot({ seed: seed() });
    const src = await page.evaluate(() => String(bw_render));
    expect(src).toContain('phantom_logErr');
    expect(src).toContain('phantomToast');
  });
});
