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
//
// ⛔ BOTH OF THOSE ADDITIONS WERE LATER REMOVED ON PURPOSE, and this file did not follow for ~62
// versions. v1.14.474 ("Greenfield cold-open path … 2-field setup") took SITE LEAD and the MASTER
// step back off the gate; v1.14.480 took #fr-facilityId under an owner ruling that the Master is
// the single writer for site identity. The gate now collects exactly TWO fields: operator and
// facility name. Three tests here kept asserting the old gate and went red without anyone seeing
// it, because the suite was never re-run end to end — BATCH-VERIFY had already called it
// "unproven, not green". ⭐ They were found by adding this spec to an unrelated ship's test set.
// The three are re-pointed in v1.14.537; SITE LEAD now lives in SITE/SYSTEM, where Contract 9a
// always said it belonged.
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

  // ⛔ RE-POINTED v1.14.537. This test asserted SITE LEAD on the first-run GATE and had been red
  // for ~62 versions. v1.14.474's 2-field cold open removed that input deliberately, and Contract
  // 9a puts the value's home in SITE/SYSTEM anyway — "set at Site Setup and changed only in
  // SITE/SYSTEM". So the assertion moves to the door that now owns it, the SITE PROFILE editor.
  // ⚠ What it must NOT assert any more is the old "blank defaults to the operator" behaviour.
  // That default is the .418 defect wearing a different hat: it silently grants site authority to
  // whoever set the device up. The gate no longer collects it, and blank now means NO CHANGE.
  test('SITE LEAD is settable in SITE/SYSTEM — the door Contract 9a names', async ({ phantom, page }) => {
    await phantom.boot();
    await firstRun(page);

    // The editor owns this field now. Drive the real save path, not a copy of its logic.
    const written = await page.evaluate(() => {
      rd_openProfile();
      const el = document.getElementById('sp-siteLead');
      if (!el) return { field: false };
      el.value = 'J. Hamilton';
      siteProfile_saveFromEditor();
      const p = siteProfile_load();
      return { field: true, siteLead: p.siteLead, operator: p.operator };
    });

    expect(written.field, 'SITE/SYSTEM has no Site Lead field — the value is unsettable again').toBe(true);
    expect(written.siteLead, 'the editor did not persist the Site Lead').toBe('J. Hamilton');
  });

  test('a blank Site Lead is NO CHANGE, never an erase and never a silent grant', async ({ phantom, page }) => {
    await phantom.boot();
    await firstRun(page);

    const r = await page.evaluate(() => {
      rd_openProfile();
      const el = document.getElementById('sp-siteLead');
      if (!el) return { field: false };
      el.value = 'A. Okafor';
      siteProfile_saveFromEditor();
      // Re-open and save with the box emptied. .347: a blank box is "no change", not "erase".
      rd_openProfile();
      document.getElementById('sp-siteLead').value = '';
      siteProfile_saveFromEditor();
      return { field: true, siteLead: siteProfile_load().siteLead };
    });

    expect(r.field).toBe(true);
    expect(r.siteLead, 'a blank box erased the site authority — the .347 data-loss shape').toBe('A. Okafor');
  });

  // ⛔ RE-POINTED v1.14.537, for TWO removals, not one. It drove #fr-siteLead (gone in .474) and
  // #fr-facilityId — gone in .480 under an explicit owner ruling, "Master is single writer for
  // site identity". A test asserting the gate accepts typed site identity was asserting the exact
  // thing the owner forbade. The INVARIANT it exists for is untouched and still worth pinning:
  // authority and actor are two people (Contract 9a), and neither may overwrite the other.
  test('SITE LEAD is independent of the operator — authority is not the actor', async ({ phantom, page }) => {
    await phantom.boot();
    await firstRun(page);

    // The actor comes from the gate; the authority comes from SITE/SYSTEM. Two doors, two people.
    await openGate(page);
    await page.locator('#fr-operator').fill('R. Diaz');
    await page.evaluate(() => firstRun_confirm());

    const r = await page.evaluate(() => {
      rd_openProfile();
      const el = document.getElementById('sp-siteLead');
      if (!el) return { field: false };
      el.value = 'J. Hamilton';
      siteProfile_saveFromEditor();
      const p = siteProfile_load();
      return { field: true, operator: p.operator, siteLead: p.siteLead };
    });

    expect(r.field, 'SITE/SYSTEM has no Site Lead field').toBe(true);
    expect(r.operator, 'the actor was overwritten by the authority').toBe('R. Diaz');
    expect(r.siteLead, 'the authority was overwritten by the actor').toBe('J. Hamilton');
  });

  // ⛔ RE-POINTED v1.14.537. This asserted #fr-master exists; v1.14.474's 2-field cold open removed
  // that step, and the element is cleanly gone — zero references. The removal is a shipped,
  // device-verified decision, so the test follows it rather than pinning the old gate.
  // ⚠ FINDING, logged not acted on: firstRun_loadMaster SURVIVED its button and has ZERO callers.
  // It is orphaned code of the same class as --omni-h (.533) and crashcart_toggle (.534) — dead
  // body, door removed by an earlier ship. It is not deleted here because this ship is about
  // Site Lead authority, not cleanup. The ONE-DOOR assertions below still earn their keep: if
  // anyone re-wires that function to a new surface, it must still go through master_loadFromPicker.
  test('the Master step is GONE from the gate, and its orphan still honours the ONE door', async ({ phantom, page }) => {
    await phantom.boot();
    await firstRun(page);
    await openGate(page);
    await expect(page.locator('#fr-master'), 'the Master step is back on the gate — .474 removed it deliberately').toHaveCount(0);

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

  // ⚠ Contract 17's byte-identity guarantee was REVOKED by owner ruling 2026-08-29 (CLAUDE.md), so
  // this test no longer pins it. The surviving value is not about legacy at all: firstRun_confirm
  // is SHARED by both houses, and the assertions prove it neither throws on an absent element nor
  // invents a siteLead it was never given — a redesign-side guarantee that happens to be provable
  // through the legacy branch. Retire it with that branch, in the stage that removes it.
  test('shared firstRun_confirm survives a house with no Site Lead field — no throw, nothing invented', async ({ phantom, page }) => {
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
