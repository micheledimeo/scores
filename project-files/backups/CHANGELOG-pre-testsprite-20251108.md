# MusicXML Scores - Pre-TestSprite Version Changelog
## Version: Pre-TestSprite (2025-11-08)

### Backup Information
- **Backup File**: `mxmlscores-pre-testsprite-20251108-100948.tar.gz`
- **Backup Date**: November 8, 2025 - 10:09 AM
- **Backup Size**: 1.5 MB
- **Backup Location**: `/Users/Michele/Sites/backups/`

### Major Features Implemented

#### 1. Smart File Name Display
- **Left Truncation**: Files in folders truncate from the left to show instrument names
  - Maximum display length: 36 characters + "..." prefix
  - Example: `...pappa col pomodoro - ea-2 (Clarinet in B)`
  - Ensures instrument information is always visible
- **File Extension Removal**: Automatic removal of `.mxml`, `.xml`, `.musicxml`, `.mxl`, `.mei`, `.gp*` extensions
- **CSS Optimization**:
  - `text-overflow: clip` to prevent CSS ellipsis
  - `overflow: visible` on span elements
  - `max-width: none` to allow full width usage

#### 2. Folder Navigation System
- **Expandable Folders**: Click to expand/collapse folder contents
- **File Count Badges**: Each folder displays number of contained files
- **Folder Icons**: Material Design folder icon from `@mdi/svg`
- **State Management**: Vue 3 reactive Set for tracking expanded folders
- **Event Handling**: Proper `@update:open` event binding for NcAppNavigationItem

#### 3. Search Enhancements
- **Match Counter**: Real-time display of total matching files
- **Dual Filtering**: Search applies to both folder names and file names
- **Visual Feedback**: Counter shows in search box overlay

#### 4. Settings & Internationalization
- **Translation System**: Full i18n support using Nextcloud's `@nextcloud/l10n`
- **Translatable Strings**:
  - "Scores Folders" → `t('mxmlscores', 'Scores Folders')`
  - All UI strings properly wrapped with translation function
- **Multiple Folder Paths**: Admin can configure multiple scores directories
- **Folder Browser**: Interactive folder navigation modal

#### 5. Icon & Spacing Improvements
- **App Icon**: Changed to `library_music` Material Design icon
- **Icon Hiding**: File icons hidden in folder view to maximize name space
- **Root File Padding**: 5px left padding for root-level files
- **Icon Spacing**: Proper spacing around folder icons

### Technical Changes

#### Vue Components
- **App.vue**:
  - Added `expandedFolders` reactive Set
  - Implemented `toggleFolder()` with proper reactivity trigger
  - Added `formatFileNameForDisplay()` with left truncation logic (maxLength: 36)
  - Fixed folder expansion event handling with `@update:open`
  - Added translation support with `useTranslation()`

#### CSS Improvements
- **File Display CSS** (lines 886-902):
  ```css
  :deep(.file-in-folder .app-navigation-entry__name) {
    flex: 1 1 auto !important;
    width: 100% !important;
    max-width: none !important;
    overflow: visible !important;
    text-overflow: clip !important;
  }
  ```
- **Icon Hiding** (lines 866-884):
  - All file icons set to `display: none`, `width: 0`
- **Root File Padding** (lines 2009-2017):
  - 5px left padding for root-level files

#### Build & Deployment
- **Deploy Script**: `deploy-production.sh` includes img/ folder deployment
- **App Icon**: Updated `/img/app.svg` with library_music icon
- **Build Process**: Vite configuration unchanged, working correctly

### Bug Fixes
1. **Folder Expansion**: Fixed Vue 3 reactivity issue with Set by adding `expandedFolders.value = new Set(expandedFolders.value)`
2. **CSS Specificity**: Added `!important` flags to override Nextcloud defaults
3. **Text Truncation**: Removed CSS ellipsis in favor of JavaScript truncation
4. **Event Binding**: Changed from `@click` to `@update:open` for proper folder toggle

### Known Limitations
- **Fixed Width**: Sidebar width is 300px, file display area is ~284px
- **Character Limit**: Files longer than 36 characters will be truncated from left
- **Font Dependency**: Truncation length (36 chars) assumes default Nextcloud font size

### Files Modified
1. `/src/components/App.vue` - Main app component with navigation
2. `/img/app.svg` - App icon (library_music)
3. `/deploy-production.sh` - Deployment script
4. `/README.md` - Documentation update

### Configuration
- **maxLength**: 36 characters (line 540 in App.vue)
- **Folder Width**: 300px sidebar, 284px available for file names
- **Root File Padding**: 5px left
- **Icon Space**: 0px (hidden)

### Next Steps (TestSprite Integration)
This version is stable and ready for TestSprite integration. The backup serves as a rollback point before implementing automated testing.

### Deployment Information
- **Production URL**: https://cloud.ottoniascoppio.org/index.php/apps/mxmlscores
- **Test Mode**: https://cloud.ottoniascoppio.org/index.php/apps/mxmlscores/?testSample=1
- **Last Deployed**: November 8, 2025
- **Build Tool**: Vite 5.4.20
- **Vue Version**: 3.x (Composition API)
- **Nextcloud Version**: 28+

### Dependencies
- `@nextcloud/vue`: Nextcloud Vue components
- `@nextcloud/l10n`: Translation system
- `@mdi/svg`: Material Design Icons
- `opensheetmusicdisplay`: Music notation rendering
- `vue`: 3.x
- `vite`: 5.4.20

---
**Backup Created By**: Claude Code Assistant
**Session Date**: November 8, 2025
**Status**: ✅ Stable - Ready for TestSprite Integration
