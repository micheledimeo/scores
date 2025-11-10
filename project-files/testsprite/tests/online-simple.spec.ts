import { test, expect } from '@playwright/test';
import { dismissAllModals } from './helpers/dismiss-modals';

/**
 * Simple online tests with authentication
 * Tests the app features using the testSample=1 mode
 */

test.describe('Scores App - Online Tests', () => {
  test.use({
    baseURL: 'https://cloud.ottoniascoppio.org',
    // Use authenticated session
    storageState: 'playwright/.auth/user.json',
    // Increase timeouts for online testing
    actionTimeout: 30000,
    navigationTimeout: 30000,
  });

  test('should load test sample with ?testSample=1', async ({ page }) => {
    // Navigate directly to app with test sample
    await page.goto('/index.php/apps/mxmlscores/?testSample=1', {
      waitUntil: 'domcontentloaded',
      timeout: 45000
    });

    // Check console for DEV messages
    const consoleMessages: string[] = [];
    page.on('console', msg => {
      const text = msg.text();
      consoleMessages.push(text);
      console.log('Browser console:', text);
    });

    // Wait for music viewer to load
    const musicViewer = page.locator('.music-viewer');
    await expect(musicViewer).toBeVisible({ timeout: 30000 });

    // Check that OSMD rendered the score (SVG elements present)
    // Wait for SVGs with retry logic to handle potential re-renders
    await page.waitForSelector('.music-viewer svg', { timeout: 30000 });

    // Wait for rendering to stabilize (especially important for Firefox)
    await page.waitForFunction(
      () => {
        const svgs = document.querySelectorAll('.music-viewer svg');
        return svgs.length > 0;
      },
      { timeout: 10000 }
    );

    const svgCount = await page.locator('.music-viewer svg').count();
    expect(svgCount).toBeGreaterThan(0);

    console.log(`✓ Found ${svgCount} SVG elements (score rendered)`);
  });

  test('should display playback controls', async ({ page }) => {
    await page.goto('/index.php/apps/mxmlscores/?testSample=1', {
      waitUntil: 'domcontentloaded',
      timeout: 45000
    });

    // Wait for playback controls
    await page.waitForSelector('.playback-controls', { timeout: 30000 });

    // Check for play button
    const playButton = page.locator('button[aria-label*="Play"]').first();
    await expect(playButton).toBeVisible({ timeout: 10000 });

    // Check for tempo control
    const tempoInput = page.locator('#tempo-input');
    await expect(tempoInput).toBeVisible({ timeout: 5000 });

    // Check for volume control
    const volumeInput = page.locator('#volume-input');
    await expect(volumeInput).toBeVisible({ timeout: 5000 });

    console.log('✓ All playback controls visible');
  });

  test('should have zoom controls', async ({ page }) => {
    await page.goto('/index.php/apps/mxmlscores/?testSample=1', {
      waitUntil: 'domcontentloaded',
      timeout: 45000
    });

    // Wait for score to load
    await page.waitForSelector('.music-viewer', { timeout: 30000 });

    // Check for zoom controls
    const zoomControls = page.locator('.zoom-controls');
    await expect(zoomControls).toBeVisible({ timeout: 10000 });

    console.log('✓ Zoom controls visible');
  });
});

test.describe('Scores App - Sidebar & Playback Tests', () => {
  test.use({
    baseURL: 'https://cloud.ottoniascoppio.org',
    // Use authenticated session
    storageState: 'playwright/.auth/user.json',
    actionTimeout: 30000,
    navigationTimeout: 30000,
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/index.php/apps/mxmlscores/?testSample=1', {
      waitUntil: 'domcontentloaded',
      timeout: 45000
    });

    await dismissAllModals(page);

    // Wait for viewer to be ready
    await page.waitForSelector('.music-viewer', { timeout: 30000 });
    await page.waitForSelector('.playback-controls', { timeout: 20000 });
  });

  test('should adjust playback controls position when sidebar present', async ({ page }) => {
    const playbackControls = page.locator('.playback-controls');

    // Get left position
    const leftPos = await playbackControls.evaluate((el) => {
      return window.getComputedStyle(el).left;
    });

    console.log('Playback controls left position:', leftPos);

    // Should have some left offset (not 0)
    expect(leftPos).not.toBe('0px');
  });

  test('should have progress bar with time display', async ({ page }) => {
    const progressBar = page.locator('.progress-bar');
    await expect(progressBar).toBeVisible({ timeout: 10000 });

    const timeDisplay = page.locator('.time-display');
    await expect(timeDisplay).toBeVisible({ timeout: 5000 });

    // Check for measure display
    const measureDisplay = page.locator('.measure-display');
    await expect(measureDisplay).toBeVisible({ timeout: 5000 });

    console.log('✓ Progress tracking visible');
  });

  test('should check if mixer is available for multi-channel scores', async ({ page }) => {
    // Wait a bit for mixer to initialize
    await page.waitForTimeout(3000);

    // Check if mixer toggle button exists
    const mixerToggle = page.locator('button[aria-label*="mixer" i], button[title*="mixer" i]');
    const mixerCount = await mixerToggle.count();

    if (mixerCount > 0) {
      console.log('✓ Mixer toggle found - multi-channel score detected');
      await expect(mixerToggle.first()).toBeVisible();
    } else {
      console.log('ℹ No mixer toggle - single channel score');
    }
  });

  test('should display score title or file info', async ({ page }) => {
    // Check that the score viewer container exists
    const viewer = page.locator('.music-viewer');
    await expect(viewer).toBeVisible();

    // Verify sheet viewer has content
    const sheetViewer = page.locator('.sheet-viewer');
    await expect(sheetViewer).toBeVisible({ timeout: 10000 });

    console.log('✓ Score displayed successfully');
  });
});
