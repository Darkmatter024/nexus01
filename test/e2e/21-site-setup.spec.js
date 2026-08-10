// ─────────────────────────────────────────────────────────────────────────────
// 21 — SITE SETUP, the guided first-run flow (v1.14.431, spec §4.1)
//
// Welcome → Site → Site Lead → Operator (defaults to Site Lead, editable) → Master.
//
// WHY IT WAS BUILT BEFORE THE BOOT GATE. Spec §3 routes a first run to "Site Setup (§4)" and that
// destination did not exist: rd_openProfile is a profile EDITOR — text fields, no Master step — so
// gating against it would have sent a fresh device to a form that never mentions a Master. The
// gate is the last 10% of this feature.
//
// WHAT THIS PINS, and every item is a rule that already cost something elsewhere:
//   · the operator DEFAULTS to the Site Lead — a value WRITTEN once, not a read-time fallback
//     (`.418`: a coalesce silently granted lead-only RBAC to an empty actor)
//   · MERGE, NEVER OVERWRITE — an empty field never blanks a value a human set (Law 11)
//   · confirmedAt is written ONLY once a Master is actually active, so an abandoned setup can
//     never present itself as a finished one
//   · the Master step calls the ONE import door; §4.2 forbids a second write path
// ─────────────────────────────────────────────────────────────────────────────
const { test, expect } = require('./fixtures');

// A GENUINE first run. phantom.boot() seeds a configured device (operator E2E, confirmedAt set),
// so asserting first-run behaviour against it tests the wrong device entirely — the code was
// right both times this caught me: it declined to overwrite an operator and declined to invent a
// confirmation. Clearing the key is what makes the assertion mean what it says.
const firstRun = (page) => page.evaluate(() => { localStorage.removeItem(SITE_PROFILE_KEY); });

const open = (page) => page.evaluate(() => { siteSetup_open(); });
const stepLabel = (page) => page.locator('#setup-step-label').textContent();
const type = async (page, value) => { await page.locator('#setup-input').fill(value); };
const next = (page) => page.evaluate(() => siteSetup_next());
const back = (page) => page.evaluate(() => siteSetup_back());
const state = (page) => page.evaluate(() => {
  const p = siteProfile_load() || {};
  return { facilityId: p.facilityId || '', siteLead: p.siteLead || '', operator: p.operator || '', confirmedAt: p.confirmedAt || null };
});

test.describe('site setup — the guided first-run flow', () => {

  test('the sheet exists, opens, and walks the five steps in spec order', async ({ phantom, page }) => {
    await phantom.boot();
    await expect(page.locator('#rd-setup-sheet')).toHaveCount(1);
    await open(page);
    await expect(page.locator('#rd-setup-sheet')).toHaveClass(/open/);

    expect(await stepLabel(page)).toBe('WELCOME');
    await next(page); expect(await stepLabel(page)).toBe('SITE');
    await next(page); expect(await stepLabel(page)).toBe('SITE LEAD');
    await next(page); expect(await stepLabel(page)).toBe('OPERATOR');
    await next(page); expect(await stepLabel(page)).toBe('MASTER');
  });

  test('THE OPERATOR DEFAULTS TO THE SITE LEAD — written, not coalesced at read time', async ({ phantom, page }) => {
    await phantom.boot();
    await firstRun(page);
    await open(page);
    await next(page);                       // SITE
    await type(page, 'DFW-01'); await next(page);
    await type(page, 'John Hamilton'); await next(page);   // SITE LEAD -> defaults operator

    // The operator step must be PRE-FILLED with the lead, and it must be editable.
    await expect(page.locator('#setup-input')).toHaveValue('John Hamilton');
    await type(page, 'R. Diaz');            // editable — the actor is not the authority
    await next(page);

    const s = await page.evaluate(() => ({ site: _setupState.site, lead: _setupState.lead, op: _setupState.operator }));
    expect(s).toEqual({ site: 'DFW-01', lead: 'John Hamilton', op: 'R. Diaz' });
  });

  test('typing is not lost on BACK — capture happens before the step moves', async ({ phantom, page }) => {
    await phantom.boot();
    await open(page);
    await next(page);
    await type(page, 'AUS-01');
    await next(page);                       // to SITE LEAD, capturing the site
    await back(page);                       // and back again
    await expect(page.locator('#setup-input'), 'the site was lost on a Back tap').toHaveValue('AUS-01');
  });

  test('the MASTER step is BLOCKED until site, lead and operator are set', async ({ phantom, page }) => {
    await phantom.boot();
    await open(page);
    await page.evaluate(() => { _setupState.step = 4; siteSetup_render(); });
    await expect(page.locator('#setup-master-btn'), 'the Master step offered itself with no identity').toBeDisabled();

    await page.evaluate(() => {
      _setupState.site = 'DFW-01'; _setupState.lead = 'J. Hamilton'; _setupState.operator = 'J. Hamilton';
      siteSetup_render();
    });
    await expect(page.locator('#setup-master-btn')).toBeEnabled();
  });

  test('⛔ confirmedAt is NOT written until a Master is actually active', async ({ phantom, page }) => {
    await phantom.boot();
    await firstRun(page);
    await open(page);
    await page.evaluate(() => {
      _setupState.site = 'DFW-01'; _setupState.lead = 'J. Hamilton'; _setupState.operator = 'J. Hamilton';
      siteSetup_writeIdentity();
    });
    const s = await state(page);
    // Identity persists immediately so a mid-import abort does not cost the operator their typing…
    expect(s.facilityId).toBe('DFW-01');
    expect(s.siteLead).toBe('J. Hamilton');
    // …but the profile is NOT confirmed. An abandoned setup that reported itself finished would
    // satisfy the boot gate with no Master behind it — the exact state the gate exists to catch.
    expect(s.confirmedAt, 'setup marked the profile CONFIRMED with no active Master').toBeNull();
    expect(await page.evaluate(() => PHANTOM_SITE.validity().ok),
      'a profile with no Master must not validate').toBe(false);
  });

  test('⛔ THE v1.6.70 BACKFILL STILL FIRES for existing devices — nobody is re-prompted', async ({ phantom, page }) => {
    await phantom.boot();
    // A profile saved by the EDITOR before confirmedAt existed: lastUpdated, no marker. Its
    // premise — "saved via the editor means a human confirmed it" — is still true and must stay
    // true, or every existing device gets sent back through setup. This is the half of the
    // exception that protects the field, and it is easy to break while fixing the other half.
    const confirmed = await page.evaluate(() => {
      localStorage.setItem(SITE_PROFILE_KEY, JSON.stringify({
        facilityId: 'OLD-01', siteLead: 'Legacy Lead', operator: 'Legacy Op',
        lastUpdated: 1700000000000, schemaVersion: 2,
      }));
      return !!siteProfile_load().confirmedAt;
    });
    expect(confirmed, 'an existing editor-saved profile stopped reading as confirmed — every device in the field would be re-prompted').toBe(true);
  });

  test('⛔ …but a SETUP-IN-PROGRESS profile does NOT backfill — the gate would have been fooled', async ({ phantom, page }) => {
    await phantom.boot();
    const r = await page.evaluate(() => {
      localStorage.setItem(SITE_PROFILE_KEY, JSON.stringify({
        facilityId: 'HALF-01', siteLead: 'Half Lead', operator: 'Half Op',
        lastUpdated: 1700000000000, setupInProgress: true, schemaVersion: 2,
      }));
      const p = siteProfile_load();
      return { confirmedAt: p.confirmedAt || null, valid: PHANTOM_SITE.validity().ok };
    });
    // Someone opened setup, typed a site, and quit before choosing a Master. save() stamps
    // lastUpdated on every write, so without the marker this reads back CONFIRMED and satisfies a
    // confirmedAt-based boot gate with no Master behind it.
    expect(r.confirmedAt, 'an abandoned setup read back as CONFIRMED').toBeNull();
    expect(r.valid, 'an abandoned setup validated').toBe(false);
  });

  test('MERGE, NEVER OVERWRITE — an empty field cannot blank a value a human set (Law 11)', async ({ phantom, page }) => {
    await phantom.boot();
    await page.evaluate(() => {
      const p = siteProfile_load() || {};
      p.facilityId = 'KEEP-ME'; p.siteLead = 'Keep Lead'; p.operator = 'Keep Op';
      siteProfile_save(p);
    });
    await open(page);
    // Someone opens setup from SYSTEM, clears a field, and closes. Nothing may be destroyed.
    await page.evaluate(() => {
      _setupState.site = ''; _setupState.lead = ''; _setupState.operator = '';
      siteSetup_writeIdentity();
    });
    const s = await state(page);
    expect(s.facilityId, 'an empty input blanked the site').toBe('KEEP-ME');
    expect(s.siteLead, 'an empty input blanked the site lead').toBe('Keep Lead');
    expect(s.operator, 'an empty input blanked the operator').toBe('Keep Op');
  });

  test('it PRE-FILLS from the existing profile, so it is re-runnable from SYSTEM', async ({ phantom, page }) => {
    await phantom.boot();
    await page.evaluate(() => {
      const p = siteProfile_load() || {};
      p.facilityId = 'SPK-03'; p.siteLead = 'A. Lead'; p.operator = 'B. Actor';
      siteProfile_save(p);
    });
    await open(page);
    const s = await page.evaluate(() => ({ site: _setupState.site, lead: _setupState.lead, op: _setupState.operator }));
    expect(s).toEqual({ site: 'SPK-03', lead: 'A. Lead', op: 'B. Actor' });
  });

  test('THE ONE DOOR — setup imports nothing itself (§4.2, no second write path)', async ({ phantom, page }) => {
    await phantom.boot();
    // The Master step must go through master_loadFromPicker. Anything else would be a second
    // writer to Master state, which is the whole reason the SINGLE-MASTER arc exists.
    const src = await page.evaluate(() => String(siteSetup_chooseMaster));
    expect(src, 'the Master step does not call the one import door').toContain('master_loadFromPicker');
    expect(src, 'setup is parsing a workbook itself — that is a second write path').not.toContain('phantom_parseMaster');
    expect(src, 'setup is staging its own candidate — that is a second write path').not.toContain('PHANTOM_MASTER.stage');
    expect(src, 'setup is activating its own candidate — that is a second write path').not.toContain('activateStaged');
  });

  test('there is a real DOOR into setup, and it is redesign-only', async ({ phantom, page }) => {
    await phantom.boot();
    const door = page.locator('button[aria-label="Run site setup"]');
    await expect(door, 'no entry point exists — an unreachable feature is a dead control').toHaveCount(1);

    await phantom.boot({ query: '?legacy=1' });
    expect(await phantom.isRedesign()).toBe(false);
    // The sheet is body.rd + .open gated, so legacy can never compose it.
    const composed = await page.evaluate(() => {
      const el = document.getElementById('rd-setup-sheet');
      if (!el) return 'absent';
      el.classList.add('open');
      const d = getComputedStyle(el).display;
      el.classList.remove('open');
      return d;
    });
    expect(composed, 'the setup sheet composed in the legacy house — Rule 17').toBe('none');
  });
});
