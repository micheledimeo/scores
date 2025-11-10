import { test, expect } from '@playwright/test';
import { dismissAllModals } from './helpers/dismiss-modals';

/**
 * Scores App - Basic Smoke Tests
 *
 * These tests verify core functionality of the Scores app.
 * Run with: npm test
 */

test.describe('Scores App - Basic UI', () => {
  test('should load the app homepage', async ({ page }) => {
    await page.goto('/index.php/apps/mxmlscores/', { timeout: 30000 });
    await dismissAllModals(page);
    await expect(page).toHaveTitle(/Scores/, { timeout: 10000 });
  });

  test('should display welcome screen when no file is selected', async ({ page }) => {
    await page.goto('/index.php/apps/mxmlscores/', { timeout: 30000 });
    await expect(page.locator('text=Welcome to Scores')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Quick Tips')).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Scores App - Test Sample Mode', () => {
  test('should load test sample with ?testSample=1', async ({ page }) => {
    // Set up console listener BEFORE navigating
    const consoleMessages: string[] = [];
    page.on('console', msg => {
      if (msg.text().includes('[DEV]')) {
        consoleMessages.push(msg.text());
      }
    });

    // Navigate with test sample parameter
    await page.goto('/index.php/apps/mxmlscores/?testSample=1', { timeout: 30000 });

    // Wait for the music viewer to load
    await page.waitForSelector('.music-viewer', { timeout: 30000 });

    // Check that OSMD rendered the score (SVG elements present)
    const svgElements = await page.locator('.music-viewer svg').count();
    expect(svgElements).toBeGreaterThan(0);

    // Verify DEV messages were logged
    await page.waitForTimeout(2000);
    expect(consoleMessages.length).toBeGreaterThan(0);
    expect(consoleMessages.some(msg => msg.includes('Test sample loaded'))).toBeTruthy();
  });

  test('should display playback controls', async ({ page }) => {
    await page.goto('/index.php/apps/mxmlscores/?testSample=1', { timeout: 30000 });
    await page.waitForSelector('.playback-controls', { timeout: 30000 });

    // Check for play/pause/stop buttons
    await expect(page.locator('.control-group button').first()).toBeVisible({ timeout: 10000 });

    // Check for tempo and volume controls
    await expect(page.locator('.tempo-control')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.volume-control')).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Scores App - Playback Controls', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.php/apps/mxmlscores/?testSample=1', { timeout: 30000 });
    await dismissAllModals(page);
    await page.waitForSelector('.music-viewer', { timeout: 30000 });
  });

  test('should have playback buttons visible', async ({ page }) => {
    const playButton = page.locator('button[aria-label*="Play"]').first();
    await expect(playButton).toBeVisible({ timeout: 10000 });
    await expect(playButton).toBeEnabled();
  });

  test('should have tempo control', async ({ page }) => {
    const tempoInput = page.locator('#tempo-input');
    await expect(tempoInput).toBeVisible({ timeout: 10000 });
    await expect(tempoInput).toHaveAttribute('type', 'number');
  });

  test('should have volume control', async ({ page }) => {
    const volumeInput = page.locator('#volume-input');
    await expect(volumeInput).toBeVisible({ timeout: 10000 });
    await expect(volumeInput).toHaveAttribute('type', 'number');
  });

  test('should have zoom controls', async ({ page }) => {
    const zoomControls = page.locator('.zoom-controls');
    await expect(zoomControls).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Scores App - Navigation', () => {
  test('should display app navigation sidebar', async ({ page }) => {
    await page.goto('/index.php/apps/mxmlscores/', { timeout: 30000 });
    await expect(page.locator('#app-navigation-vue')).toBeVisible({ timeout: 10000 });
  });

  test('should have search box in navigation', async ({ page }) => {
    await page.goto('/index.php/apps/mxmlscores/', { timeout: 30000 });
    const searchBox = page.locator('.app-navigation-search');
    await expect(searchBox).toBeVisible({ timeout: 10000 });
  });

  test('should have settings button in footer', async ({ page }) => {
    await page.goto('/index.php/apps/mxmlscores/', { timeout: 30000 });
    // The settings button has the name "Scores Folders" (translated string)
    const settingsButton = page.locator('text=Scores Folders');
    await expect(settingsButton).toBeVisible({ timeout: 10000 });
  });
});
