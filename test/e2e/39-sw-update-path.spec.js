// ─────────────────────────────────────────────────────────────────────────────
// 39 — THE SERVICE-WORKER UPDATE PATH (v1.14.458, P0 fix)
//
// ⛔ THE DEFECT. On a real installed iPhone PWA the SW UPDATE badge appeared and tapping it did
// not move the app to the new build. Five faults compounded:
//   1. sw.js called skipWaiting() during INSTALL, so a worker never reached `waiting`.
//   2. The app posted SKIP_WAITING only `if (reg.waiting)` — therefore never.
//   3. sw.js had NO message listener, so the message had no receiver even if sent.
//   4. There was NO controllerchange listener anywhere; the reload was a blind 80ms timer.
//   5. The version-file backstop forced the badge on a version.json mismatch alone, so the badge
//      could appear with nothing installing or waiting — a button that did nothing by construction.
//
// ⭐ WHY THIS SPEC CAN EXIST AT ALL. `05-offline` skips its SW tests on phone-webkit because that
// browser never installs a service worker — and the standing lesson is that "the harness skips it"
// is NOT the same as "this needs hardware". Chromium installs service workers, so the lifecycle is
// automatable and the owner is not the test harness for it.
// ─────────────────────────────────────────────────────────────────────────────
const { test, expect } = require('./fixtures');

// Source-level invariants. These are the ones that would have caught the original defect on the
// day it shipped, and they hold in any browser.
test.describe('SW update path — structure', () => {

  test('⛔ install must NOT skipWaiting, and a message handler must exist to promote on demand', async ({ phantom, page }) => {
    await phantom.boot();
    const sw = await page.evaluate(async () => (await fetch('./sw.js')).text());
    const code = sw.replace(/\/\*[\s\S]*?\*\//g, '').split('\n').filter((l) => !l.trim().startsWith('//')).join('\n');

    // ⚠ SLICE TO THE NEXT LISTENER, NOT TO 'activate'. A first draft sliced install→activate and
    // went red against correct code, because the SKIP_WAITING message handler sits between them
    // and legitimately contains skipWaiting(). The assertion was wrong, not the worker.
    const iStart = code.indexOf("addEventListener('install'");
    const iNext = code.indexOf('self.addEventListener(', iStart + 10);
    const installBody = code.slice(iStart, iNext === -1 ? code.length : iNext);
    expect(/skipWaiting\s*\(/.test(installBody),
      '⛔ install() calls skipWaiting — a worker will never reach `waiting` and the UPDATE badge will have nothing to promote').toBe(false);

    expect(/addEventListener\(\s*'message'/.test(code),
      '⛔ sw.js has no message listener — SKIP_WAITING has no receiver').toBe(true);
    const msgBody = code.slice(code.indexOf("addEventListener('message'"));
    expect(/SKIP_WAITING/.test(msgBody), 'the message handler does not accept SKIP_WAITING').toBe(true);
    expect(/skipWaiting\s*\(/.test(msgBody), 'the message handler does not promote the waiting worker').toBe(true);
  });

  test('⛔ exactly one controllerchange reaction, and exactly one activation door', async ({ phantom, page }) => {
    await phantom.boot();
    const html = await page.evaluate(async () => (await fetch('./dct-ios.html')).text());
    const code = html.replace(/\/\*[\s\S]*?\*\//g, '').split('\n').filter((l) => !l.trim().startsWith('//')).join('\n');

    const cc = (code.match(/addEventListener\(\s*'controllerchange'/g) || []).length;
    // Zero was the bug (a blind timer instead). More than one races reloads against each other.
    expect(cc, `${cc} controllerchange listeners — exactly 1 is correct`).toBe(1);

    const posts = (code.match(/type:\s*'SKIP_WAITING'/g) || []).length;
    expect(posts, `${posts} SKIP_WAITING post sites — exactly 1 canonical door is correct`).toBe(1);

    // ⛔ The 80ms blind reload must be gone. A reload that races activation is the whole defect.
    expect(/setTimeout\(\s*function\s*\(\)\s*\{\s*window\.location\.reload\(\);?\s*\}\s*,\s*80\s*\)/.test(code),
      '⛔ the 80ms blind reload timer is still present').toBe(false);
  });

  test('navigations and version.json must not be answerable from a stale cache', async ({ phantom, page }) => {
    await phantom.boot();
    const sw = await page.evaluate(async () => (await fetch('./sw.js')).text());
    const code = sw.replace(/\/\*[\s\S]*?\*\//g, '').split('\n').filter((l) => !l.trim().startsWith('//')).join('\n');

    // A plain fetch(event.request) for a navigation can be served by the browser's HTTP cache —
    // GitHub Pages sends max-age — so "network-first" silently returned the OLD shell.
    const nav = code.slice(code.indexOf("mode === 'navigate'"), code.indexOf("mode === 'navigate'") + 500);
    expect(/cache:\s*'reload'/.test(nav),
      '⛔ the navigation fetch does not bypass the HTTP cache — a reload can restore the old shell').toBe(true);

    // The backstop asks "is there a newer build?"; it must not be answered from the old build.
    expect(/version\.json/.test(code) && /cache:\s*'no-store'/.test(code),
      '⛔ version.json is not served network-first — the update backstop reads its own stale cache').toBe(true);
  });
});

test.describe('SW update path — behaviour', () => {

  test('⛔ the badge is honest: it cannot claim an update with no worker waiting', async ({ phantom, page }) => {
    await phantom.boot();
    const r = await page.evaluate(() => {
      const pill = document.getElementById('sw-status-pill');
      if (!pill) return { skip: true };
      pill.setAttribute('data-sw-state', 'ready');
      // Force the exact call the version-file backstop used to make with nothing installed.
      sw_pillRefresh('update');
      return {
        skip: false,
        state: pill.getAttribute('data-sw-state'),
        actionable: phantom_swActionable(PHANTOM_SW_REG),
      };
    });
    if (r.skip) test.skip(true, 'no SW pill on this surface');
    // ⭐ THE FAILURE VALUE IS 'update'. That is precisely what the owner tapped and what did
    // nothing, because no worker existed to promote.
    expect(r.actionable, 'fixture invalid — a worker IS waiting, so this proves nothing').toBe(false);
    expect(r.state, '⛔ the badge claimed an update with no waiting worker — tapping it can only no-op').not.toBe('update');
  });

  test('the diagnostic reports the lifecycle position rather than requiring a console', async ({ phantom, page }) => {
    await phantom.boot();
    const d = await page.evaluate(() => (typeof phantom_swDiagnostics === 'function' ? phantom_swDiagnostics() : null));
    expect(d, 'phantom_swDiagnostics() is missing — the failure cannot be classified on the device').not.toBeNull();
    for (const field of ['app build', 'controller', 'SW installing', 'SW waiting', 'SW active', 'actionable']) {
      expect(d, `the diagnostic omits "${field}"`).toContain(field);
    }
  });

  test('an activation attempt with nothing to promote FAILS LOUDLY and restores the control', async ({ phantom, page }) => {
    await phantom.boot();
    const r = await page.evaluate(async () => {
      const warns = [];
      const orig = console.warn;
      console.warn = function () { warns.push(Array.from(arguments).join(' ')); orig.apply(console, arguments); };
      try {
        phantom_swApplyUpdate();
        await new Promise((res) => setTimeout(res, 1500));
      } finally { console.warn = orig; }
      const pill = document.getElementById('sw-status-pill');
      return { warns, state: pill ? pill.getAttribute('data-sw-state') : null };
    });
    // ⛔ Contract 14. The original failure mode was a control that looked like it worked while
    // doing nothing; silence here is the defect, not the absence of one.
    expect(r.warns.some((w) => /update did not activate|no registration|no update available|update check failed/i.test(w)),
      `no diagnostic was logged for a failed activation — got: ${JSON.stringify(r.warns)}`).toBe(true);
    expect(r.state, 'the pill was left stuck on UPDATING after a failed activation').not.toBe('busy');
  });

  test('⛔ operational data is never touched by an update attempt', async ({ phantom, page }) => {
    await phantom.boot();
    const r = await page.evaluate(async () => {
      localStorage.setItem('phantom_site_profile_v1', JSON.stringify({ schemaVersion: 2, facilityId: 'KEEPME' }));
      localStorage.setItem('phantom_deploy_racks_v1', JSON.stringify([{ id: 'rack-keepme' }]));
      phantom_swApplyUpdate();
      await new Promise((res) => setTimeout(res, 1500));
      return {
        profile: localStorage.getItem('phantom_site_profile_v1'),
        racks: localStorage.getItem('phantom_deploy_racks_v1'),
      };
    });
    // Application shell cache is not operational truth. An update path that clears field data to
    // get itself unstuck has destroyed the thing the app exists to hold.
    expect(r.profile, '⛔ the site profile was destroyed by an update attempt').toContain('KEEPME');
    expect(r.racks, '⛔ rack data was destroyed by an update attempt').toContain('rack-keepme');
  });
});
