import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;

/**
 * E2E tests run against the static export (`out/`), exactly what gets deployed.
 * Run `npm run build` first. Locally uses the installed Google Chrome; on CI
 * (or with PW_BUNDLED=1) uses Playwright's own Chromium (`npx playwright install chromium`).
 */
const channel = process.env.CI || process.env.PW_BUNDLED ? undefined : "chrome";
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    channel,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], channel, viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"], channel } },
  ],
  webServer: {
    command: `node scripts/serve-static.mjs out ${PORT}`,
    url: `http://localhost:${PORT}/`,
    // Always start a fresh server so a stale build on the port is never tested.
    reuseExistingServer: false,
  },
});
