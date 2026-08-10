// ─────────────────────────────────────────────────────────────────────────────
// 21 — THE FIRST-RUN GATE (v1.14.432, spec §2 / §4.1)
//
// ⛔ WHY THIS FILE REPLACED 21-site-setup.spec.js, AND IT IS THE USEFUL PART.
// v1.14.431 built a NEW "Site Setup" flow on the finding that the boot gate had no destination.
// That finding was wrong. The destination existed and always had: `launch()` has ended with a
// first-run gate since v1.6.70 —
//     if (!siteProfile_isConfirmed() && typeof firstRun_show === 'function') firstRun_show();
// — and firstRun_show is a redesign-gated setup surface built against an APPROVED mock
// (new-device-setup-v2.html, v1.14.200) with a legacy fallback and a v1.14.346 Master pre-fill.
// The feature is named firstRun_*, not siteSetup_*, so a grep for the SPEC'S NAME found nothing
// and I concluded a whole feature was missing. **Search for the CONCEPT, and read what already
// runs at first boot, before building a second one.** .431 was reverted in .432 and its two
// genuinely-missing pieces folded into the canonical door.
//
// WHAT WAS ACTUALLY MISSING, measured rather than assumed:
//   · SITE LEAD — the gate predates the .417/.418 identity split and collected an operator only,
//     so AUTHORITY had no first-run home and every new device started with siteLead empty.
//   · THE MASTER STEP — it could pre-fill FROM a Master but never load one, so a genuinely new
//     device had to confirm, land on Home, and go find the importer.
// ─────────────────────────────────────────────────────────────────────────────
const { test, expect } = require('./fixtures');

const SITE_KEY = 'phantom_site_profile_v1';

/** A genuine first run: no stored profile at all. */
const firstRun = (page) => page.evaluate((k) => localStorage.removeItem(k), SITE_KEY);
const openGate = (page) => page.evaluate(() => firstRun_show());
const profile = (page) => page.evaluate(() => {
  const p = siteProfile_load() || {};
  return { operator: p.operator || '', siteLead: p.siteLead || '', facilityId: p.facilityId || '', confirmedAt: p.confirmedAt || null };
});

test.describe('the first-run gate', () => {

  test('THE GATE IS WIRED INTO BOOT — it is not a surface waiting for a door', async ({ phantom, page }) => {
    await phantom.boot();
    // The whole reason .431 was unnecessary: launch() already routes an unconfirmed device here.
    const src = await page.evaluate(() => String(launch));
    expect(src, 'launch() no longer calls the first-run gate').toContain('firstRun_show');
    expect(src, 'the gate is not conditioned on confirmation').toContain('siteProfile_isConfirmed');
  });

  test('SITE LEAD exists on the gate and DEFAULTS to the operator name', async ({ phantom, page }) => {
    await phantom.boot();
    await firstRun(page);
    await openGate(page);
    await expect(page.locator('#fr-siteLead'), 'the gate still has no Site Lead field').toHaveCount(1);

    await page.locator('#fr-operator').fill('J. Hamilton');
    await page.locator('#fr-facilityId').fill('DFW-01');
    await page.locator('#fr-siteLead').fill('');          // left blank on purpose
    await page.evaluate(() => firstRun_confirm());

    const p = await profile(page);
    // A DEFAULT is a value written once, not a read-time coalesce — .418 removed exactly that
    // fallback because it silently granted lead-only RBAC to an empty actor.
    expect(p.siteLead, 'a blank Site Lead did not default to the operator').toBe('J. Hamilton');
    expect(p.operator).toBe('J. Hamilton');
    expect(p.confirmedAt, 'confirming did not stamp confirmedAt').not.toBeNull();
  });

  test('SITE LEAD is independent of the operator — authority is not the actor', async ({ phantom, page }) => {
    await phantom.boot();
    await firstRun(page);
    await openGate(page);
    await page.locator('#fr-operator').fill('R. Diaz');
    await page.locator('#fr-facilityId').fill('AUS-01');
    await page.locator('#fr-siteLead').fill('J. Hamilton');
    await page.evaluate(() => firstRun_confirm());

    const p = await profile(page);
    expect(p.operator, 'the actor was overwritten by the authority').toBe('R. Diaz');
    expect(p.siteLead, 'the authority was overwritten by the actor').toBe('J. Hamilton');
  });

  test('THE MASTER STEP exists and uses the ONE door (§4.2, no second write path)', async ({ phantom, page }) => {
    await phantom.boot();
    await firstRun(page);
    await openGate(page);
    await expect(page.locator('#fr-master'), 'the gate cannot load a Master').toHaveCount(1);

    const src = await page.evaluate(() => String(firstRun_loadMaster));
    expect(src, 'the Master step does not call the one import door').toContain('master_loadFromPicker');
    expect(src, 'the gate parses a workbook itself — a second write path').not.toContain('phantom_parseMaster');
    expect(src, 'the gate stages its own candidate — a second write path').not.toContain('PHANTOM_MASTER.stage');
    expect(src, 'the gate activates its own candidate — a second write path').not.toContain('activateStaged');
  });

  test('the Master line is HONEST when nothing is loaded', async ({ phantom, page }) => {
    await phantom.boot();
    await page.evaluate(() => { try { PHANTOM_MASTER.clear(); } catch (_) {} });
    const line = await page.evaluate(() => firstRun_masterLine());
    // Never a placeholder count, never a guess — structural no-data is correct, not unfinished.
    expect(line).toMatch(/No Master loaded/i);
    expect(line, 'a count was invented with no Master').not.toMatch(/\d+\s*RACKS/i);
  });

  test('the Master line REPORTS what is loaded, from the Master itself', async ({ phantom, page }) => {
    await phantom.boot();
    await page.evaluate(() => {
      const racks = {};
      for (let r = 1; r <= 3; r++) {
        const id = 'l1:' + String(r).padStart(3, '0');
        racks[id] = { cabId: id, locode: 'AUS-01', cablesOut: [], cablesIn: [],
          hosts: [{ locCabRu: id + ':42', dns: id + '-sw', model: 'SN2201', source: 'SITE_HOSTS' }] };
      }
      PHANTOM_MASTER.replace({ racksByCab: racks, siteCode: 'AUS-01', sourceFile: 'FR.xlsx',
        sourceFileHash: 'fr', stats: { sourceFileHash: 'fr', totalCables: 0 } });
    });
    const line = await page.evaluate(() => firstRun_masterLine());
    expect(line).toContain('3 RACKS');
    expect(line).toContain('3 COMPONENTS');
    expect(line).toContain('FR.xlsx');
  });

  test('⛔ RULE 17 — the legacy branch has no Site Lead field, and confirm still works there', async ({ phantom, page }) => {
    await phantom.boot({ query: '?legacy=1' });
    expect(await phantom.isRedesign()).toBe(false);
    await firstRun(page);
    await openGate(page);

    // The legacy gate is untouched: same fields it always had, and no new one.
    await expect(page.locator('#fr-operator')).toHaveCount(1);
    await expect(page.locator('#fr-siteLead'), 'a redesign field leaked into the legacy gate').toHaveCount(0);

    // firstRun_confirm is SHARED by both branches. It must not throw on the missing element, and
    // must not invent a siteLead in a house that never offered the field.
    await page.locator('#fr-operator').fill('Legacy Tech');
    await page.locator('#fr-facilityId').fill('LEG-01');
    await page.evaluate(() => firstRun_confirm());

    const p = await profile(page);
    expect(p.operator, 'the legacy gate stopped saving the operator').toBe('Legacy Tech');
    expect(p.confirmedAt, 'the legacy gate stopped confirming').not.toBeNull();
    expect(p.siteLead, 'the legacy house wrote a Site Lead it never asked for').toBe('');
  });

  test('the v1.6.70 backfill is UNCHANGED — existing devices are never re-prompted', async ({ phantom, page }) => {
    await phantom.boot();
    // .431 added a `setupInProgress` exception for its own mid-flow save. That flow is gone, so
    // the exception went with it: firstRun_confirm writes ONCE, with confirmedAt in the same save,
    // and there is no mid-flow write for this backfill to misread.
    const confirmed = await page.evaluate((k) => {
      localStorage.setItem(k, JSON.stringify({
        facilityId: 'OLD-01', operator: 'Legacy Op', lastUpdated: 1700000000000, schemaVersion: 2,
      }));
      return !!siteProfile_load().confirmedAt;
    }, SITE_KEY);
    expect(confirmed, 'an existing editor-saved profile stopped reading as confirmed — every device in the field would be re-prompted').toBe(true);
  });

  test('the reverted flow left nothing behind', async ({ phantom, page }) => {
    await phantom.boot();
    const leftovers = await page.evaluate(() => ({
      fn: typeof window.siteSetup_open,
      sheet: document.querySelectorAll('#rd-setup-sheet').length,
      door: document.querySelectorAll('[aria-label="Run site setup"]').length,
    }));
    expect(leftovers, 'the .431 parallel flow is still partly present — a half-removed door is worse than either state').toEqual({ fn: 'undefined', sheet: 0, door: 0 });
  });
});
