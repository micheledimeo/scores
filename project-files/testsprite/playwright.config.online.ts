import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for online testing
 *
 * Tests the deployed app on https://cloud.ottoniascoppio.org
 * Requires Nextcloud authentication credentials in .env file
 */

export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // Sequential for online tests
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1, // Retry once for network issues
  workers: 1, // Single worker for online tests
  reporter: 'html',

  timeout: 60000, // 1 minute timeout for online tests

  use: {
    baseURL: 'https://cloud.ottoniascoppio.org/index.php/apps/mxmlscores/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    // Setup project for authentication
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    // Chromium tests with authenticated state
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json', // Reuse auth state
      },
      dependencies: ['setup'],
    },
  ],
});
