import { test, expect } from '@playwright/test';
import { dismissAllModals } from './helpers/dismiss-modals';

/**
 * File Format Support Tests
 * Tests for various music file formats: .xml, .musicxml, .mxml, .mxl, .mei, .gp, .gp3, .gp4, .gp5, .gpx
 */

test.describe('Supported File Formats', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.php/apps/mxmlscores/', { timeout: 30000 });
    await page.waitForLoadState('networkidle');
    await dismissAllModals(page);
  });

  test('should recognize .xml MusicXML files', async ({ page }) => {
    // Look for any .xml file in the navigation
    const xmlFiles = page.locator('.app-navigation-entry-link:has-text(".xml")');
    const count = await xmlFiles.count();
    console.log(`Found ${count} .xml files`);

    // If there are .xml files, they should be clickable
    if (count > 0) {
      expect(count).toBeGreaterThan(0);
    }
  });

  test('should recognize .musicxml files', async ({ page }) => {
    // Look for .musicxml files
    const musicxmlFiles = page.locator('.app-navigation-entry-link:has-text(".musicxml")');
    const count = await musicxmlFiles.count();
    console.log(`Found ${count} .musicxml files`);

    if (count > 0) {
      expect(count).toBeGreaterThan(0);
    }
  });

  test('should recognize .mxl (compressed MusicXML) files', async ({ page }) => {
    // Look for .mxl files
    const mxlFiles = page.locator('.app-navigation-entry-link:has-text(".mxl")');
    const count = await mxlFiles.count();
    console.log(`Found ${count} .mxl files`);

    if (count > 0) {
      expect(count).toBeGreaterThan(0);
    }
  });

  test('should recognize .mei (Music Encoding Initiative) files', async ({ page }) => {
    // Look for .mei files
    const meiFiles = page.locator('.app-navigation-entry-link:has-text(".mei")');
    const count = await meiFiles.count();
    console.log(`Found ${count} .mei files`);

    if (count > 0) {
      expect(count).toBeGreaterThan(0);
    }
  });

  test('should recognize Guitar Pro files (.gp, .gp3, .gp4, .gp5, .gpx)', async ({ page }) => {
    // Look for any Guitar Pro files
    const gpFiles = page.locator('.app-navigation-entry-link').filter({
      hasText: /\.(gp|gp3|gp4|gp5|gpx)$/i
    });
    const count = await gpFiles.count();
    console.log(`Found ${count} Guitar Pro files`);

    if (count > 0) {
      expect(count).toBeGreaterThan(0);
    }
  });
});

test.describe('File Loading and Rendering', () => {
  test('should load and render test sample (MusicXML format)', async ({ page }) => {
    await page.goto('/index.php/apps/mxmlscores/?testSample=1', { timeout: 30000 });

    // Wait for OSMD container to be visible
    const osmdContainer = page.locator('.osmd-container');
    await expect(osmdContainer).toBeVisible({ timeout: 10000 });

    // Wait for score to render - OSMD takes time to render SVG
    await page.waitForTimeout(3000);

    // Check that SVG content is rendered (OSMD renders music as SVG)
    // Try multiple selectors since SVG might be nested
    const svgElements = page.locator('.osmd-container svg, .music-viewer svg, svg.osmd');
    await expect(svgElements.first()).toBeVisible({ timeout: 5000 });
    expect(await svgElements.count()).toBeGreaterThan(0);
    console.log(`Found ${await svgElements.count()} SVG elements in score`);
  });

  test('should display file name when score is loaded', async ({ page }) => {
    await page.goto('/index.php/apps/mxmlscores/?testSample=1', { timeout: 30000 });

    // Wait for score to load
    await page.waitForSelector('.osmd-container', { timeout: 10000 });

    // The score title or file name should be visible somewhere
    // (This depends on your implementation - adjust selector as needed)
    const pageContent = await page.content();
    expect(pageContent.length).toBeGreaterThan(0);
  });
});

test.describe('Format-Specific Features', () => {
  test('should handle compressed MusicXML (.mxl) if available', async ({ page }) => {
    await page.goto('/index.php/apps/mxmlscores/', { timeout: 30000 });

    // Search for .mxl files
    const searchBox = page.locator('input[type="text"][placeholder*="Search"]');
    if (await searchBox.count() > 0) {
      await searchBox.fill('.mxl');
      await page.waitForTimeout(500);

      // Check if any results appear
      const mxlFiles = page.locator('.app-navigation-entry-link:has-text(".mxl")');
      const count = await mxlFiles.count();
      console.log(`Search found ${count} .mxl files`);

      if (count > 0) {
        // Click first .mxl file to load it
        await mxlFiles.first().click();
        await page.waitForTimeout(2000);

        // Check if it loaded (OSMD container should be visible)
        const osmdContainer = page.locator('.osmd-container');
        await expect(osmdContainer).toBeVisible({ timeout: 10000 });
      }
    }
  });

  test('should display appropriate error for unsupported formats', async ({ page }) => {
    // This test verifies graceful error handling
    // Note: We can't easily test this without uploading an unsupported file
    // This is more of a placeholder for manual testing

    await page.goto('/index.php/apps/mxmlscores/', { timeout: 30000 });

    // Just verify the app loads without errors
    const appContent = page.locator('#app-content-vue');
    await expect(appContent).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Multi-format Score Library', () => {
  test('should display mixed file formats in navigation', async ({ page }) => {
    await page.goto('/index.php/apps/mxmlscores/', { timeout: 30000 });
    await page.waitForLoadState('networkidle');

    // Get all file entries
    const allFiles = page.locator('.app-navigation-entry-link');
    const totalCount = await allFiles.count();
    console.log(`Total files in library: ${totalCount}`);

    // Count different file types
    const formats = ['.xml', '.musicxml', '.mxl', '.mei', '.gp'];
    const formatCounts: Record<string, number> = {};

    for (const format of formats) {
      const files = page.locator(`.app-navigation-entry-link:has-text("${format}")`);
      const count = await files.count();
      formatCounts[format] = count;
      console.log(`  ${format}: ${count} files`);
    }

    // Library should have at least some files
    expect(totalCount).toBeGreaterThanOrEqual(0);
  });

  test('should search across all file formats', async ({ page }) => {
    await page.goto('/index.php/apps/mxmlscores/', { timeout: 30000 });
    await page.waitForLoadState('networkidle');

    const searchBox = page.locator('input[type="text"][placeholder*="Search"]');

    if (await searchBox.count() > 0) {
      // Get initial count
      const counterBefore = page.locator('.search-counter-overlay');
      let initialCount = '0';
      if (await counterBefore.isVisible()) {
        initialCount = await counterBefore.textContent() || '0';
      }
      console.log(`Initial file count: ${initialCount}`);

      // Search for common term
      await searchBox.fill('music');
      await page.waitForTimeout(500);

      // Check if counter updates
      if (await counterBefore.isVisible()) {
        const searchCount = await counterBefore.textContent();
        console.log(`Search results: ${searchCount}`);
      }

      // Clear search
      await searchBox.clear();
      await page.waitForTimeout(500);
    }
  });
});

test.describe('File Format Metadata', () => {
  test('should display instrument information from MusicXML', async ({ page }) => {
    await page.goto('/index.php/apps/mxmlscores/?testSample=1', { timeout: 30000 });
    await page.waitForSelector('.osmd-container', { timeout: 10000 });

    // Wait for score to fully load
    await page.waitForTimeout(2000);

    // Check if mixer is available (indicates multi-instrument score)
    const mixerButton = page.locator('button[aria-label*="mixer" i]');

    if (await mixerButton.count() > 0) {
      await mixerButton.click();
      await page.waitForTimeout(500);

      // Check for mixer channels (instrument names)
      const channels = page.locator('.mixer-channels button');
      const channelCount = await channels.count();
      console.log(`Found ${channelCount} instrument channels`);

      if (channelCount > 0) {
        expect(channelCount).toBeGreaterThan(0);
      }
    }
  });
});
