import { existsSync } from 'node:fs';
import { defineConfig } from '@playwright/test';

const configuredBrowser = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
const executablePath = configuredBrowser || [
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/google-chrome',
].find((candidate) => existsSync(candidate));

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: 2,
  timeout: 30_000,
  expect: { timeout: 7_000 },
  outputDir: './test-results',
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000',
    browserName: 'chromium',
    launchOptions: executablePath ? { executablePath } : {},
    locale: 'en-US',
    timezoneId: 'Europe/Berlin',
    colorScheme: 'light',
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  // The collection server is started separately. Tests never create another server.
});
