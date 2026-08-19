// 43 — THE PASTE DOOR. Reachability, not existence.
// ⛔ Two controls in this app have shipped present, wired, correct — and dead, measuring 0x0
// inside a display:none ancestor (the SHIFT pill, and the first re-home of it). Assert GEOMETRY
// and hit-testing, because "is it there and wired" passes straight through that defect.
//
// ⚠ THE CELL TEST IS NOT HERE YET, AND ITS ABSENCE IS DELIBERATE. Task 2's brief put a tenth
// ops-cell in the OPS wall, which is a 3x3 grid of exactly nine whose own banner reads "Nine tools
// on this build". Placement is an owner decision, so the sheet ships first and the reachability
// test lands with the door. ⛔ Do not call Task 2 done on these three passing — a sheet nothing
// opens is not a door.
const { test, expect } = require('./fixtures');

const openDoor = async (page) => {
  await page.evaluate(() => { if (typeof showMode === 'function') showMode('work'); });
  await page.waitForTimeout(2500);
};

test.describe('paste door', () => {

  test('the sheet opens with an empty, honest zero state', async ({ phantom, page }) => {
    await phantom.boot();
    await openDoor(page);
    const s = await page.evaluate(() => {
      rd_openPaste();
      const sheet = document.getElementById('rd-paste-sheet');
      const r = sheet ? sheet.getBoundingClientRect() : null;
      return { open: !!(sheet && sheet.className.indexOf('open') >= 0), h: r ? Math.round(r.height) : 0,
               box: !!document.getElementById('paste-input'),
               actions: document.querySelectorAll('#paste-actions button').length,
               verdict: (document.getElementById('paste-verdict') || {}).textContent || '' };
    });
    expect(s.open, 'the paste sheet did not open').toBe(true);
    expect(s.h, 'the paste sheet rendered with no height').toBeGreaterThan(100);
    expect(s.box, 'there is no textarea to paste into').toBe(true);
    // ⛔ It must not claim a verdict, or offer a route, before anything has been pasted.
    expect(s.verdict).not.toMatch(/Looks like/i);
    expect(s.verdict, 'the zero state invented a caption').toBe('');
    expect(s.actions, 'the zero state offered a route with nothing pasted').toBe(0);
  });

  test('a recognised paste names the format and offers exactly one route', async ({ phantom, page }) => {
    await phantom.boot();
    await openDoor(page);
    const r = await page.evaluate(async () => {
      rd_openPaste();
      const box = document.getElementById('paste-input');
      box.value = 'U1, 2U, PDU-A, PDU, Vertiv\nU3, 1U, SW-01, switch, Arista\nU4-U7, 4U, GPU-01, gpu, GB300';
      box.dispatchEvent(new Event('input', { bubbles: true }));
      await new Promise((res) => setTimeout(res, 400));
      const acts = Array.from(document.querySelectorAll('#paste-actions button'));
      return { verdict: document.getElementById('paste-verdict').textContent,
               buttons: acts.map((b) => b.textContent.trim()),
               heights: acts.map((b) => Math.round(b.getBoundingClientRect().height)) };
    });
    expect(r.verdict).toMatch(/rack elevation/i);
    expect(r.buttons.length, 'a confident match should offer ONE route, not a menu').toBe(1);
    expect(r.buttons[0]).toMatch(/RACK MAP/i);
    for (const h of r.heights) expect(h, `route button is ${h}px tall`).toBeGreaterThanOrEqual(44);
  });

  test('⛔ an unrecognised paste says so and offers the doors', async ({ phantom, page }) => {
    await phantom.boot();
    await openDoor(page);
    const r = await page.evaluate(async () => {
      rd_openPaste();
      const box = document.getElementById('paste-input');
      box.value = 'rack looks hot, check with Dave before EOD';
      box.dispatchEvent(new Event('input', { bubbles: true }));
      await new Promise((res) => setTimeout(res, 400));
      const acts = Array.from(document.querySelectorAll('#paste-actions button'));
      return { verdict: document.getElementById('paste-verdict').textContent,
               count: acts.length,
               heights: acts.map((b) => Math.round(b.getBoundingClientRect().height)) };
    });
    expect(r.verdict, 'it claimed a format for free prose').not.toMatch(/Looks like/i);
    // ⚠ THERE ARE THREE HONEST UNKNOWN CAPTIONS, not one — the brief's regex assumed a single
    // message and failed against correct code. Round 3's structural gate says "That reads as
    // notes, not data." for prose, which is a BETTER answer for a technician than the generic
    // "Not a format PHANTOM recognises." — it names why. Assert the set, and assert none of them
    // claims a format.
    expect(r.verdict).toMatch(/not a format PHANTOM recognises|reads as notes, not data|not enough to go on/i);
    // Degrades to today's behaviour: pick a tool.
    expect(r.count, 'unknown should offer the tool list').toBeGreaterThanOrEqual(4);
    // ⛔ The gloved floor applies to the DEGRADED path too. A fallback that is hard to tap is
    // where a cold-aisle defect actually lands, because that is the path a bad paste takes.
    for (const h of r.heights) expect(h, `fallback door is ${h}px tall`).toBeGreaterThanOrEqual(44);
  });

  test('⛔ every offered route is a real door, and unknown routes nowhere', async ({ phantom, page }) => {
    await phantom.boot();
    await openDoor(page);
    const d = await page.evaluate(() => ({
      keys: Object.keys(PASTE_TARGETS),
      // The shipped shape is {label, box, open}. ⚠ task-1-brief.md documents {label, tool, box};
      // the brief is wrong and reaching for .tool would toast "Unknown tool" on cli and edp.
      shapes: Object.keys(PASTE_TARGETS).map((k) => ({
        k, label: typeof PASTE_TARGETS[k].label, box: typeof PASTE_TARGETS[k].box,
        open: typeof PASTE_TARGETS[k].open,
      })),
      hasUnknown: Object.prototype.hasOwnProperty.call(PASTE_TARGETS, 'unknown'),
      dispatch: typeof paste_dispatch,
    }));
    expect(d.keys.sort()).toEqual(['bom', 'cli', 'edp', 'elevation', 'portmap']);
    expect(d.hasUnknown, 'unknown must NOT have a target — it routes nowhere').toBe(false);
    expect(d.dispatch, 'the action buttons have no dispatcher').toBe('function');
    for (const s of d.shapes) {
      expect(s.label, `${s.k}.label missing`).toBe('string');
      expect(s.box, `${s.k}.box missing`).toBe('string');
      expect(s.open, `${s.k}.open is not callable`).toBe('function');
    }
  });

  test('⛔ a tap cannot silently do nothing before routing is wired', async ({ phantom, page }) => {
    await phantom.boot();
    await openDoor(page);
    // Task 3 defines paste_route. Until then the button must SAY it cannot route — Contract 14.
    // When Task 3 lands, this asserts the guard still fires on a build missing paste_route,
    // which is the state a partial deploy actually produces.
    const r = await page.evaluate(async () => {
      const warns = [];
      const orig = console.warn;
      console.warn = function () { warns.push(Array.prototype.join.call(arguments, ' ')); orig.apply(console, arguments); };
      const saved = window.paste_route;
      try {
        window.paste_route = undefined;
        rd_openPaste();
        const box = document.getElementById('paste-input');
        box.value = 'rack looks hot, check with Dave before EOD';
        box.dispatchEvent(new Event('input', { bubbles: true }));
        await new Promise((res) => setTimeout(res, 300));
        document.querySelector('#paste-actions button').click();
        await new Promise((res) => setTimeout(res, 200));
      } finally {
        window.paste_route = saved;
        console.warn = orig;
      }
      return { warned: warns.some((w) => /paste_route is not defined/.test(w)) };
    });
    expect(r.warned, 'the button did nothing and said nothing').toBe(true);
  });
});
