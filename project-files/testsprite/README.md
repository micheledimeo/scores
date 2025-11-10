# Scores App - Test Suite

Playwright-based test suite for the Scores Nextcloud app.

## Setup

1. Install dependencies:
```bash
cd /Users/Michele/Sites/mxmlscores/project-files/testsprite
npm install
npx playwright install
```

**Note**: This test workspace is located at `/Users/Michele/Sites/mxmlscores/project-files/testsprite`

## Running Tests

### Online Tests (Production Server)

Test the deployed app on https://cloud.ottoniascoppio.org

1. Create `.env` file with your Nextcloud credentials:
```bash
cp .env.example .env
# Edit .env and add your credentials
```

2. Run online tests:
```bash
npm run test:online
```

### Local Tests (Development)

**Note**: Local tests require a full Nextcloud environment and are currently not supported.

For local development testing, use the online test mode with `?testSample=1` parameter.

### Run with UI mode (interactive)
```bash
npm run test:ui
```

### Run in headed mode (see browser)
```bash
npm run test:headed
```

### Debug mode
```bash
npm run test:debug
```

### Run specific test file
```bash
# Run only sidebar and mixer tests
npx playwright test sidebar-and-mixer

# Run only basic app tests
npx playwright test app.spec
```

## Test Structure

- `tests/app.spec.ts` - Main application tests
  - Basic UI tests (homepage, welcome screen)
  - Test sample mode (`?testSample=1`)
  - Playback controls verification
  - Navigation sidebar tests

- `tests/sidebar-and-mixer.spec.ts` - Advanced functionality tests
  - Sidebar toggle and layout responsiveness
  - Playback controls repositioning
  - OSMD re-rendering on sidebar toggle
  - Mixer visibility toggle
  - Channel state cycling (NORMAL → SOLO → MUTE → NORMAL)
  - Mixer + sidebar integration

## DEV Mode - Test Sample

The app supports a DEV-ONLY mode for testing:

- Navigate to `/?testSample=1` to automatically load `/test-scores/sample.musicxml`
- This bypasses the need for file selection and loads a test score immediately
- Console will show `[DEV]` prefixed messages
- **Important**: Remove or disable this feature before production deployment

## CI/CD Integration

The test suite is designed to run in CI environments:

- Set `CI=true` environment variable for CI mode
- In CI mode: retries are enabled, parallel execution is limited
- Reports are generated in HTML format

## Writing New Tests

1. Create new `.spec.ts` files in the `tests/` directory
2. Import test utilities: `import { test, expect } from '@playwright/test'`
3. Group related tests with `test.describe()`
4. Use `test.beforeEach()` for common setup
5. Refer to [Playwright docs](https://playwright.dev) for assertions and APIs

## Troubleshooting

- **Tests timeout**: Increase timeout in selectors: `{ timeout: 15000 }`
- **Dev server not starting**: Ensure main app is not already running on port 5173
- **Browser not found**: Run `npx playwright install`
