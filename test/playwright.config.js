// PHANTOM regression harness — device matrix per SIX-WEEK DIRECTIVE §9.2.
//
// READ THIS BEFORE TRUSTING A GREEN RUN:
// WebKit-on-Windows is NOT iOS Safari. Every field bug of the last two months was
// iOS-WebKit-specific (the .390-.405 blank aisle, display:contents over a measured
// WebGL mount, position:fixed under a transformed host, border-box glass on a raw
// <button>, async GPU context reclaim). This suite catches NONE of those.
// What it does catch: JS exceptions, console errors, dead doors, missing hosts,
// storage loss, offline boot failure, horizontal overflow, sub-minimum tap targets,
// absent first frames. The physical iPhone gate stays mandatory.

const { defineConfig, devices } = require('@playwright/test');

const PORT = Number(process.env.PHANTOM_PORT || 4317);
const BASE = `http://127.0.0.1:${PORT}`;

module.exports = defineConfig({
  testDir: './e2e',
  outputDir: './test-results',
  // The app is a 3.3MB single file that parses, registers a SW and may build a WebGL
  // scene. 45s is the observed ceiling for a cold WebKit boot, not a guess-and-pad.
  timeout: 45_000,
  expect: { timeout: 10_000 },
  // Serial by default: several specs assert on storage and service-worker state, which
  // are per-origin and would race across workers on one shared origin.
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: 0, // A flaky field app must fail loudly. Retries would hide exactly what we hunt.
  reporter: [['list'], ['html', { open: 'never', outputFolder: './playwright-report' }]],

  use: {
    baseURL: BASE,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
    actionTimeout: 10_000,
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      // The primary field device. Everything must pass here first.
      name: 'phone-webkit',
      use: { ...devices['iPhone 13'], browserName: 'webkit', viewport: { width: 390, height: 844 } },
    },
    {
      name: 'tablet-webkit',
      use: { browserName: 'webkit', viewport: { width: 834, height: 1194 }, hasTouch: true, isMobile: false },
    },
    {
      name: 'laptop-chromium',
      use: { browserName: 'chromium', viewport: { width: 1366, height: 768 } },
    },
    {
      name: 'desktop-chromium',
      use: { browserName: 'chromium', viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'reduced-motion',
      use: { browserName: 'webkit', viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' },
    },
  ],

  webServer: {
    command: 'node server.js',
    url: BASE + '/version.json',
    reuseExistingServer: true,
    timeout: 20_000,
    cwd: __dirname,
  },
});
