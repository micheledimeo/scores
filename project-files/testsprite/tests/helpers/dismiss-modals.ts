import { Page } from '@playwright/test';

/**
 * Dismiss Nextcloud First Run Wizard modal if present
 * This modal intercepts pointer events and blocks test interactions
 */
export async function dismissFirstRunWizard(page: Page): Promise<void> {
  try {
    // Wait a bit for modal to appear if it's going to
    await page.waitForTimeout(1500);

    // Check if modal exists in DOM
    const modalExists = await page.evaluate(() => {
      return document.querySelector('#firstrunwizard') !== null;
    });

    if (modalExists) {
      console.log('  → Dismissing First Run Wizard modal...');

      // Force remove the modal from DOM using JavaScript
      // This bypasses all click interception issues
      await page.evaluate(() => {
        const modal = document.querySelector('#firstrunwizard');
        if (modal) {
          modal.remove();
        }
      });

      await page.waitForTimeout(500);

      // Verify modal is gone
      const stillExists = await page.evaluate(() => {
        return document.querySelector('#firstrunwizard') !== null;
      });

      if (!stillExists) {
        console.log('  ✓ Modal removed from DOM');
      } else {
        console.log('  ⚠ Modal still present after removal attempt');
      }
    }
  } catch (error) {
    // Silently continue if modal is not present or already closed
    console.log('  → No modal to dismiss or already closed');
  }
}

/**
 * Dismiss all blocking modals that might interfere with tests
 */
export async function dismissAllModals(page: Page): Promise<void> {
  await dismissFirstRunWizard(page);
  // Add more modal dismissal functions here if needed
}
