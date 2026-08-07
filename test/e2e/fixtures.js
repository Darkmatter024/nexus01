// Shared PHANTOM test fixture. Every spec imports { test, expect } from here.
//
// Design rules for this file:
//  1. No sleeps. Every wait is on an observable state the app actually reaches.
//  2. The console-error allowlist is NARROW and each entry carries the reason it is
//     benign. An allowlist that grows to keep the suite green is how a real regression
//     ships. If a new pattern needs adding, it needs a written reason here.
//  3. Seeding is explicit. A test that needs a confirmed site profile says so; it does
//     not inherit one from a previous spec.

const base = require('@playwright/test');

const expect = base.expect;

// ── Storage seeds ────────────────────────────────────────────────────────────────
// The first-run confirm gate (firstRun_show, :25882) fires over the app whenever
// siteProfile_isConfirmed() (:25741) is false — i.e. on every fresh browser profile.
// Tests that want to reach a real surface seed past it. Tests that assert the gate
// itself pass { confirmProfile: false }.
const SITE_PROFILE_KEY = 'phantom_site_profile_v1';

const SEEDED_PROFILE = {
  schemaVersion: 2,
  facilityId: 'TEST-01',
  facilityName: 'Harness Facility',
  operator: 'E2E',
  confirmedAt: 1750000000000,
  lastUpdated: 1750000000000,
};

// ── Console-error allowlist ──────────────────────────────────────────────────────
// Each entry MUST state why it is not a defect. Empty by intent: we start strict and
// only add with evidence, so the first run tells us the honest baseline.
const BENIGN_CONSOLE = [
  // Playwright's WebKit build reports this for the SW's opaque cross-origin probe on
  // some runs; it is a harness artifact, not app behaviour. Verified: no equivalent
  // entry appears in Safari on device.
  /Failed to load resource: the server responded with a status of 404 .*favicon/i,
];

function isBenign(text) {
  return BENIGN_CONSOLE.some((re) => re.test(text));
}

// ── The fixture ──────────────────────────────────────────────────────────────────
const test = base.test.extend({
  phantom: async ({ page }, use) => {
    /** @type {{type:string, text:string}[]} */
    const errors = [];

    page.on('console', (msg) => {
      const type = msg.type();
      if (type !== 'error' && type !== 'warning') return;
      const text = msg.text();
      if (type === 'error' && !isBenign(text)) errors.push({ type, text });
      // Warnings are collected but not fatal — PHANTOM uses console.warn deliberately
      // as its no-silent-failure channel, so a warn is a signal, not a failure.
      if (type === 'warning') errors.push({ type, text });
    });

    page.on('pageerror', (err) => {
      errors.push({ type: 'pageerror', text: String(err && err.message ? err.message : err) });
    });

    const api = {
      page,
      errors,

      /** Console entries of type 'error' or an uncaught exception. Warnings excluded. */
      hardErrors() {
        return errors.filter((e) => e.type === 'error' || e.type === 'pageerror');
      },

      /** console.warn entries — PHANTOM's intentional no-silent-failure channel. */
      warnings() {
        return errors.filter((e) => e.type === 'warning');
      },

      /**
       * Cold-boot the app and enter past the splash.
       * @param {{query?:string, confirmProfile?:boolean, seed?:Record<string,string>}} [opts]
       */
      async boot(opts = {}) {
        const { query = '', confirmProfile = true, seed = {} } = opts;

        const seeds = { ...seed };
        if (confirmProfile) seeds[SITE_PROFILE_KEY] = JSON.stringify(SEEDED_PROFILE);

        // Runs before any application script on every navigation of this page.
        await page.addInitScript((payload) => {
          try {
            for (const [k, v] of Object.entries(payload)) window.localStorage.setItem(k, v);
          } catch (_) {
            /* quota or disabled storage — the app's own guards are what we're testing */
          }
        }, seeds);

        await page.goto('/dct-ios.html' + query, { waitUntil: 'domcontentloaded' });

        // The splash is a tap-anywhere gate (:12900). #pe-tapcatch is a real <button>.
        const tap = page.locator('#pe-tapcatch');
        await tap.waitFor({ state: 'attached', timeout: 20_000 });
        await tap.click({ force: true });

        // launch() reveals #app then hides #boot on the next frame (:18383).
        // Wait on the end state, never on the animation duration.
        await page.waitForFunction(() => {
          const boot = document.getElementById('boot');
          const app = document.getElementById('app');
          return !!app && app.classList.contains('visible') && !!boot && boot.style.display === 'none';
        }, undefined, { timeout: 25_000 });

        // Entry failure is reported on the splash itself (:12878), not only in console.
        const hint = await page.locator('#pe-taphint').textContent().catch(() => '');
        expect(hint || '', 'boot entry reported a failure on the splash').not.toMatch(/ENTRY FAILED/i);

        return api;
      },

      /** The version the running app reports, read from its own service-worker manifest. */
      async liveVersion() {
        const res = await page.request.get('/version.json');
        const json = await res.json();
        return json.version;
      },

      /**
       * Unregister the service worker and delete every cache.
       * A URL cache-buster does NOT bypass a registered SW — this is the only reliable
       * way to guarantee the next boot serves the working tree.
       */
      async clearServiceWorker() {
        await page.evaluate(async () => {
          if (navigator.serviceWorker) {
            const regs = await navigator.serviceWorker.getRegistrations();
            await Promise.all(regs.map((r) => r.unregister()));
          }
          if (window.caches) {
            const keys = await caches.keys();
            await Promise.all(keys.map((k) => caches.delete(k)));
          }
        });
      },

      /** True when the redesign house is active (bare URL default since v1.14.101). */
      async isRedesign() {
        return page.evaluate(() => document.body.classList.contains('rd'));
      },

      /** Assert the document never exceeds the viewport horizontally (Design Rule 1). */
      async assertNoHorizontalOverflow() {
        const over = await page.evaluate(() => {
          const de = document.documentElement;
          return {
            scrollW: de.scrollWidth,
            clientW: de.clientWidth,
            offenders: Array.from(document.querySelectorAll('body *'))
              .filter((el) => {
                const r = el.getBoundingClientRect();
                return r.width > 0 && r.right > de.clientWidth + 1;
              })
              .slice(0, 8)
              .map((el) => `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : ''}`),
          };
        });
        expect(over.scrollW, `horizontal overflow: ${over.offenders.join(' | ')}`).toBeLessThanOrEqual(over.clientW + 1);
      },
    };

    await use(api);
  },
});

module.exports = { test, expect, SITE_PROFILE_KEY, SEEDED_PROFILE };
