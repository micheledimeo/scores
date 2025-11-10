# 🎵 MusicXML Viewer - Deployment Instructions

## 📦 What's New in This Update

### ✨ Features
- **🔄 Loop Button**: Click to enable/disable automatic replay when the song ends
- **🎨 App Icons**: New Material Design music icon with dark/light mode support

### 📁 Files Updated
1. `js/musicxmlviewer-main.js` - Player with loop functionality
2. `css/main.css` - Styling for loop button
3. `img/app.png` - Dark icon (for light mode)
4. `img/app-dark.png` - Light icon (for dark mode)

---

## 🚀 Deployment Steps

### Step 1: Download App Icons

The icons are available in the Claude chat. Download these two files:

- [app.png](computer:///mnt/user-data/outputs/app.png) - Save to `/Users/Michele/Sites/musicxmlviewer/img/`
- [app-dark.png](computer:///mnt/user-data/outputs/app-dark.png) - Save to `/Users/Michele/Sites/musicxmlviewer/img/`

### Step 2: Run Deployment Script

Open Terminal and run:

```bash
cd /Users/Michele/Sites
./deploy-complete.sh
```

The script will:
1. ✅ Verify icons are in place
2. ✅ Verify compiled JS/CSS files
3. ⬆️ Upload JS to server
4. ⬆️ Upload CSS to server
5. ⬆️ Upload icons to server
6. 🔍 Verify deployment

---

## 🎯 Testing the Update

### 1. Clear Browser Cache
- **Chrome/Edge**: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
- **Safari**: `Cmd + Option + R`
- **Firefox**: `Cmd + Shift + R` (Mac) or `Ctrl + F5` (Windows)

### 2. Test Loop Button
1. Open Nextcloud in browser
2. Navigate to a MusicXML file
3. Open the file in MusicXML Viewer
4. Look for the new **🔄 Repeat** button next to Play/Pause/Stop
5. Click it to enable loop (button becomes highlighted)
6. Play a song and let it finish - it should restart automatically
7. Click loop button again to disable

### 3. Test Icons
1. Go to Nextcloud Apps page
2. Look for MusicXML Viewer in the app list
3. Switch between light and dark mode in Nextcloud settings
4. Verify the icon changes appropriately:
   - **Light mode**: Dark music notes icon
   - **Dark mode**: Light music notes icon

---

## 🎨 Icon Details

The icons use Material Design's "library_music" symbol:

- **app.png** (239 bytes)
  - Dark icon (#1C1C1C) on transparent background
  - Used in Nextcloud light mode
  
- **app-dark.png** (496 bytes)
  - Light icon (#E3E3E3) on transparent background
  - Used in Nextcloud dark mode

Both icons are 24x24px PNG format, optimized for Nextcloud's UI.

---

## 🔧 Troubleshooting

### Icons not showing?
- Clear browser cache completely
- Check file permissions on server: `chmod 644 img/app*.png`
- Verify files are in `/apps/musicxmlviewer/img/` on server

### Loop button not working?
- Check browser console for JavaScript errors
- Verify `musicxmlviewer-main.js` was uploaded correctly
- Compare file size: should be ~2.35 MB

### CSS styling issues?
- Verify `main.css` was uploaded
- Check file size: should be ~265 KB
- Force refresh with `Cmd+Shift+R`

---

## 📞 Support

If you encounter any issues:
1. Check browser console for errors (F12 → Console tab)
2. Verify all files were uploaded successfully
3. Contact Claude with error details

---

## ✅ Deployment Checklist

- [ ] Icons downloaded and placed in `/Users/Michele/Sites/musicxmlviewer/img/`
- [ ] Deployment script executed successfully
- [ ] Browser cache cleared
- [ ] Loop button visible in player
- [ ] Loop functionality tested and working
- [ ] Icons visible in Nextcloud apps page
- [ ] Icons change correctly with light/dark mode

---

**Last Updated**: October 20, 2025
**Version**: 2.0.1 (Loop Button + Custom Icons)
