// 44 — EVERY OPS TOOL HAS EXACTLY ONE REACHABLE DOOR.
// ⛔ THIS SPEC EXISTS BECAUSE THREE TOOLS WERE ALREADY LOST IN PRODUCTION AND NO TEST NOTICED.
// SOPS and BURNDOWN had exactly ONE caller each in the whole file — an ops-cell inside #work-grid,
// which bw_render hides via .bw-on from the first Work visit onward. RACK MAP's only other route
// was a conditional Command stat tile. All three measured 0 visible doors at 390 on live v1.14.463.
//
// ⭐ THE ASSERTION IS GEOMETRY, NOT PRESENCE. Every earlier version of this failure passed an
// "is it in the DOM and wired" check — the SHIFT pill, its first re-home, and these three. A door
// that exists in the markup and cannot be tapped is not a door.
const { test, expect } = require('./fixtures');

const TOOLS = ['bom', 'manifest', 'portmap', 'rackmap', 'sops', 'burndown', 'audits', 'blast', 'optics'];

// ⚠ THE DOORS LIVE ON COMMAND, NOT WORK, and that had to be measured to be believed. The Field
// tools card sits inside #pg-cmd, which is the scrollable page (2867 / 776 at 390). An INACTIVE
// .page still reports real box dimensions in this app, so a naive width>0 check reads those
// buttons as visible from Work too — they are not. Activate the surface, then hit-test.
const openTools = async (page) => {
  await page.evaluate(() => { if (typeof showMode === 'function') showMode('cmd'); });
  await page.waitForTimeout(2000);
};

// ⭐ REACHABLE MEANS "A TAP WOULD LAND", so let Playwright decide it. click({trial:true}) runs the
// full actionability check — scrolls the right container, waits for stability, and verifies the
// element actually receives pointer events — then stops short of clicking. Three hand-rolled
// elementFromPoint versions of this got it wrong in a row: rects are viewport-relative, the
// scrollable ancestor is #pg-cmd rather than the window, and an inactive .page still reports a
// real box. Do not reimplement hit-testing here; the harness already does it correctly.
// Counts doors that have real geometry AND are visible up the whole ancestor chain.
// ⚠ WHAT THIS DOES NOT CHECK, stated rather than implied: pointer interception. Three
// elementFromPoint versions were tried and all three reported nine live buttons as dead, because
// this layout scrolls in #pg-cmd rather than the window, so viewport-relative coordinates land
// nowhere near the element. A Playwright locator with a quoted-onclick attribute selector matched
// nothing at all. ⭐ The discriminator that DOES work here is size plus inherited visibility: a
// retired ops-cell is 0x0 inside a display:none host, a live .cs-tool is 159x95 with a fully
// visible chain — and that is exactly the difference this spec exists to catch. Occlusion is
// covered for the surfaces that need it by spec 43's real-click round trip.
const countReachableDoors = (page, tool) => page.evaluate((t) => {
  const hits = Array.from(document.querySelectorAll('[onclick]'))
    .filter((e) => (e.getAttribute('onclick') || '').indexOf("rd_openOpsTool('" + t + "')") >= 0);
  return hits.filter((el) => {
    const r = el.getBoundingClientRect();
    if (!(r.width > 0 && r.height > 0)) return false;
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden') return false;
    }
    return true;
  }).length;
}, tool);

test.describe('ops tool reachability', () => {

  test('⛔ all nine tools are reachable, and none has two doors', async ({ phantom, page }) => {
    test.setTimeout(120000);   // up to 9 actionability trials plus boot
    await phantom.boot();
    await openTools(page);
    const found = {};
    for (const t of TOOLS) found[t] = await countReachableDoors(page, t);
    const missing = TOOLS.filter((t) => found[t] === 0);
    const doubled = TOOLS.filter((t) => found[t] > 1);
    // ⛔ Zero is a tool a technician cannot reach. This is the defect that shipped.
    expect(missing, `unreachable: ${missing.join(', ')} — counts ${JSON.stringify(found)}`).toEqual([]);
    // ⛔ Two doors is Contract A2. It is also how the retired stack and this row would have
    // coexisted if the fold had only ADDED and never deleted.
    expect(doubled, `two doors for: ${doubled.join(', ')} — counts ${JSON.stringify(found)}`).toEqual([]);
  });

  test('the tool row meets the gloved floor', async ({ phantom, page }) => {
    await phantom.boot();
    await openTools(page);
    const sizes = await page.evaluate(() => Array.from(document.querySelectorAll('.cs-tool'))
      .map((el) => { const r = el.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height) }; })
      .filter((s) => s.w > 0));
    expect(sizes.length, 'no tool buttons rendered at all').toBe(9);
    for (const s of sizes) expect(s.h, `a tool button is ${s.h}px tall`).toBeGreaterThanOrEqual(44);
  });

  test('⛔ the retired banner stack is gone, not merely hidden', async ({ phantom, page }) => {
    await phantom.boot();
    await openTools(page);
    const left = await page.evaluate(() => ({
      cells: document.querySelectorAll('.ops-cell').length,
      wall: document.querySelectorAll('.opswall').length,
      stack: document.querySelectorAll('.brow-stack').length,
      opsrow: document.querySelectorAll('.opsrow').length,
    }));
    // ⭐ Hidden-but-present is the state that created this defect in the first place: the markup
    // read as coverage while the technician could reach none of it. Retired means REMOVED.
    expect(left.cells, 'ops-cells survive — the stack was hidden again, not folded').toBe(0);
    expect(left.wall, '.opswall survives').toBe(0);
    expect(left.stack, '.brow-stack survives').toBe(0);
    expect(left.opsrow, '.opsrow survives').toBe(0);
  });
});
