const { test, expect } = require('@playwright/test');

test.describe('iOS Audio Diagnostics', () => {
  test.beforeEach(async ({ page }) => {
    // Capture all console messages for debugging
    page.on('console', msg => {
      const type = msg.type();
      const text = msg.text();
      if (type === 'error' || text.includes('Audio') || text.includes('iOS')) {
        console.log(`[${type}] ${text}`);
      }
    });

    // Capture page errors
    page.on('pageerror', error => {
      console.log(`[PAGE ERROR] ${error.message}`);
    });

    await page.goto('?testSample=1', { timeout: 30000 });
  });

  test('AudioContext initialization and state monitoring', async ({ page }) => {
    console.log('\n=== AudioContext Initialization Test ===\n');

    // Wait for music viewer to be ready
    await expect(page.locator('.music-viewer')).toBeVisible({ timeout: 30000 });

    // Check if AudioContext exists before play
    const audioContextBeforePlay = await page.evaluate(() => {
      return {
        exists: window.audioContext !== undefined,
        state: window.audioContext?.state,
        sampleRate: window.audioContext?.sampleRate,
        destination: window.audioContext?.destination?.channelCount,
      };
    });

    console.log('AudioContext before play:', JSON.stringify(audioContextBeforePlay, null, 2));

    // Click play button
    const playBtn = page.locator('button[aria-label="Play"]');
    if (await playBtn.isVisible({ timeout: 5000 })) {
      await playBtn.click();
      await page.waitForTimeout(2000);

      // Check AudioContext state after play
      const audioContextAfterPlay = await page.evaluate(() => {
        return {
          exists: window.audioContext !== undefined,
          state: window.audioContext?.state,
          sampleRate: window.audioContext?.sampleRate,
          currentTime: window.audioContext?.currentTime,
          destination: window.audioContext?.destination?.channelCount,
        };
      });

      console.log('AudioContext after play:', JSON.stringify(audioContextAfterPlay, null, 2));

      // Assertions
      expect(audioContextAfterPlay.exists).toBe(true);
      console.log(`✓ AudioContext state: ${audioContextAfterPlay.state}`);

      if (audioContextAfterPlay.state === 'suspended') {
        console.log('⚠️  WARNING: AudioContext is suspended - this is the iOS audio problem!');
      }
    } else {
      test.skip('Play button not visible');
    }
  });

  test('Audio player and soundfont loading verification', async ({ page }) => {
    console.log('\n=== Audio Player & Soundfont Test ===\n');

    await expect(page.locator('.music-viewer')).toBeVisible({ timeout: 30000 });

    // Check audio player initialization
    const audioPlayerInfo = await page.evaluate(() => {
      return {
        audioPlayerExists: window.audioPlayer !== undefined,
        soundfontLoaded: window.audioPlayer?.soundfontLoaded,
        playerState: window.audioPlayer?.state,
        // Try to access OSMD audio player if available
        osmdAudioPlayer: typeof window.osmdAudioPlayer !== 'undefined',
      };
    });

    console.log('Audio Player info:', JSON.stringify(audioPlayerInfo, null, 2));

    // Click play and monitor network requests for soundfont
    const soundfontRequests = [];
    page.on('request', request => {
      const url = request.url();
      if (url.includes('.sf2') || url.includes('soundfont') || url.includes('.ogg') || url.includes('.mp3')) {
        soundfontRequests.push({
          url: url,
          method: request.method(),
        });
        console.log(`Soundfont request: ${url}`);
      }
    });

    page.on('response', async response => {
      const url = response.url();
      if (url.includes('.sf2') || url.includes('soundfont') || url.includes('.ogg') || url.includes('.mp3')) {
        console.log(`Soundfont response: ${url} - Status: ${response.status()}`);
      }
    });

    const playBtn = page.locator('button[aria-label="Play"]');
    if (await playBtn.isVisible({ timeout: 5000 })) {
      await playBtn.click();
      await page.waitForTimeout(3000);

      console.log(`Total soundfont requests captured: ${soundfontRequests.length}`);

      if (soundfontRequests.length === 0) {
        console.log('⚠️  WARNING: No soundfont requests detected - audio files may not be loading!');
      }
    }
  });

  test('Capture and analyze audio-related errors', async ({ page }) => {
    console.log('\n=== Audio Error Capture Test ===\n');

    const errors = [];
    const warnings = [];

    // Capture console errors and warnings
    page.on('console', msg => {
      const type = msg.type();
      const text = msg.text();

      if (type === 'error') {
        errors.push(text);
        console.log(`[ERROR] ${text}`);
      } else if (type === 'warning') {
        warnings.push(text);
        console.log(`[WARNING] ${text}`);
      }
    });

    await expect(page.locator('.music-viewer')).toBeVisible({ timeout: 30000 });

    const playBtn = page.locator('button[aria-label="Play"]');
    if (await playBtn.isVisible({ timeout: 5000 })) {
      await playBtn.click();
      await page.waitForTimeout(3000);

      // Check for specific audio-related debug messages
      const debugInfo = await page.evaluate(() => {
        // Try to access debug info if available
        const debugEl = document.querySelector('.debug-info');
        return debugEl ? debugEl.textContent : 'No debug info found';
      });

      console.log('Debug info from page:', debugInfo);

      console.log(`\nTotal errors captured: ${errors.length}`);
      console.log(`Total warnings captured: ${warnings.length}`);

      if (errors.length > 0) {
        console.log('\n=== ERRORS ===');
        errors.forEach((err, i) => console.log(`${i + 1}. ${err}`));
      }

      if (warnings.length > 0) {
        console.log('\n=== WARNINGS ===');
        warnings.forEach((warn, i) => console.log(`${i + 1}. ${warn}`));
      }
    }
  });

  test('iOS-specific audio unlock verification', async ({ page }) => {
    console.log('\n=== iOS Audio Unlock Verification ===\n');

    await expect(page.locator('.music-viewer')).toBeVisible({ timeout: 30000 });

    // Monitor the iOS unlock sequence
    const unlockSequence = [];

    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('iOS') || text.includes('unlock') || text.includes('silent') || text.includes('suspended')) {
        unlockSequence.push({
          timestamp: Date.now(),
          message: text,
        });
      }
    });

    const playBtn = page.locator('button[aria-label="Play"]');
    if (await playBtn.isVisible({ timeout: 5000 })) {
      console.log('Clicking play button to trigger iOS unlock sequence...');
      await playBtn.click();
      await page.waitForTimeout(3000);

      console.log('\n=== iOS Unlock Sequence ===');
      unlockSequence.forEach((entry, i) => {
        console.log(`${i + 1}. ${entry.message}`);
      });

      if (unlockSequence.length === 0) {
        console.log('⚠️  WARNING: No iOS unlock messages detected - the unlock code may not be executing!');
      }

      // Final AudioContext state check
      const finalState = await page.evaluate(() => {
        return {
          audioContextState: window.audioContext?.state,
          audioContextTime: window.audioContext?.currentTime,
          isPlaying: window.audioPlayer?.isPlaying || false,
        };
      });

      console.log('\nFinal state:', JSON.stringify(finalState, null, 2));

      if (finalState.audioContextState === 'running') {
        console.log('✓ SUCCESS: AudioContext is running!');
      } else {
        console.log(`✗ PROBLEM: AudioContext state is "${finalState.audioContextState}" (should be "running")`);
      }
    }
  });

  test('Mobile viewport simulation with audio test', async ({ page, isMobile }) => {
    console.log('\n=== Mobile Viewport Audio Test ===\n');
    console.log(`isMobile flag: ${isMobile}`);

    // Get viewport size
    const viewport = page.viewportSize();
    console.log(`Viewport: ${viewport?.width}x${viewport?.height}`);

    await expect(page.locator('.music-viewer')).toBeVisible({ timeout: 30000 });

    // Check if mobile-specific code is detected
    const mobileDetection = await page.evaluate(() => {
      return {
        isTouchDevice: 'ontouchstart' in window,
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        maxTouchPoints: navigator.maxTouchPoints,
      };
    });

    console.log('Mobile detection:', JSON.stringify(mobileDetection, null, 2));

    const playBtn = page.locator('button[aria-label="Play"]');
    if (await playBtn.isVisible({ timeout: 5000 })) {
      // Simulate touch event instead of click
      await playBtn.tap();
      await page.waitForTimeout(2000);

      const audioState = await page.evaluate(() => {
        return {
          audioContextState: window.audioContext?.state,
          audioContextExists: window.audioContext !== undefined,
        };
      });

      console.log('Audio state after tap:', JSON.stringify(audioState, null, 2));
    }
  });
});
