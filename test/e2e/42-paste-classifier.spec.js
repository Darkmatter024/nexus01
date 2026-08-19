// 42 — THE PASTE CLASSIFIER (pure). Shape only, never meaning; offline by construction.
// ⭐ The adversarial block matters more than the happy path: the failure that hurts a technician
// is being routed CONFIDENTLY into the wrong parser, which wastes the paste and teaches them not
// to trust the door. Every ambiguous input must land on 'unknown', not on a best guess.
const { test, expect } = require('./fixtures');

const classify = (page, text) => page.evaluate((t) => paste_classify(t), text);

const PORTMAP = 'A01 · U3 · SW-SPINE-01 Eth1/1 → B04 · U7 · GPU-01 Eth1/1\n'
              + 'A01 · U3 · SW-SPINE-01 Eth1/2 → B04 · U8 · GPU-02 Eth1/1';
const PORTMAP_CSV = 'src_rack,src_port,dst_rack,dst_port,optic\nA01,Eth1/1,B04,Eth1/1,SR4';
const ELEVATION = 'U1, 2U, PDU-A, PDU, Vertiv GeistV2\nU3, 1U, SW-SPINE-01, switch, Arista 7050CX3\nU4-U7, 4U, GPU-01, gpu, GB300';
const CLI = '# show interfaces Eth1/1 transceiver\nEth1/1  Rx Power: -2.31 dBm  Tx Power: -1.90 dBm';
const BOM = 'part,qty,description,vendor\nMCX713106AS,8,ConnectX-7 NIC,NVIDIA';
// Realistic vendor-EDP text carrying the full, unambiguous phrase — a bare "EDP" alone must
// never be enough (see the fix-round-1 regression case below), so this is the happy path that
// proves the strict rule still recognises a real one.
const EDP = 'VENDOR EQUIPMENT DATA PACK — GB300 NVL72 Rack Unit\n'
          + 'Document Type: Equipment Data Pack (EDP)\n'
          + 'Manufacturer: NVIDIA\n'
          + 'Model: GB300-NVL72\n'
          + 'Serial: SN-88213-A\n'
          + 'Ship Date: 2026-07-02\n'
          + 'Received: 2026-07-14\n'
          + 'Inspected By: J. Alvarez\n'
          + 'Notes: no shipping damage observed, all crates intact.';

test.describe('paste classifier', () => {

  test('identifies each real format from shape alone', async ({ phantom, page }) => {
    await phantom.boot();
    expect((await classify(page, PORTMAP)).verdict).toBe('portmap');
    expect((await classify(page, PORTMAP_CSV)).verdict).toBe('portmap');
    expect((await classify(page, ELEVATION)).verdict).toBe('elevation');
    expect((await classify(page, CLI)).verdict).toBe('cli');
    expect((await classify(page, BOM)).verdict).toBe('bom');
    expect((await classify(page, EDP)).verdict).toBe('edp');
  });

  test('⛔ ambiguous and unrecognisable input returns unknown, never a guess', async ({ phantom, page }) => {
    await phantom.boot();
    for (const [name, text] of [
      ['free prose', 'rack looks hot, check with Dave before EOD'],
      ['a bare URL', 'https://example.com/thing'],
      ['whitespace', '   \n\n  \t '],
      ['empty', ''],
      ['one word', 'racks'],
      // ⛔ FIX ROUND 1 REGRESSIONS — found by running the classifier, not by inspection. Each of
      // these previously cleared BOTH decision thresholds off one weak/coincidental signal, with
      // second = 0, so the tie-break arithmetic (which only resolves genuine cross-category ties)
      // never engaged. Pinned here so none of the three can regress silently.
      ['a "show" word that is prose, not a command echo',
        'show status update: rack cooling nominal, no action needed'],
      ['a shift note that mentions EDP once but is otherwise prose',
        'Shift handoff notes for night crew:\n'
        + 'Aisle 3 temps look fine, no alarms since 18:00.\n'
        + 'Ran into a delay waiting on the EDP from the vendor rep, should land tomorrow.\n'
        + 'Cabinet B12 door sensor still flaky, ticket open.\n'
        + 'Fiber spool count looks short, will recount in the morning.\n'
        + 'No blockers on the GPU install otherwise.\n'
        + 'Coffee machine on level 2 is out again.\n'
        + 'Reminder: badge access renewal due Friday.\n'
        + 'Handing off to Dana at 06:00.'],
      ['informal arrows in planning prose, not port endpoints',
        "let's move from Plan A -> Plan B -> Plan C for tomorrow"],
    ]) {
      const r = await classify(page, text);
      expect(r.verdict, `${name} was classified as ${r.verdict}`).toBe('unknown');
    }
  });

  test('⛔ CSV-vs-CSV does not collide — the real ambiguity in this set', async ({ phantom, page }) => {
    await phantom.boot();
    // Both are comma headers. They separate on header TOKENS, not on being CSV.
    expect((await classify(page, BOM)).verdict).toBe('bom');
    expect((await classify(page, PORTMAP_CSV)).verdict).toBe('portmap');
    // A CSV with neither vocabulary is not a coin flip.
    const NEITHER = 'alpha,beta,gamma\n1,2,3';
    expect((await classify(page, NEITHER)).verdict).toBe('unknown');
  });

  test('every verdict except unknown has a routing target', async ({ phantom, page }) => {
    await phantom.boot();
    const t = await page.evaluate(() => PASTE_TARGETS);
    for (const v of ['portmap', 'elevation', 'cli', 'bom', 'edp']) {
      expect(t[v], `${v} has no target`).toBeTruthy();
      expect(t[v].box, `${v} has no destination box id`).toBeTruthy();
      expect(t[v].label, `${v} has no button label`).toBeTruthy();
    }
    // ⚠ Assert the DOORS exist, because two of the five are not OPS_TABS entries: the CLI parser
    // has goCliParser and vendor EDP has vendorEdp_open. A table that assumed rd_openOpsTool for
    // all five would toast "Unknown tool" for those two.
    const doors = await page.evaluate(() => ({
      rd: typeof rd_openOpsTool, cli: typeof goCliParser, edp: typeof vendorEdp_open,
      tabs: Object.keys(OPS_TABS || {}),
    }));
    expect(doors.rd).toBe('function');
    expect(doors.cli, 'goCliParser is missing — the CLI route has no door').toBe('function');
    expect(doors.edp, 'vendorEdp_open is missing — the EDP route has no door').toBe('function');
    for (const k of ['portmap', 'rackmap', 'bom']) {
      expect(doors.tabs, `OPS_TABS has no '${k}' entry`).toContain(k);
    }
    expect(t.unknown, 'unknown must NOT have a target — it routes nowhere').toBeFalsy();
  });

  test('bounded input cannot change a verdict', async ({ phantom, page }) => {
    await phantom.boot();
    // 4,000 lines of noise appended AFTER a clear elevation header must still read as elevation:
    // the bound reads the opening lines, and every format here is identifiable from them.
    const padded = ELEVATION + '\n' + Array.from({ length: 4000 }, (_, i) => 'noise line ' + i).join('\n');
    expect((await classify(page, padded)).verdict).toBe('elevation');
  });
});
