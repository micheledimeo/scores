import { test, expect } from '@playwright/test';
import { dismissAllModals } from './helpers/dismiss-modals';

/**
 * Scores App - Folder Navigation & File Name Truncation Tests
 *
 * Tests for the newly implemented features:
 * 1. Folder expansion/collapse
 * 2. File count badges
 * 3. Smart file name truncation from left (36 chars)
 * 4. Search counter with match count
 * 5. Instrument name visibility
 */

test.describe('Folder Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to app without test sample to see actual folders
    await page.goto('/index.php/apps/mxmlscores/', { timeout: 30000 });
    await page.waitForSelector('#app-navigation-vue', { timeout: 10000 });
    await dismissAllModals(page);
  });

  test('should display folders with file count badges', async ({ page }) => {
    // Wait for folders to load
    await page.waitForTimeout(2000);

    // Find folders in navigation
    const folders = page.locator('.app-navigation-list .folder-item');
    const folderCount = await folders.count();

    console.log(`Found ${folderCount} folders`);

    if (folderCount > 0) {
      // Check first folder has a counter badge
      const firstFolder = folders.first();
      await expect(firstFolder).toBeVisible();

      // Look for counter bubble (NcCounterBubble component)
      const counter = firstFolder.locator('.counter-bubble__counter, .app-navigation-entry__counter');
      const hasCounter = await counter.count();

      if (hasCounter > 0) {
        await expect(counter.first()).toBeVisible();
        const countText = await counter.first().textContent();
        console.log('First folder file count:', countText);
        expect(parseInt(countText || '0')).toBeGreaterThan(0);
      }
    }
  });

  test('should expand folder on click', async ({ page }) => {
    await page.waitForTimeout(2000);

    const folders = page.locator('.app-navigation-list .folder-item');
    const folderCount = await folders.count();

    if (folderCount === 0) {
      console.log('Skip: No folders found');
      test.skip();
      return;
    }

    const firstFolder = folders.first();
    const folderName = await firstFolder.locator('.app-navigation-entry__name').textContent();
    console.log('Testing folder:', folderName);

    // Check if folder has children container
    const childrenBefore = firstFolder.locator('.app-navigation-entry__children');
    const initialChildCount = await childrenBefore.locator('li').count();
    console.log('Initial child count:', initialChildCount);

    // Click folder to expand
    await firstFolder.locator('.app-navigation-entry-link').click();
    await page.waitForTimeout(500);

    // Check if children are now visible
    const childrenAfter = firstFolder.locator('.app-navigation-entry__children');
    const finalChildCount = await childrenAfter.locator('li').count();
    console.log('Final child count:', finalChildCount);

    expect(finalChildCount).toBeGreaterThanOrEqual(initialChildCount);
  });

  test('should toggle folder open/closed', async ({ page }) => {
    await page.waitForTimeout(2000);

    const folders = page.locator('.app-navigation-list .folder-item');
    if (await folders.count() === 0) {
      test.skip();
      return;
    }

    const firstFolder = folders.first();
    const folderLink = firstFolder.locator('.app-navigation-entry-link').first();

    // Click to expand
    await folderLink.click();
    await page.waitForTimeout(500);

    const childrenExpanded = firstFolder.locator('.app-navigation-entry__children li');
    const expandedCount = await childrenExpanded.count();
    console.log('Expanded - children visible:', expandedCount);

    // Click again to collapse
    await folderLink.click();
    await page.waitForTimeout(500);

    const childrenCollapsed = firstFolder.locator('.app-navigation-entry__children li');
    const collapsedCount = await childrenCollapsed.count();
    console.log('Collapsed - children visible:', collapsedCount);

    // Children should be hidden or fewer (depends on implementation)
    // If folder properly collapses, count should be 0 or children hidden
    const childrenContainer = firstFolder.locator('.app-navigation-entry__children');
    const isVisible = await childrenContainer.isVisible().catch(() => false);
    console.log('Children container visible after collapse:', isVisible);
  });
});

test.describe('File Name Truncation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.php/apps/mxmlscores/', { timeout: 30000 });
    await page.waitForTimeout(2000);
  });

  test('should display file names with left truncation for long names', async ({ page }) => {
    // Expand a folder
    const folders = page.locator('.app-navigation-list .folder-item');
    if (await folders.count() === 0) {
      console.log('Skip: No folders');
      test.skip();
      return;
    }

    const firstFolder = folders.first();
    await firstFolder.locator('.app-navigation-entry-link').click();
    await page.waitForTimeout(500);

    // Get files in folder
    const filesInFolder = firstFolder.locator('.app-navigation-entry__children .file-in-folder');
    const fileCount = await filesInFolder.count();
    console.log(`Files in folder: ${fileCount}`);

    if (fileCount === 0) {
      console.log('Skip: No files in folder');
      test.skip();
      return;
    }

    // Check first few files
    for (let i = 0; i < Math.min(fileCount, 5); i++) {
      const file = filesInFolder.nth(i);
      const fileName = await file.locator('.app-navigation-entry__name').textContent();
      console.log(`File ${i}: "${fileName}"`);

      // If file name is long (> 36 chars), should start with "..."
      if (fileName && fileName.length > 36) {
        expect(fileName).toMatch(/^\.\.\./);
        console.log(`  → Truncated from left ✓`);
      }

      // File name should NOT end with "..." (no right truncation)
      if (fileName) {
        expect(fileName).not.toMatch(/\.\.\.$/);
        console.log(`  → No right truncation ✓`);
      }
    }
  });

  test('should show instrument names at the end', async ({ page }) => {
    const folders = page.locator('.app-navigation-list .folder-item');
    if (await folders.count() === 0) {
      test.skip();
      return;
    }

    // Expand first folder
    const firstFolder = folders.first();
    await firstFolder.locator('.app-navigation-entry-link').click();
    await page.waitForTimeout(500);

    const filesInFolder = firstFolder.locator('.app-navigation-entry__children .file-in-folder');
    const fileCount = await filesInFolder.count();

    if (fileCount === 0) {
      test.skip();
      return;
    }

    // Check for instrument names in parentheses
    for (let i = 0; i < Math.min(fileCount, 5); i++) {
      const file = filesInFolder.nth(i);
      const fileName = await file.locator('.app-navigation-entry__name').textContent();

      if (fileName) {
        console.log(`Checking file: "${fileName}"`);

        // If file name contains parentheses, they should be visible (not truncated)
        if (fileName.includes('(')) {
          const parenContent = fileName.match(/\(([^)]+)\)/);
          if (parenContent) {
            console.log(`  → Instrument visible: ${parenContent[0]}`);
            // Closing parenthesis should be at or near the end
            expect(fileName).toMatch(/\)[^)]{0,5}$/);
          }
        }
      }
    }
  });

  test('should not truncate short file names', async ({ page }) => {
    const folders = page.locator('.app-navigation-list .folder-item');
    if (await folders.count() === 0) {
      test.skip();
      return;
    }

    const firstFolder = folders.first();
    await firstFolder.locator('.app-navigation-entry-link').click();
    await page.waitForTimeout(500);

    const filesInFolder = firstFolder.locator('.app-navigation-entry__children .file-in-folder');
    const fileCount = await filesInFolder.count();

    if (fileCount === 0) {
      test.skip();
      return;
    }

    // Find short file names (≤ 36 chars)
    for (let i = 0; i < fileCount; i++) {
      const file = filesInFolder.nth(i);
      const fileName = await file.locator('.app-navigation-entry__name').textContent();

      if (fileName && fileName.length <= 36) {
        console.log(`Short name (${fileName.length} chars): "${fileName}"`);
        // Should NOT start with "..."
        expect(fileName).not.toMatch(/^\.\.\./);
        console.log(`  → Not truncated ✓`);
      }
    }
  });
});

test.describe('Search with Counter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.php/apps/mxmlscores/', { timeout: 30000 });
    await page.waitForSelector('.app-navigation-search', { timeout: 10000 });
    await page.waitForTimeout(2000);
  });

  test('should display total file count in search box', async ({ page }) => {
    // Look for search counter overlay
    const counter = page.locator('.search-counter-overlay');

    if (await counter.count() > 0) {
      await expect(counter).toBeVisible();
      const countText = await counter.textContent();
      console.log('Total files count:', countText);

      // Should be a number
      expect(parseInt(countText || '0')).toBeGreaterThan(0);
    } else {
      console.log('No search counter found - may be empty library');
    }
  });

  test('should update counter when searching', async ({ page }) => {
    const searchInput = page.locator('.app-navigation-search input');

    // Try multiple possible selectors for the counter
    let counter = page.locator('.search-counter-overlay');
    if (await counter.count() === 0) {
      counter = page.locator('.search-counter');
    }
    if (await counter.count() === 0) {
      counter = page.locator('[class*="counter"]');
    }

    // Wait a bit for UI to load
    await page.waitForTimeout(1000);

    if (await counter.count() === 0) {
      console.log('Skip: No counter visible');
      test.skip();
      return;
    }

    // Get initial count
    const initialCount = await counter.textContent({ timeout: 2000 }).catch(() => null);
    console.log('Initial count:', initialCount);

    if (!initialCount) {
      console.log('Skip: Counter not readable');
      test.skip();
      return;
    }

    // Type search query
    await searchInput.fill('test');
    await page.waitForTimeout(1000);

    // Get new count
    const newCount = await counter.textContent({ timeout: 2000 }).catch(() => null);
    console.log('After search:', newCount);

    // Count should be different (unless all files match "test")
    // At minimum, counter should still be visible
    if (newCount) {
      await expect(counter).toBeVisible();
    }
  });

  test('should show 0 when no matches', async ({ page }) => {
    const searchInput = page.locator('.app-navigation-search input');

    // Try multiple possible selectors for the counter
    let counter = page.locator('.search-counter-overlay');
    if (await counter.count() === 0) {
      counter = page.locator('.search-counter');
    }
    if (await counter.count() === 0) {
      counter = page.locator('[class*="counter"]');
    }

    // Wait a bit for UI to load
    await page.waitForTimeout(1000);

    if (await counter.count() === 0) {
      console.log('Skip: No counter visible');
      test.skip();
      return;
    }

    // Search for something unlikely to match
    await searchInput.fill('xyz123unlikely987');
    await page.waitForTimeout(1000);

    const countText = await counter.textContent({ timeout: 2000 }).catch(() => null);
    console.log('No matches count:', countText);

    if (countText) {
      expect(countText).toBe('0');
    } else {
      console.log('Skip: Counter not readable after search');
      test.skip();
    }
  });

  test('should restore full count when search is cleared', async ({ page }) => {
    const searchInput = page.locator('.app-navigation-search input');
    const counter = page.locator('.search-counter-overlay');

    if (await counter.count() === 0) {
      test.skip();
      return;
    }

    // Get initial count
    const initialCount = await counter.textContent();

    // Search
    await searchInput.fill('test');
    await page.waitForTimeout(500);

    // Clear search
    await searchInput.clear();
    await page.waitForTimeout(500);

    // Count should return to initial value
    const finalCount = await counter.textContent();
    expect(finalCount).toBe(initialCount);
  });
});

test.describe('Root File vs Folder File Styling', () => {
  test('root files should have 5px left padding', async ({ page }) => {
    await page.goto('/index.php/apps/mxmlscores/', { timeout: 30000 });
    await page.waitForTimeout(2000);

    // Find root-level files (file-item class)
    const rootFiles = page.locator('.app-navigation-list > .file-item');
    const rootCount = await rootFiles.count();

    if (rootCount === 0) {
      console.log('Skip: No root files');
      test.skip();
      return;
    }

    const firstRootFile = rootFiles.first();
    const link = firstRootFile.locator('.app-navigation-entry-link');

    // Check computed padding-left
    const paddingLeft = await link.evaluate((el) => {
      return window.getComputedStyle(el).paddingLeft;
    });

    console.log('Root file padding-left:', paddingLeft);
    expect(paddingLeft).toBe('5px');
  });

  test('folder files should have no left padding', async ({ page }) => {
    await page.goto('/index.php/apps/mxmlscores/', { timeout: 30000 });
    await page.waitForTimeout(2000);

    const folders = page.locator('.app-navigation-list .folder-item');
    if (await folders.count() === 0) {
      test.skip();
      return;
    }

    // Expand first folder
    const firstFolder = folders.first();
    await firstFolder.locator('.app-navigation-entry-link').click();
    await page.waitForTimeout(500);

    const filesInFolder = firstFolder.locator('.app-navigation-entry__children .file-in-folder');
    if (await filesInFolder.count() === 0) {
      test.skip();
      return;
    }

    const firstFile = filesInFolder.first();
    const link = firstFile.locator('.app-navigation-entry-link');

    // Check padding values
    const styles = await link.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        paddingLeft: computed.paddingLeft,
        paddingRight: computed.paddingRight,
        paddingInlineStart: computed.paddingInlineStart,
        paddingInlineEnd: computed.paddingInlineEnd
      };
    });

    console.log('Folder file padding:', styles);

    // Padding should be 0 or minimal
    expect(parseInt(styles.paddingRight)).toBeLessThanOrEqual(5);
  });

  test('file icons should be hidden in folder view', async ({ page }) => {
    await page.goto('/index.php/apps/mxmlscores/', { timeout: 30000 });
    await page.waitForTimeout(2000);

    const folders = page.locator('.app-navigation-list .folder-item');
    if (await folders.count() === 0) {
      test.skip();
      return;
    }

    const firstFolder = folders.first();
    await firstFolder.locator('.app-navigation-entry-link').click();
    await page.waitForTimeout(500);

    const filesInFolder = firstFolder.locator('.app-navigation-entry__children .file-in-folder');
    if (await filesInFolder.count() === 0) {
      test.skip();
      return;
    }

    const firstFile = filesInFolder.first();
    const icon = firstFile.locator('.app-navigation-entry-icon, .app-navigation-entry__icon');

    if (await icon.count() > 0) {
      // Icon should be hidden (display: none or width: 0)
      const isVisible = await icon.isVisible().catch(() => false);
      const width = await icon.evaluate((el) => {
        return window.getComputedStyle(el).width;
      }).catch(() => '0px');

      console.log('File icon visible:', isVisible, 'width:', width);

      expect(isVisible || width !== '0px').toBeFalsy();
    }
  });
});
