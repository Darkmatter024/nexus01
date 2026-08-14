// ─────────────────────────────────────────────────────────────────────────────
// 40 — SHIFT HAS A REACHABLE DOOR (v1.14.460, owner ruling 2026-08-14)
//
// ⛔ WHAT THE WALK FOUND. `shift_openSheet` had exactly ONE caller in the whole app: an onclick
// bound onto #cc-shiftpill. That pill measured 0x0 and was unreachable at EVERY viewport — 390 and
// 1440 alike — because it lives inside `.lens` → `#cc-center`, both display:none. `.lens` is the
// pre-.425 phone composition the Command Deck replaced, and `cc-` is the retired Crash Cart
// namespace. So shift_renderHero() wrote state into a hidden node and succeeded silently on every
// clock tick: no warn, no toast, and no way for a technician to set a shift end at all.
//
// ⭐ THE ASSERTION THAT MATTERS IS REACHABILITY, NOT EXISTENCE, and this spec exists because the
// distinction is not academic. The old pill existed, had a live onclick, correct text and a
// sensible class — and was completely dead. A test asking "is the control present and wired" would
// have passed for as long as the defect lived. Worse: the FIRST attempt to re-home it put it in
// `.cs-microbar`, which is ALSO display:none at 390 — a second hidden node, caught only because
// this file measures geometry instead of presence.
// ─────────────────────────────────────────────────────────────────────────────
const { test, expect } = require('./fixtures');

const probe = (page) => page.evaluate(() => {
  const el = document.getElementById('cs-shiftbar');
  if (!el) return { exists: false };
  const r = el.getBoundingClientRect();
  // elementFromPoint is the honest question: does a tap at its centre actually reach it?
  const cx = Math.round(r.left + r.width / 2), cy = Math.round(r.top + r.height / 2);
  const hit = document.elementFromPoint(cx, cy);
  const owner = hit ? (hit.closest('#cs-shiftbar') ? 'cs-shiftbar' : (hit.id || hit.tagName)) : 'null';
  return {
    exists: true, w: Math.round(r.width), h: Math.round(r.height),
    inFlow: r.width > 0 && r.height > 0,
    hitOwner: owner,
    role: el.getAttribute('role'), aria: el.getAttribute('aria-label'),
    hasHandler: typeof el.onclick === 'function',
    text: (el.innerText || '').replace(/\s+/g, ' ').trim(),
    vw: window.innerWidth, docW: document.documentElement.scrollWidth,
  };
});

test.describe('SHIFT door', () => {

  test('⛔ the shift control is REACHABLE on Command, not merely present', async ({ phantom, page }) => {
    await phantom.boot();
    await page.waitForTimeout(1500);
    const p = await probe(page);
    expect(p.exists, 'the Command Deck shift row is missing entirely').toBe(true);
    // ⭐ THE FAILURE VALUE IS 0 — exactly what #cc-shiftpill measured for as long as it was the
    // only door, and what #cs-shift measured when the door was briefly moved into the microbar.
    expect(p.w, `the shift row is ${p.w}px wide — a 0-width control is unreachable`).toBeGreaterThan(0);
    expect(p.h, `the shift row is ${p.h}px tall — a 0-height control is unreachable`).toBeGreaterThan(0);
    expect(p.hitOwner, `a tap at the row's own centre lands on ${p.hitOwner}, not the row`).toBe('cs-shiftbar');
    expect(p.hasHandler, 'the row has no click handler — it renders but does nothing').toBe(true);
    expect(p.role, 'the row is not exposed as a control').toBe('button');
    expect(p.aria, 'the row has no accessible name').toBeTruthy();
    // Cold Aisle Filter: a gloved tap target.
    expect(p.h, `the shift row is ${p.h}px tall, under the 44px gloved floor`).toBeGreaterThanOrEqual(44);
  });

  test('one tap opens the shift sheet, and every control in it clears the gloved floor', async ({ phantom, page }) => {
    await phantom.boot();
    await page.waitForTimeout(1200);
    const opened = await page.evaluate(() => {
      const el = document.getElementById('cs-shiftbar');
      if (!el) return { sheet: false, reason: 'no shift row' };
      el.click();
      const s = document.getElementById('shiftend-sheet');
      if (!s) return { sheet: false, reason: 'no sheet in DOM' };
      const ctrls = Array.from(s.querySelectorAll('button,[role="button"],[onclick],input'))
        .map((c) => { const b = c.getBoundingClientRect();
                      return { h: Math.round(b.height), w: Math.round(b.width),
                               label: (c.getAttribute('aria-label') || c.textContent || '').trim().slice(0, 30) }; })
        .filter((c) => c.h > 0);
      return { sheet: true, visible: s.className.indexOf('visible') >= 0, ctrls };
    });
    expect(opened.sheet, `no shift sheet: ${opened.reason || ''}`).toBe(true);
    expect(opened.visible, 'tapping the shift row did not open the sheet').toBe(true);
    expect(opened.ctrls.length, 'the shift sheet has no usable controls').toBeGreaterThan(0);
    for (const c of opened.ctrls) {
      expect(c.h, `shift-sheet control "${c.label}" is ${c.h}px tall, under the 44px gloved floor`).toBeGreaterThanOrEqual(44);
    }
  });

  test('the row states shift honestly when unset, and invents nothing', async ({ phantom, page }) => {
    await phantom.boot();
    await page.waitForTimeout(1200);
    const p = await probe(page);
    // Honest when unset: it offers the action rather than implying a shift is running.
    expect(p.text, `with no shift set the row does not offer to set one (reads "${p.text}")`).toMatch(/SET SHIFT END/i);
    // ⛔ No invented shift NUMBER. .382 refused to render the mock's "Shift 01" because no such
    // concept exists in this app, and that refusal must survive the re-home.
    expect(p.text, 'an invented shift number is being displayed — no such concept exists').not.toMatch(/SHIFT\s*0?\d+\b/i);
    // ⛔ And no invented remaining TIME. A countdown may only appear once the tech has set an end.
    expect(p.text, 'a countdown is showing with no shift end set').not.toMatch(/\d+\s*(HR|MIN)\s*LEFT/i);
  });

  test('⛔ the door did not push the deck past the viewport', async ({ phantom, page }) => {
    await phantom.boot();
    await page.waitForTimeout(1200);
    const p = await probe(page);
    // Design law: nothing pushes the viewport past 100vw, ever.
    expect(p.docW, `the document is ${p.docW}px wide against a ${p.vw}px viewport`).toBeLessThanOrEqual(p.vw + 1);
  });
});
