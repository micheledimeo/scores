import { test as setup, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Check for credentials in environment
  const username = process.env.NEXTCLOUD_USER || '';
  const password = process.env.NEXTCLOUD_PASSWORD || '';

  if (!username || !password) {
    console.error('Missing credentials! Set NEXTCLOUD_USER and NEXTCLOUD_PASSWORD environment variables.');
    console.log('Example: export NEXTCLOUD_USER=your_username');
    console.log('Example: export NEXTCLOUD_PASSWORD=your_password');
    throw new Error('Missing Nextcloud credentials');
  }

  // Go to Nextcloud login page
  await page.goto('/', {
    waitUntil: 'domcontentloaded',
    timeout: 30000
  });

  // Wait for login form - try multiple selectors
  await page.waitForSelector('input[name="user"], input[type="text"], input[id*="user"]', { timeout: 20000 });

  // Fill in credentials - use the first input field (username)
  const usernameField = page.locator('input[name="user"], input[type="text"]').first();
  await usernameField.fill(username);

  const passwordField = page.locator('input[name="password"], input[type="password"]').first();
  await passwordField.fill(password);

  // Click login/continue button
  await page.click('button:has-text("Continue"), button:has-text("Log in")');

  // Wait for navigation to complete
  await page.waitForURL(/\/apps\/dashboard|\/apps\/files/, { timeout: 15000 });

  // Verify logged in by checking for user menu
  await expect(page.locator('#user-menu, #expand')).toBeVisible({ timeout: 10000 });

  console.log('✓ Authentication successful');

  // Dismiss First Run Wizard modal if present
  try {
    const wizardModal = page.locator('#firstrunwizard');
    const closeButton = wizardModal.locator('button:has-text("Chiudi"), button:has-text("Close")');

    if (await wizardModal.isVisible({ timeout: 2000 })) {
      console.log('First Run Wizard detected, closing...');
      await closeButton.click({ timeout: 5000 });
      await page.waitForTimeout(1000);
      console.log('✓ First Run Wizard dismissed');
    }
  } catch (error) {
    console.log('No First Run Wizard to dismiss (already closed or not present)');
  }

  // Save authenticated state
  const dir = path.dirname(authFile);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  await page.context().storageState({ path: authFile });

  console.log(`✓ Auth state saved to ${authFile}`);
});
