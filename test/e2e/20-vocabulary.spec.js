// ─────────────────────────────────────────────────────────────────────────────
// 20 — ONE COLOUR VOCABULARY (v1.14.429, spec §7 / I9)
//
// The flat elevation wrote the RAW master_hostType code into data-type while the CSS was keyed on
// DISPLAY keys, so 9 of 11 device codes matched no rule and painted grey on every Master rack.
// This pins the door that closes it, the routing, and — the part that actually needs a guard —
// that routing it did NOT change the legacy house.
//
// ⛔ THE RULE-17 TRAP THIS SPEC EXISTS FOR. The base `.rack-canvas-block[data-type=...]` rules are
// NOT house-scoped and paint under ?legacy=1 too. Normalising the ATTRIBUTE changes what legacy
// MATCHES without touching one legacy rule: raw `stor` matches nothing and renders grey today,
// while normalised `storage` would hit the base rule and turn gold. A legacy behaviour change
// arrived at entirely through a redesign-house edit.
// ─────────────────────────────────────────────────────────────────────────────
const { test, expect } = require('./fixtures');

// Every raw code master_hostType can emit, with the display key _TMAP maps it to.
const CODES = [
  ['gpu', 'gpu'], ['sw', 'switch'], ['pwr', 'pdu'], ['patch', 'patch'], ['stor', 'storage'],
  ['cpu', 'server'], ['server', 'server'], ['cdu', 'pdu'], ['fw', 'switch'], ['media', 'media'],
  ['other', 'unknown'],
];
// Owner ruling 2026-08-10 (bay wins) + the standing 2026-08-06 ruling (these three stay grey).
const GREY = ['patch', 'media', 'unknown'];

test.describe('the one colour vocabulary', () => {

  test('typeOf maps every raw code to its display key', async ({ phantom, page }) => {
    await phantom.boot();
    const got = await page.evaluate((codes) => codes.map(([raw]) => [raw, Vocabulary.typeOf(raw)]), CODES);
    expect(got).toEqual(CODES);
  });

  test('typeOf is IDEMPOTENT — normalising twice never erases a device class', async ({ phantom, page }) => {
    await phantom.boot();
    // typeOf(typeOf('sw')) must be 'switch', not 'unknown'. A naive `_TMAP[k] || 'unknown'` returns
    // 'unknown' on the second pass, so any path normalising twice would silently downgrade real
    // gear to unclassified. Three levels deep, every code.
    const bad = await page.evaluate((codes) => codes.map(([raw]) => {
      const a = Vocabulary.typeOf(raw), b = Vocabulary.typeOf(a), c = Vocabulary.typeOf(b);
      return (a === b && b === c) ? null : { raw, a, b, c };
    }).filter(Boolean), CODES);
    expect(bad, `typeOf is not idempotent for: ${JSON.stringify(bad)}`).toEqual([]);
  });

  test('an unmapped code is UNKNOWN, never BLANK', async ({ phantom, page }) => {
    await phantom.boot();
    const r = await page.evaluate(() => ({
      junk: Vocabulary.typeOf('definitely-not-a-code'),
      empty: Vocabulary.typeOf(''),
      nul: Vocabulary.typeOf(null),
    }));
    // 'blank' is a POSITIVE claim that the U is empty. A `|| 'blank'` fallback once rendered 459
    // real SPARKS devices as blanking panels — unknown means "real gear we could not classify".
    expect(r.junk).toBe('unknown');
    expect(r.empty).toBe('unknown');
    expect(r.nul).toBe('unknown');
  });

  test('THE POINT: the flat elevation now paints 8 of 11 codes, and the RIGHT colours', async ({ phantom, page }) => {
    test.setTimeout(120_000);
    await phantom.boot();

    const paints = await page.evaluate((codes) => {
      const host = document.createElement('div');
      host.className = 'rack-canvas';
      document.body.appendChild(host);
      const out = {};
      codes.forEach(([raw]) => {
        const key = Vocabulary.typeOf(raw);
        const el = document.createElement('div');
        el.className = 'rack-canvas-block';
        el.setAttribute('data-type', key);
        host.appendChild(el);
        const cs = getComputedStyle(el);
        out[raw] = { key, accent: cs.borderLeftColor, bg: cs.backgroundColor };
      });
      // And what the 3D tray would paint for the same key — the two must not contradict.
      out.__bay = {};
      codes.forEach(([raw]) => { out.__bay[raw] = Vocabulary.colorOf(raw); });
      host.remove();
      return out;
    }, CODES);

    const GREY_RGB = 'rgb(125, 147, 164)';        // #7d93a4
    const DEFAULT_ACCENT = 'rgba(180, 194, 208, 0.35)';
    const DARK_TRAY = 'rgba(9, 13, 20, 0.9)';
    let coloured = 0;
    for (const [raw, key] of CODES) {
      const p = paints[raw];
      expect(p.key, `${raw} normalised wrong`).toBe(key);

      // ⛔ THE GUARD .429 NEEDED AND DID NOT HAVE. The redesign house paints these as a DARK tray
      // body with a thin type-colour LEFT accent — a ruling (.229), after .228 "over-filled to a
      // solid slab that drowned the label". .429 put the bay colours in `background`, which
      // outranks the dark base, and re-created that slab. The colour belongs in the ACCENT.
      expect(p.bg, `${raw} (${key}) has a filled body — the .228 slab is back, colour belongs in the accent`).toBe(DARK_TRAY);

      if (GREY.indexOf(key) >= 0) {
        expect(p.accent, `${raw} (${key}) must stay GREY per the 2026-08-06 ruling`).toBe(GREY_RGB);
      } else {
        expect(p.accent, `${raw} (${key}) still has the DEFAULT accent — the routing did not reach it`).not.toBe(DEFAULT_ACCENT);
        expect(p.accent, `${raw} (${key}) is grey, so the routing did not reach it`).not.toBe(GREY_RGB);
        coloured++;
      }
    }
    // 2/11 before this ship, 8/11 after — the number the ruling was made against.
    expect(coloured, 'colour coverage is not 8 of 11 raw codes').toBe(8);
    console.log('[20] accent-coloured ' + coloured + '/11 · bay values: ' + JSON.stringify(paints.__bay));
  });

  test('⛔ RULE 17 — ?legacy=1 still emits the RAW code, so that house is unchanged', async ({ phantom, page }) => {
    test.setTimeout(120_000);
    await phantom.boot({ query: '?legacy=1' });
    expect(await phantom.isRedesign(), '?legacy=1 must not apply body.rd').toBe(false);

    // Drive the REAL writer, not a copy of its logic.
    const html = await page.evaluate(() => {
      const rack = { totalU: 12, slots: [
        { uStart: 1, uEnd: 1, type: 'stor', name: 's', dns: 's', model: 'M', status: 'pending' },
        { uStart: 3, uEnd: 3, type: 'pwr', name: 'p', dns: 'p', model: 'M', status: 'pending' },
      ] };
      return rackElevation_buildHtml(rack);
    });

    // The whole guard in two assertions: legacy keeps the raw codes it always emitted, and the
    // normalised keys never appear there. If this flips, the base non-house-scoped rules start
    // matching and legacy silently changes colour.
    expect(html, 'legacy stopped emitting the raw code — the base rules will now match differently').toContain('data-type="stor"');
    expect(html, 'legacy stopped emitting the raw code').toContain('data-type="pwr"');
    expect(html, 'a NORMALISED key leaked into the legacy house — Rule 17 break').not.toContain('data-type="storage"');
    expect(html, 'a NORMALISED key leaked into the legacy house — Rule 17 break').not.toContain('data-type="pdu"');
  });

  test('the redesign house DOES emit normalised keys — the other half of the same guard', async ({ phantom, page }) => {
    test.setTimeout(120_000);
    await phantom.boot();
    expect(await phantom.isRedesign()).toBe(true);
    const html = await page.evaluate(() => rackElevation_buildHtml({ totalU: 12, slots: [
      { uStart: 1, uEnd: 1, type: 'stor', name: 's', dns: 's', model: 'M', status: 'pending' },
      { uStart: 3, uEnd: 3, type: 'pwr', name: 'p', dns: 'p', model: 'M', status: 'pending' },
    ] }));
    expect(html, 'the redesign house is still emitting raw codes — the routing did not happen').toContain('data-type="storage"');
    expect(html).toContain('data-type="pdu"');
  });
});
