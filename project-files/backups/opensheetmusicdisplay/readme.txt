=== OpenSheetMusicDisplay ===
Contributors:      opensheetmusicdisplay, fredmeister77
Donate link:       https://OSMD.org/Donate
Tags:              opensheetmusicdisplay,osmd,music,sheet music,musicxml
Requires at least: 5.6.0
Tested up to:      6.8.1
Stable tag:        1.4.1
Requires PHP:      7.0.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Block or shortcode to render MusicXML in the browser as sheet music using OSMD.

== Description ==

This plugin provides two blocks for MusicXML usages:

1. The 'OSMD Sheet Music' block brings [OpenSheetMusicDisplay](https://github.com/opensheetmusicdisplay/opensheetmusicdisplay) seamlessly to your Wordpress site!
This will allow you to render responsive MusicXML live in your visitors' browser.

It enables uploading of .xml, .musicxml and .mxl files to your Wordpress Media Library, which can then be selected in the block for rendering.

(We have also added a shortcode in this plugin for those who do not use the Gutenberg editor.)

2. Additionally, as of 1.3.0 we have added another block: 'OSMD QR Code'. This block allows you to deeplink your musicXML directly into our PracticeBird app via QR code, mobile icon, or both!

## OSMD Sheet Music Block Options
The block has a number of options in the sidebar (Inspector Controls) described here.

### Rendering
The section immediately below the block heading contains two controls related to re-rendering the sheet music.

#### Automatically Rerender on Change
*Toggle, Default: Off*
When this is on, any change to the lower settings (except for 'Container Aspect Ratio') will trigger a re-render of the sheet music in the editor.

This is not recommended for larger pieces of sheet music, as rendering can take time.
It is best to do 'batch' updates with the settings and use the 'Rerender' button to manually preview the changes.

#### Rerender
*Button*
This button is used to trigger a manual rerender of the sheet music in the currently selected OSMD block.
This is particularly useful for updating the settings of larger pieces of sheet music that take longer to render.

### Basic Options
This section contains basic options for the block: the musicXML file to render as well as some display options.

#### Select Media
*Button/File Select, Default: None Selected*
This control shows the currently selected score above it (if there is one).
The button 'Select Media' opens your Wordpress Media Library in a modal window, which allows you to select previously uploaded MusicXML, or to upload one to select for rendering in the block.

**NOTE:** Selecting a new file will always trigger a render of the new file, no matter if "Automatically Rerender on Change" is selected or not.

#### Width (%)
*Number Input, Default: 100*
This control translates directly to the CSS width of the sheet music.
What this means is that it controls the percentage of the *parent container* that the sheet music will take up.
e.g.
- If you have the OSMD block in a post set to 100%, it will fill the entire width of the post
- If you have the OSMD block in a column layout of a post set to 100%, it will fill the entire width of that column

#### Container Aspect Ratio
*Dropdown/Number Input, Default: Auto (No Scrollbar)*
This dropdown sets the aspect ratio of the sheet music container - The height in relation to the width.
What this does pratically is add a scrollbar, which is useful with very long pieces that you don't want to extend all the way down the page.
- Auto (No Scrollbar) will render the full sheet music as-is, taking up as much room as needed.
- Landscape makes the height 0.667x the width. Or, put another way, the width will be 1.5x the height (3:2)
- Portrait sets the height to 1.778x the width. Width being 0.5625x the height (9:16)
- Custom allows you to set your own value of what the width will be divided by to get the height.

**NOTE:** This control does not trigger or require a re-render since it is merely a CSS property of the sheet music container. It will be reflected immediately.

#### Zoom (%)
*Number Input, Default: 100*
This input allows you to control the zoom level of the rendered sheet music.

### Drawing Options
These are additional OSMD drawing options - Whether to render certain parts of the sheet music.

#### Draw Title
*Toggle, Default: On*
Whether to render the sheet music title.

**NOTE:** Draw Subtitle must be off for this to be reflected in the sheet music (currently).

#### Draw Subtitle
*Toggle, Default: On*
Whether to render the sheet music subtitle.

#### Draw Composer
*Toggle, Default: On*
Whether to render the sheet music composer.

**NOTE:** There seem to be some rendering issues in OSMD with this option if 'Draw Lyricist' is not off as well. We are working on this.

#### Draw Lyricist
*Toggle, Default: On*
Whether to render the sheet music Lyricist.

#### Draw Metronome Marks
*Toggle, Default: On*
Whether to render the tempo markings.

#### Draw Part Names
*Toggle, Default: On*
Whether to render the part names before each stave.

#### Draw Part Abbreviations
*Toggle, Default: On*
Whether to render the part abbreviations on subsequent music systems.

#### Draw Measure Numbers
*Toggle, Default: On*
Whether to render measure numbers

#### Draw Measure Numbers Only at System Start
*Toggle, Default: Off*
Whether to render measure numbers just at the start of new music systems.

#### Draw Time Signatures
*Toggle, Default: On*
Whether to render time signatures on the staves

#### New Systems From XML
*Toggle, Default: Off*
This determines whether system breaks specified in the MusicXML will be honored.

## OpenSheetMusicDisplay Shortcode Options

The shortcode has the same options as above, though as attributes written in camelCase.

In the shortcode any Toggle attribute values are specified with true or false.
Numeric values can be specified as float or integers.

To specify the musicXML you need to provide a URL; This can be copied from your Media center in Wordpress when viewing the details of a file.

The shortcode is "opensheetmusicdisplay". Example given with full set of attributes:
```
[opensheetmusicdisplay musicXmlUrl="http://url.com/wp-content/uploads/sites/2/2021/02/Beethoven_AnDieFerneGeliebte.xml" zoom="0.75" width="75" 
    drawTitle="false" drawSubtitle="false" drawComposer="true" drawLyricist="true" drawMetronomeMarks="false" drawPartNames="false" drawPartAbbreviations="false"
    drawMeasureNumbers="true" drawMeasureNumbersOnlyAtSystemStart="true" drawTimeSignatures="true"]
```

It's important to note that zoom is out of 1: so 1 = 100%, 0.75 = 75%, 2 = 200%, etc.


## OSMD QR Code Block Options
This block also has a number of options in the sidebar (Inspector Controls) described here (as well as via info menus available in the sidebar).

### Basic Options
This section contains basic options for the block: the musicXML file to deep link as well as how to render the deeplink.

#### Select Media
*Button/File Select, Default: None Selected*
This control shows the currently selected score above it (if there is one).
The button 'Select Media' opens your Wordpress Media Library in a modal window, which allows you to select previously uploaded MusicXML, or to upload one for deep linking.

#### Render Behavior
*Radio Button, Default: Responsive - QR and Icon*
These are full descriptions of what each option does:
Responsive - QR and Icon: Both a QR code and icon for mobile devices will be generated. Which one is displayed will depend on the device screen size: greater than 991px for QR code, less than 992px for linked icon.
QR Code Only: Only a QR code will be generated and displayed regardless of device size or type.
Icon Only: Only a icon w/ a link will be generated and displayed regardless of device size or type.
Smart Detect - QR or Icon: The device will attempt to be detected. If iOS or Android is detected, a mobile icon will be generated. For all other platforms, a QR code will be generated.

### QR Code Options

#### Scale
*Slider, Default: 1*
This is the scale of the QR code and changes it's rendered size. (the Default scale of 1 is 256px x 256px)

#### Icon Options

### Auto-redirect to App Store
*Toggle Button, Default: On*
On: If the mobile deep-link icon is displayed and the deep-link fails on click, an attempt will be made to detect the mobile platform and redirect to the proper PracticeBird app store link (Android or iOS).
Off: No attempt to redirect will be made, and if the deeplink fails, it will fail silently with the page not reacting.

Additionally, the icon can be resized via the block editor when it is rendered. If you select "Icon Only" while rendering, you will see resize toggles available on the corners of the icon.


## OSMD QR Code Shortcode Options

The shortcode has the same options as above, though in some cases are named differently.

- the musicXML url is defined by the 'target' attribute.
- The icon size is defined (in px) by the 'iconSize' attribute.
- The QR scale is defined by the 'qrScale' attribute.
- the 'generateBehavior' attribute is a string with the following possible values, which correspond to the values mentioned above:
    - QR_AND_MOBILE
    - QR_ONLY
    - MOBILE_ONLY
    - DETECT

In the shortcode any toggle or Toggle attribute values are specified with true or false.
Numeric values can be specified as float or integers.

To specify the musicXML you need to provide a URL; This can be copied from your Media center in Wordpress when viewing the details of a file.

The shortcode is "pb-deep-link". Example given with full set of attributes:
```
[pb-deep-link target="https://staging.opensheetmusicdisplay.org/wp-content/uploads/sites/2/2021/09/thescale.musicxml" generateBehavior="QR_AND_MOBILE" iconSize="50", qrScale="1.5", autoRedirectAppStore="false"]
```

== About Us ==

We have developed the open-source [OpenSheetMusicDisplay](https://opensheetmusicdisplay.org/): A library for rendering MusicXML in the browser using Vexflow.
We created this plugin to make it as easy as possible for Wordpress users to use our library to render sheet music on their site.
We hope you find this plugin useful, and if so, please consider sponsoring us or donating at our link above.
Thank you!

== Installation ==

1. Install the plugin via the Wordpress Plugin installer. 
    1. In the Wordpress admin sidebar, navigate to Plugins -> Add New.
    2. *Wordpress Automatic Installation*
        1. Search for its listing near the top of this page: "OpenSheetMusicDisplay".
        2. Review the plugin information, reviews, details, etc.
        3. Click "Install Now" and Wordpress will automatically install it.
    2. **or** *Manual Upload*
        1. At the very top towards the left, select the "Upload Plugin" button. 
        2. Select the zip file for this plugin.
        3. Click "Install Now"
2. Activate the Plugin
    1. In the Wordpress admin sidebar, navigate to Plugins -> Installed Plugins
    2. Locate the "OpenSheetMusicDisplay" plugin in this list
    3. Select "Activate" beneath it

This plugin should also be available via the Gutenberg Block directory:
1. Navigate to a post where you want to add sheet music.
2. Click the "+" icon to add a new block
3. Select "Browse all" at the bottom of the block selection pop-up
4. in the search bar at the top of the side panel, type "musicxml"
5. Click "Add Block" on the "OpenSheetMusicDisplay" result

**NOTE:** If updating to version 1.0.0 from previous versions, you will need to "Attempt Recovery" on anywhere the block has been included.
We have switched to server-side rendering, and this should now not happen with future updates.

== Frequently Asked Questions ==

= Where can I receive support for this block? =

Please contact us at support@opensheetmusicdisplay.org

= Is feature x, y, or z available? Will it be available? =

We now have a premium add-on to our plugin available here: https://opensheetmusicdisplay.org/wp-plugin/pricing/
If you'd like:
-Audio Player
-Transposition
-Performance Mode Rendering
-Brand coloring (for playback buttons)
-Premium Support

Please consider subscribing!

== Screenshots ==

1. This is a two-column post example with the OSMD block in the second column with zoom level set. Shows Basic options to the right.
2. This shows the previous post on the public-facing side.
3. This shows the media selector where you can choose MusicXML.
4. This shows another post with various options set (75% width, no draw title, Portrait aspect ratio)

== Changelog ==

= 1.4.1 =
* Contains user input sanitization on render to prevent XSS attacks from authenticated users (Contributor and above)
* Update to Latest PracticeBird Deep linking Library
* Update to the latest OSMD version: 1.9.0. 
See changelog for all updates: 
https://github.com/opensheetmusicdisplay/opensheetmusicdisplay/blob/develop/CHANGELOG.md

= 1.4.0 =
* Encode attributes via hex for HTML
* UI Tweaks (add spacing)
* Bugfixes for PHP deprecation ($ string templating syntax)
* isset check for PHP server variable warnings (https://wordpress.org/support/topic/php-warning-476/#post-17445960)
* Update to the latest OSMD version: 1.8.5. 
See changelog for all updates: 
https://github.com/opensheetmusicdisplay/opensheetmusicdisplay/blob/develop/CHANGELOG.md

= 1.3.9 =
* Update some deprecated Wordpress lib calls
* Test with 6.4

= 1.3.8 =
* Update to the latest OSMD version: 1.8.4. 
See changelog for all updates: 
https://github.com/opensheetmusicdisplay/opensheetmusicdisplay/blob/develop/CHANGELOG.md

= 1.3.7 =
* Update to the latest OSMD version: 1.8.3. 
See changelog for all updates: 
https://github.com/opensheetmusicdisplay/opensheetmusicdisplay/blob/develop/CHANGELOG.md


= 1.3.6 =
* Update to the latest OSMD version: 1.8.0. 
See changelog for all updates: 
https://github.com/opensheetmusicdisplay/opensheetmusicdisplay/blob/develop/CHANGELOG.md

= 1.3.5 =
* Minor CSS bugfix with unintended elements being hidden
-We use a small responsive shim CSS sheet to imitate some basic bootstrap classes (hiding, display, size hiding, etc.)
-Other plugins (e.g. WooCommerce) use the hidden classes and don't remove them from elements when they are intended to be displayed
-This caused those elements to be hidden from the user when both plugins are Activate
-Removed the !important flag from these classes to accept the element level styling to take effect

= 1.3.4 =
* Updated to latest OSMD Version (1.7.5, from 1.7.1) See changelog for all updates: https://github.com/opensheetmusicdisplay/opensheetmusicdisplay/blob/develop/CHANGELOG.md
* Tested with WP 6.2

= 1.3.3 =
* Updated to latest OSMD Version (1.7.1, from 1.4.3) See changelog for all updates: https://github.com/opensheetmusicdisplay/opensheetmusicdisplay/blob/develop/CHANGELOG.md
* Tested with WP 6.1.1

= 1.3.2 =
* Bugfix for rewrite rules:
On certain WP instances (specific mix of plugins/configuration) flushing the rewrite rules caused issues tied to specific permalink structures.
No longer flush the rewrite rules to resolve this issue.

= 1.3.1 =
* Minor bugfix with attribute filtering (would not work correctly with certain Wordpress hosts)

= 1.3.0 =
*Fixes for Default Settings:
Default settings changes will no longer overwrite existing blocks. This was due to how Wordpress handles default block attributes.
*Add PracticeBird Deeplink block
Now an additional block is included to deep-link music sheets into our free PracticeBird app for practice!
*Updated to latest OSMD version:
-More performant rendering! 30-60% faster rendering times!
-Misc. bugfixes

= 1.2.0 =
*Add Default Settings Page:
Now an OSMD settings page will appear in the admin menu. These are to specify default settings that will apply to all new OSMD blocks as well as blocks that have not had their settings values updated from the default.

= 1.1.8 =
*Add resize threshold calculation to prevent OSMD from continuously re-rendering (on front-end).
This would occur in rare instances based on a sites' CSS combined with specific user screen sizes.

= 1.1.7 =
*Updated to latest OSMD Version (1.4.3)

= 1.1.6 =
* Updated to the latest OSMD version (1.2.+)
* Process options filters before render on the front-end (already occurred for the admin facing block)

= 1.1.5 =
** A notice will appear once for each editing user in the admin section for this - After this update the Gutenberg block will no longer re-render automatically on resize. **
* Remove rerender on resize from editor completely. The block will no longer automatically rerender on resize. This is because opening other panes in the editor would trigger a resize, making it very annoying to work with.
* Update rerender button to always be available. Since automatic resizing is disabled, you can now re-render anytime you choose with the rerender button.
* Add support for additional CSS classes: Will now allow other plugins/the user to add CSS classes to the block.

= 1.1.4 =
* Add resize threshold - Fixes some of the issue with re-rendering too often.

= 1.1.3 =
* Add line break option - Use XML line breaks

= 1.1.2 =
* Fix for plugin framework

= 1.1.1 =
* Bugfix for Vexflow incompatibility with PrototypeJS (Made plugin incomaptible with jTab plugin)

= 1.1.0 =
* Update to OSMD release 1.0.0. All changes here: https://github.com/opensheetmusicdisplay/opensheetmusicdisplay/discussions/1021
* Added shortcode functionality
* Bugfixes for quote syntax issues

= 1.0.1 =
**Minor updates for plugin extensions**
* Allow more than one queueable attribute at a time
* Add additional filter hooks
* Fixes for resize on block editor

= 1.0.0 =
**Updates to this version may require all OSMD blocks to be 'Attempt Recovery'.  This will not cause any issues and it is fine to recover the blocks.**
* Refactor code to include WP filters
    * Allows plugin extensions easily
* Switch to dynamic server-side rendering
    * When new attributes are added in updates/plugins, won't flag the block as invalid
* Do no include scripts on other admin pages
    * Now checks page before including OSMD Javascript to prevent conflicts on other admin pages
* Fix bug for width not changing with certain themes

= 0.9.4 =
* Update to latest OSMD version
* Fixes for user-facing loading spinner
    * Will no longer take up whole Screen, just sheet music area
* Fixes for re-render trigger
    * Will only re-render when width of sheet music container is actually updated (fixes Chrome mobile issue on scroll)
* Attempts to reload sheet music 5 times before showing user error

= 0.9.2 =
* Initial Release