// Bottom nav + routing.
//
// Every selector, class and function name below was read out of dct-ios.html, not guessed:
//   #rd-botnav markup ...................... :16030-16051
//   #bn-rail / #bn-core / .botitem .......... :16031-16044
//   #rd-exit (hold-to-exit, NOT a tab) ...... :16046-16050, wiring rd_initExit :18751
//   showMode() .............................. :18786  (map {command:'cmd', work:'work', ref:'ref'})
//   showPage() adds .active to #pg-<id> ..... :22558-22569
//   nav_push()/popstate/history ............. :18443, :18602, :18610
//   redesign_initToggle adds body.rd ........ :18888-18903
//   #bn-core{display:none} — rail retired ... :9566
//   body.rd.mode-ref .search-wrap ........... :9619  (the ONLY body.mode-* class in the file)
//   #rd-botnav{display:none} base ........... :9564   / body.rd #rd-botnav{display:grid} :9653
//   body.rd .tab-nav{display:none} .......... :9607
//
// LOCAL HELPERS ONLY — fixtures.js is shared and was not touched.

const { test, expect } = require('./fixtures');

// ── local helpers (declared here on purpose; fixtures.js is shared and off-limits) ──

const PAGES = { command: 'pg-cmd', work: 'pg-work', ref: 'pg-ref' };
const SLOTS = { command: 'bn-command', work: 'bn-work', ref: 'bn-ref' };

/** Tap a bottom-nav slot. click() (not tap()) so the same spec runs on non-touch projects. */
async function tapSlot(page, mode) {
  await page.locator('#' + SLOTS[mode]).click();
}

/** Which of the three redesign pages currently carry .active. Truth, not a guess. */
function activePages(page) {
  return page.evaluate((ids) =>
    Object.entries(ids)
      .filter(([, id]) => {
        const el = document.getElementById(id);
        return !!el && el.classList.contains('active');
      })
      .map(([mode]) => mode), PAGES);
}

/** Which of the three nav slots currently carry .botitem.active. */
function activeSlots(page) {
  return page.evaluate(() =>
    Array.from(document.querySelectorAll('#rd-botnav .botitem.active')).map((el) => el.id));
}

/** Every body class that starts with mode-. showMode only ever sets one of these (:18831). */
function modeClasses(page) {
  return page.evaluate(() =>
    Array.from(document.body.classList).filter((c) => c.indexOf('mode-') === 0));
}

test.describe('bottom nav — structure', () => {
  test('the nav is exactly three slots plus EXIT — no Scan, no Shift', async ({ phantom, page }) => {
    await phantom.boot();

    const census = await page.evaluate(() => ({
      items: Array.from(document.querySelectorAll('#rd-botnav .botitem')).map((el) => ({
        id: el.id,
        label: (el.querySelector('.blabel') || {}).textContent || '',
        onclick: el.getAttribute('onclick') || '',
      })),
      exit: !!document.getElementById('rd-exit'),
      exitIsBotitem: !!document.querySelector('#rd-botnav #rd-exit.botitem'),
    }));

    expect(census.items.map((i) => i.id)).toEqual(['bn-command', 'bn-work', 'bn-ref']);
    expect(census.items.map((i) => i.label)).toEqual(['Home', 'Build', 'Tools']);
    expect(census.items.map((i) => i.onclick)).toEqual([
      "showMode('command')", "showMode('work')", "showMode('ref')",
    ]);
    expect(census.exit, '#rd-exit missing from the nav').toBe(true);
    // #rd-exit is a sibling of the rail, deliberately NOT a landable tab (:9584).
    expect(census.exitIsBotitem, '#rd-exit must never be a .botitem').toBe(false);
  });

  test('every nav control meets the 44px gloved-hand minimum', async ({ phantom, page }) => {
    await phantom.boot();

    const rects = await page.evaluate(() =>
      ['bn-command', 'bn-work', 'bn-ref', 'rd-exit'].map((id) => {
        const el = document.getElementById(id);
        const r = el.getBoundingClientRect();
        return { id, w: Math.round(r.width), h: Math.round(r.height) };
      }));

    for (const r of rects) {
      expect(r.w, `${r.id} width ${r.w}px < 44px touch minimum`).toBeGreaterThanOrEqual(44);
      expect(r.h, `${r.id} height ${r.h}px < 44px touch minimum`).toBeGreaterThanOrEqual(44);
    }
  });
});

test.describe('bottom nav — routing', () => {
  test('each slot activates its own page and deactivates the other two', async ({ phantom, page }) => {
    await phantom.boot();

    // redesign_initToggle lands on Command (:18899).
    await expect.poll(() => activePages(page)).toEqual(['command']);

    for (const mode of ['work', 'ref', 'command', 'ref', 'work']) {
      await tapSlot(page, mode);
      await expect
        .poll(() => activePages(page), { message: `tapping ${SLOTS[mode]} did not leave exactly ${PAGES[mode]} active` })
        .toEqual([mode]);
    }
  });

  test('.botitem.active mirrors the visible page', async ({ phantom, page }) => {
    await phantom.boot();
    await expect.poll(() => activeSlots(page)).toEqual(['bn-command']);

    for (const mode of ['work', 'ref', 'command']) {
      await tapSlot(page, mode);
      await expect
        .poll(() => activeSlots(page), { message: `nav highlight did not follow to ${mode}` })
        .toEqual([SLOTS[mode]]);
      // The highlight and the page must never disagree.
      expect(await activePages(page)).toEqual([mode]);
    }
  });

  test('#bn-core still tracks the active slot, but the rail is retired and paints nothing', async ({ phantom, page }) => {
    await phantom.boot();

    // showMode :18827-18829 writes left = index * 33.333%.
    const expected = { command: '0%', work: '33.333%', ref: '66.666%' };
    for (const mode of ['work', 'ref', 'command']) {
      await tapSlot(page, mode);
      await expect
        .poll(() => page.evaluate(() => document.getElementById('bn-core').style.left),
          { message: `#bn-core slider did not move for ${mode}` })
        .toBe(expected[mode]);
    }

    // HONEST NOTE (not a failure): #bn-core{display:none} at :9566 — "old sliding reactor
    // rail retired". The slider math above is a dead write; the real active indicator is
    // .botitem.active + its .btick. Asserted so the suite records the truth rather than
    // implying a visible slider exists.
    const display = await page.evaluate(() =>
      getComputedStyle(document.getElementById('bn-core')).display);
    expect(display, '#bn-core is retired (:9566) — if this ever paints, the assertion above is the wrong contract').toBe('none');
  });

  test('body.mode-ref is set on Tools only — it is the sole mode-* class the app owns', async ({ phantom, page }) => {
    await phantom.boot();

    // :18831 toggles ONLY mode-ref (it gates .search-wrap, :9619). There is no
    // mode-command / mode-work class anywhere in the file — verified by grep, asserted here.
    expect(await modeClasses(page), 'Command should carry no mode-* class').toEqual([]);

    await tapSlot(page, 'work');
    await expect.poll(() => modeClasses(page), { message: 'Build should carry no mode-* class' }).toEqual([]);

    await tapSlot(page, 'ref');
    await expect.poll(() => modeClasses(page), { message: 'Tools must set body.mode-ref' }).toEqual(['mode-ref']);

    await tapSlot(page, 'command');
    await expect.poll(() => modeClasses(page), { message: 'leaving Tools must clear body.mode-ref' }).toEqual([]);
  });

  test('cycling all three slots raises no console error and no uncaught exception', async ({ phantom, page }) => {
    // ── Two PLATFORM artifacts fire at BOOT (before any nav tap) and are tolerated here,
    // locally and by named cause. fixtures.js BENIGN_CONSOLE was NOT touched.
    //
    // 1) The boot pipeline pings the Cloudflare Worker for AI reachability
    //    (:18248 -> phantomCheckApi :50947). That Worker enforces an Origin allowlist
    //    (:17655) and answers http://127.0.0.1:4317 with a 204 carrying no
    //    Access-Control-Allow-Origin. WebKit emits THREE entries for that one request
    //    (2 console errors + a stack-less 'pageerror' — verified by probe: empty stack,
    //    WebKit network text, not a JS throw); Chromium emits a bare
    //    "Failed to load resource: net::ERR_FAILED" that names no host. The app itself is
    //    correct: .catch (:50952) paints an honest verdict. The generic Chromium string is
    //    only tolerated once the requestfailed census below proves the ONLY failed request
    //    in the whole run was that one third-party host.
    // 2) Chromium-only: haptic() (:16397) calls navigator.vibrate, and redesign_initToggle
    //    -> showMode('command') -> showPage -> haptic(4) (:22617) runs at DOMContentLoaded,
    //    before any user gesture, so Chromium refuses it with a console error. iOS Safari
    //    has NO navigator.vibrate, so haptic() short-circuits and the field platform never
    //    sees this. Zero occurrences on phone-webkit.
    const BOOT_PLATFORM_NOISE = [
      /phantom-api\.wfj6t2fk7w\.workers\.dev/i,
      /Access-Control-Allow-Origin/i,
      /Failed to load resource: net::ERR_FAILED/i,
      /Blocked call to navigator\.vibrate/i,
    ];

    // Network census — attached before boot so nothing is missed. This is what makes the
    // generic ERR_FAILED string above safe to tolerate.
    const failedRequests = [];
    page.on('requestfailed', (r) => failedRequests.push(r.url()));

    await phantom.boot();

    // Wait on the probe's own observable end state instead of a sleep, so that noise lands
    // before the nav cycle rather than in the middle of it.
    await expect
      .poll(() => page.locator('#hs-api-val').textContent(),
        { message: 'the boot API-reachability probe never reported a verdict' })
      .not.toMatch(/^(—|CHECKING)$/);

    for (const mode of ['work', 'ref', 'command', 'work', 'ref']) {
      await tapSlot(page, mode);
      await expect.poll(() => activePages(page)).toEqual([mode]);
    }

    const unexpectedRequests = failedRequests.filter((u) => !/phantom-api\.wfj6t2fk7w\.workers\.dev/i.test(u));
    expect(unexpectedRequests, `requests failed that are not the origin-gated AI proxy:\n  ${unexpectedRequests.join('\n  ')}`).toEqual([]);

    const unexplained = phantom.hardErrors().filter((e) => !BOOT_PLATFORM_NOISE.some((re) => re.test(e.text)));
    expect(unexplained, `console errors while navigating:\n${unexplained.map((e) => `  [${e.type}] ${e.text}`).join('\n')}`).toEqual([]);
  });

  test('none of the three pages overflows the viewport horizontally', async ({ phantom, page }) => {
    await phantom.boot();
    for (const mode of ['command', 'work', 'ref']) {
      await tapSlot(page, mode);
      await expect.poll(() => activePages(page)).toEqual([mode]);
      await phantom.assertNoHorizontalOverflow();
    }
  });
});

test.describe('browser back', () => {
  // ⛔ KNOWN DEFECT H1 — showMode() sets _navInternalCall = true around its showPage()
  // call (:18810-18811), and nav_push() early-returns on that flag (:18444). So a
  // bottom-nav tap pushes NOTHING to history. The only history write in the whole boot
  // path is the seed replaceState({p:'triage', root:true}) at :18610, which REPLACES
  // rather than pushes.
  //
  // MEASURED on phone-webkit, not inferred:
  //   history.length before nav taps = 2 · after Home->Build->Tools = 2  (nothing pushed)
  //   page.goBack() after those taps => url becomes about:blank — the app is GONE, not
  //   stepped back one destination.
  // Field consequence: one iOS edge-swipe-back from Tools drops a technician out of
  // PHANTOM mid-shift; there is no in-app way back, only a relaunch.
  //
  // The assertions below state the CORRECT behaviour, so this test turns green — and the
  // .fail() annotation turns red — the day H1 is fixed. The history-length assertion is
  // deliberately FIRST so the expected failure fires before goBack() can strand the page.
  test.fail();
  test('back after nav taps returns to the previous destination', async ({ phantom, page }) => {
    await phantom.boot();

    const before = await page.evaluate(() => history.length);

    await tapSlot(page, 'work');
    await expect.poll(() => activePages(page)).toEqual(['work']);
    await tapSlot(page, 'ref');
    await expect.poll(() => activePages(page)).toEqual(['ref']);

    const after = await page.evaluate(() => history.length);
    expect(after, `nav taps pushed no history entries (length stayed ${before}) — showMode suppresses nav_push at :18810`)
      .toBeGreaterThan(before);

    await page.goBack();
    expect(await activePages(page), 'back from Tools should land on Build').toEqual(['work']);
  });
});

test.describe('house selection', () => {
  test('a bare URL boots the redesign house with the 3-slot nav visible', async ({ phantom, page }) => {
    await phantom.boot();

    expect(await phantom.isRedesign(), 'bare URL must boot body.rd (default since v1.14.101)').toBe(true);
    await expect(page.locator('#rd-botnav')).toBeVisible();
    await expect(page.locator('.tab-nav')).toBeHidden();   // legacy 5-tab nav, :9607
    expect(await activePages(page)).toEqual(['command']);
  });

  test('?legacy=1 boots the legacy house — no body.rd, no redesign nav', async ({ phantom, page }) => {
    await phantom.boot({ query: '?legacy=1' });

    expect(await phantom.isRedesign(), '?legacy=1 must NOT apply body.rd').toBe(false);
    await expect(page.locator('#rd-botnav')).toBeHidden();   // base rule :9564 is display:none
    await expect(page.locator('.tab-nav')).toBeVisible();

    // redesign_initToggle returns before showMode (:18889), so no rd page is activated —
    // the legacy default #pg-triage (:13577) stays the live surface.
    expect(await activePages(page)).toEqual([]);
    await expect(page.locator('#pg-triage')).toHaveClass(/active/);

    // The rip-cord persists so a plain reload stays legacy (:18853).
    expect(await page.evaluate(() => localStorage.getItem('phantom_legacy'))).toBe('1');
  });

  test('?legacy=1 survives a reload without the query string', async ({ phantom, page }) => {
    await phantom.boot({ query: '?legacy=1' });
    expect(await phantom.isRedesign()).toBe(false);

    await page.goto('/dct-ios.html', { waitUntil: 'domcontentloaded' });
    await page.locator('#pe-tapcatch').click({ force: true });
    await page.waitForFunction(() => {
      const app = document.getElementById('app');
      return !!app && app.classList.contains('visible');
    }, undefined, { timeout: 25_000 });

    expect(await phantom.isRedesign(), 'phantom_legacy must keep the bare URL in the legacy house').toBe(false);
  });
});

test.describe('#rd-exit is hold-only', () => {
  test('a plain tap on EXIT does not navigate and does not freeze', async ({ phantom, page }) => {
    await phantom.boot();
    await tapSlot(page, 'work');
    await expect.poll(() => activePages(page)).toEqual(['work']);

    await page.locator('#rd-exit').click();

    // Nothing moved: same page, same highlight, EXIT never becomes a tab.
    expect(await activePages(page), 'a tap on EXIT navigated').toEqual(['work']);
    expect(await activeSlots(page), 'a tap on EXIT stole the nav highlight').toEqual(['bn-work']);

    const state = await page.evaluate(() => ({
      curtainUp: document.getElementById('rd-freeze-curtain').classList.contains('up'),
      arming: document.getElementById('rd-exit').classList.contains('arming'),
      freezeMark: localStorage.getItem('phantom_freeze_v1'),
    }));
    expect(state.curtainUp, 'a plain tap raised the freeze curtain — the hold gate failed open').toBe(false);
    expect(state.arming, '#rd-exit stayed armed after a quick release').toBe(false);
    expect(state.freezeMark, 'a plain tap wrote the freeze marker').toBeNull();
  });

  test('holding EXIT past RD_HOLD_MS freezes to the sleep curtain', async ({ phantom, page }) => {
    await phantom.boot();

    // rd_holdGesture (:18721) arms on mousedown/touchstart and fires after RD_HOLD_MS
    // (850ms, :18720). No sleep: press, then poll the observable end state.
    const box = await page.locator('#rd-exit').boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    try {
      await expect
        .poll(() => page.evaluate(() => document.getElementById('rd-freeze-curtain').classList.contains('up')),
          { message: 'holding EXIT never raised the freeze curtain', timeout: 5_000 })
        .toBe(true);
    } finally {
      await page.mouse.up();
    }

    // rd_freeze (:18740) stamps the VIEW to return to, never the data.
    const mark = await page.evaluate(() => JSON.parse(localStorage.getItem('phantom_freeze_v1') || 'null'));
    expect(mark && mark.mode, 'freeze marker must record the mode to return to').toBe('command');
  });
});
