<?php
/**
 * Plugin Name:     OpenSheetMusicDisplay
 * Description:     Block (and shortcode) to render MusicXML in the browser as sheet music using OSMD. Additionally provides a block to deeplink musicXML into the PracticeBird app.
 * Version:         1.4.1
 * Author:          opensheetmusicdisplay.org
 * Author URI:		https://opensheetmusicdisplay.org
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     opensheetmusicdisplay
 *
 * @package         phonicscore
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block_editor/tutorials/block_tutorial/applying_styles_with_stylesheets/
 */
if ( ! defined( 'ABSPATH' ) ) exit;


//These are the default values on the user settings page. NOT what the user has set, but the initial values for these attributes.
//What the user has set is defined in phonicscore_opensheetmusicdisplay_user_set_defaults
function phonicescore_opensheetmusicdisplay_settings_page_defaults(){
	$default_values = array(
		'drawTitle' => 'drawTitle',
		'drawSubtitle' => 'drawSubtitle',
		'drawComposer' => 'drawComposer',
		'drawLyricist' => 'drawLyricist',
		'drawMetronomeMarks' => 'drawMetronomeMarks',
		'drawPartNames' => 'drawPartNames',
		'drawPartAbbreviations' => 'drawPartAbbreviations',
		'drawMeasureNumbers' => 'drawMeasureNumbers',
		'drawMeasureNumbersOnlyAtSystemStart' => false,
		'drawTimeSignatures' => 'drawTimeSignatures',
		'newSystemFromXML' => false,
		'zoom' => 1.0
	);
	$default_values = apply_filters('phonicscore/opensheetmusicdisplay/settings-default-values', $default_values);
	return $default_values;
}
define("phonicscore_opensheetmusicdisplay_settings_page_defaults", phonicescore_opensheetmusicdisplay_settings_page_defaults());

include_once 'opensheetmusicdisplay-settings.php';

define("phonicscore_opensheetmusicdisplay_base_attributes", phonicscore_opensheetmusicdisplay_get_attributes_list());
define("phonicscore_opensheetmusicdisplay_user_set_defaults", phonicscore_opensheetmusicdisplay_get_user_set_defaults());
define("phonicscore_opensheetmusicdisplay_processed_defaults", phonicscore_opensheetmusicdisplay_get_processed_defaults());
if(!defined('SERVER_SCHEME')){
	define('SERVER_SCHEME', (isset($_SERVER['HTTPS']) ? "https" : "http"));
}
if(!defined('SERVER_HOST') && isset($_SERVER['HTTP_HOST'])){
	define('SERVER_HOST', sanitize_text_field($_SERVER['HTTP_HOST']));

}
if(!defined('SERVER_REQUEST_URI') && isset($_SERVER['REQUEST_URI'])){
	define('SERVER_REQUEST_URI', sanitize_text_field($_SERVER['REQUEST_URI']));
}

function phonicscore_opensheetmusicdisplay_generate_admin_client_attributes(){
	$jsonBaseDefaults = wp_json_encode(phonicscore_opensheetmusicdisplay_base_attributes, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
	$jsonUserDefaults = wp_json_encode(phonicscore_opensheetmusicdisplay_user_set_defaults, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
	return <<<EOT
	(function(){
		const baseDefaults = {$jsonBaseDefaults};
		const userDefaults = {$jsonUserDefaults};
		function registerAttributes(settings, name){
			if( name === 'phonicscore/opensheetmusicdisplay'){
				settings.attributes = {...settings.attributes, ...baseDefaults};
			}
			return settings;
		}

		function getUserDefaults(attributes){
			if(!attributes){
				attributes = {};
			}
			attributes = {...attributes, ...userDefaults};
			return attributes;
		}

		if(typeof wp !== 'undefined'){
			if(typeof baseDefaults === 'object'){
				wp.hooks.addFilter(
					'blocks.registerBlockType',
					'phonicscore/opensheetmusicdisplay/block-type-hook',
					registerAttributes
				);
			}
			if(typeof userDefaults === 'object'){
				wp.hooks.addFilter(
					'phonicscore_opensheetmusicdisplay_attributes-user-defaults',
					'phonicscore/opensheetmusicdisplay/get-user-defaults',
					getUserDefaults
				);
			}
		}
	})();
	EOT;
}


function phonicscore_opensheetmusicdisplay_block_init() {
	$dir = __DIR__;

	$script_asset_path = "$dir/build/osmd_block.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "phonicscore/opensheetmusicdisplay" block first.'
		);
	}
	$index_js     = 'build/osmd_block.js';
	$script_asset = require( $script_asset_path );
	//Use default dependencies, add OSMD as one
	if(array_key_exists('dependencies', $script_asset) && is_array($script_asset['dependencies'])){
		$script_asset['dependencies'][] = 'phonicscore_opensheetmusicdisplay_opensheetmusicdisplay_block_exports';
		$script_asset['dependencies'][] = 'phonicscore_opensheetmusicdisplay_opensheetmusicdisplay_dist';
		$script_asset['dependencies'][] = 'fredmeister77_queueable_attributes_dist';
	}
	wp_register_script(
		'phonicscore_opensheetmusicdisplay_block_editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'phonicscore_opensheetmusicdisplay_block_editor', 'phonicscore_opensheetmusicdisplay' );

	$editor_css = 'build/styles/osmd_block.css';
	wp_register_style(
		'phonicscore_opensheetmusicdisplay_block_editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/styles/style-osmd_block.css';
	wp_register_style(
		'phonicscore_opensheetmusicdisplay_block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type(
		'phonicscore/opensheetmusicdisplay',
		array(
			'editor_script' => 'phonicscore_opensheetmusicdisplay_block_editor',
			'editor_style'  => 'phonicscore_opensheetmusicdisplay_block_editor',
			'style'         => 'phonicscore_opensheetmusicdisplay_block',
			'render_callback' => 'phonicscore_opensheetmusicdisplay_render_callback',
			'attributes' => phonicscore_opensheetmusicdisplay_base_attributes
		)
	);
}

function phonicscore_opensheetmusicdisplay_get_attributes_list() {
	$attributes = array(
		'alignRests' => array(
			'type' => 'number',
			'default' => 0
		),
		'autoBeam' => array(
			'type' => 'boolean',
			'default' => false
		),
		'autoBeamOptions' => array(
			'type' => 'object',
			'default' => array(
				'beam_middle_rests_only' => false,
				'beam_rests' => false,
				'maintain_stem_directions' => false
			)
		),
		'autoResize' => array(
			'type' => 'boolean',
			'default' => true
		),
		'backend' => array(
			'type' => 'string',
			'default' => 'svg'
		),
		'coloringMode' => array(
			'type' => 'number',
			'default' => null
		),
		'coloringSetCustom' => array(
			'type' => 'array',
			'default' => null
		),
		'coloringEnabled' => array(
			'type' => 'boolean',
			'default' => true
		),
		'colorStemsLikeNoteheads' => array(
			'type' => 'boolean',
			'default' => false
		),
		'defaultColorNotehead' => array(
			'type' => 'string',
			'default' => null
		),
		'defaultColorStem' => array(
			'type' => 'string',
			'default' => null
		),
		'defaultColorRest' => array(
			'type' => 'string',
			'default' => null
		),
		'defaultColorLabel' => array(
			'type' => 'string',
			'default' => null
		),
		'defaultColorTitle' => array(
			'type' => 'string',
			'default' => null
		),
		'defaultFontFamily' => array(
			'type' => 'string',
			'default' => null
		),
		'defaultFontStyle' => array(
			'type' => 'number',
			'default' => 0
		),
		'disableCursor' => array(
			'type' => 'boolean',
			'default' => true
		),
		'followCursor' => array(
			'type' => 'boolean',
			'default' => false
		),
		'drawingParameters' => array(
			'type' => 'string',
			'default' => null
		),
		'drawCredits' => array(
			'type' => 'boolean',
			'default' => true
		),
		'drawTitle' => array(
			'type' => 'boolean',
			'default' => true
		),
		'drawSubtitle' => array(
			'type' => 'boolean',
			'default' => true
		),
		'drawComposer' => array(
			'type' => 'boolean',
			'default' => true
		),
		'drawLyricist' => array(
			'type' => 'boolean',
			'default' => true
		),
		'drawMetronomeMarks' => array(
			'type' => 'boolean',
			'default' => true
		),
		'drawPartNames' => array(
			'type' => 'boolean',
			'default' => true
		),
		'drawPartAbbreviations' => array(
			'type' => 'boolean',
			'default' => true
		),
		'drawMeasureNumbers' => array(
			'type' => 'boolean',
			'default' => true
		),
		'drawMeasureNumbersOnlyAtSystemStart' => array(
			'type' => 'boolean',
			'default' => false
		),
		'drawTimeSignatures' => array(
			'type' => 'boolean',
			'default' => true
		),
		'measureNumberInterval' => array(
			'type' => 'number',
			'default' => 2
		),
		'useXMLMeasureNumbers' => array(
			'type' => 'boolean',
			'default' => true
		),
		'drawFingerings' => array(
			'type' => 'boolean',
			'default' => true
		),
		'fingeringPosition' => array(
			'type' => 'string',
			'default' => null
		),
		'fingeringInsideStafflines' => array(
			'type' => 'boolean',
			'default' => false
		),
		'drawLyrics' => array(
			'type' => 'boolean',
			'default' => true
		),
		'drawSlurs' => array(
			'type' => 'boolean',
			'default' => true
		),
		'drawUpToMeasureNumber' => array(
			'type' => 'number',
			'default' => null
		),
		'drawUpToSystemNumber' => array(
			'type' => 'number',
			'default' => null
		),
		'drawUpToPageNumber' => array(
			'type' => 'number',
			'default' => null
		),
		'drawFromMeasureNumber' => array(
			'type' => 'number',
			'default' => null
		),
		'fillEmptyMeasuresWithWholeRest' => array(
			'type' => 'number',
			'default' => 0
		),
		'setWantedStemDirectionByXml' => array(
			'type' => 'boolean',
			'default' => true
		),
		'tupletsRatioed' => array(
			'type' => 'boolean',
			'default' => false
		),
		'tupletsBracketed' => array(
			'type' => 'boolean',
			'default' => false
		),
		'tripletsBracketed' => array(
			'type' => 'boolean',
			'default' => false
		),
		'pageFormat' => array(
			'type' => 'string',
			'default' => null
		),
		'pageBackgroundColor' => array(
			'type' => 'string',
			'default' => null
		),
		'renderSingleHorizontalStaffline' => array(
			'type' => 'boolean',
			'default' => false
		),
		'newSystemFromXML' => array(
			'type' => 'boolean',
			'default' => false
		),
		'newPageFromXML' => array(
			'type' => 'boolean',
			'default' => false
		),
		'percussionOneLineCutoff' => array(
			'type' => 'number',
			'default' => 4
		),
		'percussionForceVoicesOneLineCutoff' => array(
			'type' => 'number',
			'default' => 3
		),
		'spacingFactorSoftmax' => array(
			'type' => 'number',
			'default' => 5
		),
		'spacingBetweenTextLines' => array(
			'type' => 'number',
			'default' => null
		),
		'stretchLastSystemLine' => array(
			'type' => 'boolean',
			'default' => false
		),
		'autoGenerateMutipleRestMeasuresFromRestMeasures' => array(
			'type' => 'boolean',
			'default' => true
		),
		'width' => array(
			'type' => 'number',
			'default' => 100.0
		),
		'aspectRatio' => array(
			'type' => 'number',
			'default' => 0.0
		),
		'zoom' => array(
			'type' => 'number',
			'default' => 1.0
		),
		'musicXmlId' =>array(
			'type' => 'number',
			'default' => -1
		),
		'musicXmlUrl' => array(
			'type' => 'string',
			'default' => null
		),
		'musicXmlTitle' => array(
			'type' => 'string',
			'default' => null
		)
	);
	$attributes = apply_filters('phonicscore/opensheetmusicdisplay/block-attributes', $attributes);
	return $attributes;
}

function phonicscore_opensheetmusicdisplay_get_user_set_defaults(){
	$phonicscore_opensheetmusicdisplay_user_set_defaults = get_option( 'phonicscore_opensheetmusicdisplay_default_settings_option_name' ); // Array of All Options
	$attributes = array();
	if(is_array($phonicscore_opensheetmusicdisplay_user_set_defaults)){
		foreach(phonicscore_opensheetmusicdisplay_base_attributes as $key => $value){
			if(!array_key_exists($key, phonicscore_opensheetmusicdisplay_settings_page_defaults)){
				continue;
			}
			switch($value['type']){
				case 'boolean':
					if(array_key_exists($key, $phonicscore_opensheetmusicdisplay_user_set_defaults) && $phonicscore_opensheetmusicdisplay_user_set_defaults[$key]
						&& $value['default'] === false){
						$attributes[$key]['default'] = true;
					} else if((!array_key_exists($key, $phonicscore_opensheetmusicdisplay_user_set_defaults) || !$phonicscore_opensheetmusicdisplay_user_set_defaults[$key]) && $value['default'] === true){
						$attributes[$key]['default'] = false;
					}
				break;
				default:
					if(array_key_exists($key, $phonicscore_opensheetmusicdisplay_user_set_defaults) &&
						$phonicscore_opensheetmusicdisplay_user_set_defaults[$key] != $value['default']){
						$attributes[$key]['default'] = $phonicscore_opensheetmusicdisplay_user_set_defaults[$key];
					}
				break;
			}
		}
	}
	return $attributes;
}

function phonicscore_opensheetmusicdisplay_get_processed_defaults(){
	$attributes = phonicscore_opensheetmusicdisplay_base_attributes;

	foreach(phonicscore_opensheetmusicdisplay_user_set_defaults as $key => $value){
		$attributes[$key]['default'] = $value['default'];
	}
	return $attributes;
}

function phonicscore_opensheetmusicdisplay_render_callback($block_attributes, $content){
	$asJson = wp_json_encode($block_attributes, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK | JSON_HEX_QUOT | JSON_HEX_TAG);
	$asJson = esc_html($asJson);
	$width = '100%';
	$className = '';
	if(is_array($block_attributes)){
		if(array_key_exists('width', $block_attributes)){
			$width = esc_attr($block_attributes['width']) . '%';
		}
		if(array_key_exists('className', $block_attributes)){
			$className = sanitize_html_class($block_attributes['className']);
		}
	}
	return
		<<<EOT
		<div class="phonicscore-opensheetmusicdisplay__placeholder $className" style="width: $width !important; max-width: $width !important;">
			<div class="phonicscore-opensheetmusicdisplay__loading-spinner hide"></div>
			<div class="phonicscore-opensheetmusicdisplay__render-block" style="width: $width !important; max-width: $width !important;"></div>
			<code style="display:none;" class="attributesAsJson">$asJson</code>
		</div>
EOT;
}

function phonicscore_opensheetmusicdisplay_shortcode_callback($shortCodeAtts, $content, $name) {
	foreach (phonicscore_opensheetmusicdisplay_processed_defaults as $key => $value) {
		//Shortcode have their atts automatically lower cased. We can't do that though because of omsd option names.
		//Find them in the shortcode atts and adapt them before passing to render function.
		$keyLowerCase = strtolower($key);
		if(array_key_exists($keyLowerCase, $shortCodeAtts) ) {
			switch ($value['type']) {
				case 'number':
					$shortCodeAtts[$key] = floatval($shortCodeAtts[$keyLowerCase]);
				break;
				case 'boolean':
					if($shortCodeAtts[$keyLowerCase] == 'true'){
						$shortCodeAtts[$key] = true;
					} else {
						$shortCodeAtts[$key] = false;
					}
				break;
				case 'array':
				case 'object':
					$shortCodeAtts[$key] = json_decode($shortCodeAtts[$keyLowerCase]);
				break;
				default:
					$shortCodeAtts[$key] = $shortCodeAtts[$keyLowerCase];
				break;
			}
			if($key != $keyLowerCase) {
				unset($shortCodeAtts[$keyLowerCase]);
			}
		} else if($value['default'] != null) {//else use the (valid) default value
			$shortCodeAtts[$key] = $value['default'];
		}
	}
	return phonicscore_opensheetmusicdisplay_render_callback($shortCodeAtts, $content);
}

function phonicscore_opensheetmusicdisplay_shortcode_init(){
	add_shortcode('opensheetmusicdisplay', 'phonicscore_opensheetmusicdisplay_shortcode_callback');
}

function phonicscore_opensheetmusicdisplay_enqueue_scripts(){
	wp_enqueue_script(
		'phonicscore_opensheetmusicdisplay_opensheetmusicdisplay_dist',
		esc_url( plugins_url( 'build/osmd/opensheetmusicdisplay.min.js', __FILE__ ) ),
		array( ),
		'1.8.5',
		true
	);
	wp_enqueue_script(
		'phonicscore_opensheetmusicdisplay_opensheetmusicdisplay_block_exports',
		esc_url( plugins_url( 'build/osmd/opensheetmusicdisplay-wordpress-block.min.js', __FILE__ ) ),
		array( ),
		'0.1.1',
		true
	);
	wp_enqueue_script(
		'phonicscore_opensheetmusicdisplay_frontend_script',
		esc_url( plugins_url( 'build/osmd/osmd-loader.min.js', __FILE__ ) ),
		array( 'phonicscore_opensheetmusicdisplay_opensheetmusicdisplay_dist', 'phonicscore_opensheetmusicdisplay_opensheetmusicdisplay_block_exports' ),
		'1.1.7',
		true
	);
}
function phonicscore_opensheetmusicdisplay_enqueue_admin_scripts($hook){
    if ( 'post.php' != $hook && 'post-new.php' != $hook ) {
        return;
    }
	wp_enqueue_script(
		'phonicscore_opensheetmusicdisplay_opensheetmusicdisplay_dist',
		esc_url( plugins_url( 'build/osmd/opensheetmusicdisplay.min.js', __FILE__ ) ),
		array( ),
		'1.8.5',
		true
	);
	wp_enqueue_script(
		'phonicscore_opensheetmusicdisplay_opensheetmusicdisplay_block_exports',
		esc_url( plugins_url( 'build/osmd/opensheetmusicdisplay-wordpress-block.min.js', __FILE__ ) ),
		array( ),
		'0.1.1',
		true
	);
	wp_add_inline_script(
		'phonicscore_opensheetmusicdisplay_opensheetmusicdisplay_block_exports',
		phonicscore_opensheetmusicdisplay_generate_admin_client_attributes(),
	);
	wp_enqueue_script(
		'fredmeister77_queueable_attributes_dist',
		esc_url( plugins_url( 'build/osmd/queueable_attributes.min.js', __FILE__ ) ),
		array( ),
		'0.1.1',
		true
	);
	wp_enqueue_script(
		'phonicscore_opensheetmusicdisplay_opensheetmusicdisplay_block_detection',
		esc_url( plugins_url( 'build/osmd/new_block_detection.min.js', __FILE__ ) ),
		array( ),
		'0.0.1',
		true
	);
}
function phonicscore_opensheetmusicdisplay_musicxml_mime_types( $mimes ) {
	$mimes['musicxml'] = 'application/vnd.recordare.musicxml+xml';
	$mimes['mxl'] = 'application/vnd.recordare.musicxml';
	$mimes['xml'] = 'text/xml|application/xml';
	return $mimes;
}
add_filter( 'upload_mimes', 'phonicscore_opensheetmusicdisplay_musicxml_mime_types', 98 );

include_once 'MultipleMimes.php';
phonicscore_opensheetmusicdisplay_MultipleMimes::init();

function phonicscore_opensheetmusicdisplay_admin_notices() {
    ?>
    <div class="notice notice-warning is-dismissible">
        <p><?php _e( '<strong>Heads up!</strong> The OpenSheetMusicDisplay Block will no longer automatically rerender on resize in the editor. It will still automatically resize for the frontend.', 'phonicscore_opensheetmusicdisplay' ); ?></p>
    </div>
    <?php
}

function phonicscore_opensheetmusicdisplay_activate_plugin(){
	if(function_exists('register_block_type')){
		add_action( 'init', 'phonicscore_opensheetmusicdisplay_block_init' );
	}
	add_action( 'init', 'phonicscore_opensheetmusicdisplay_shortcode_init' );
	add_action( 'wp_enqueue_scripts', 'phonicscore_opensheetmusicdisplay_enqueue_scripts' );
	if(function_exists('register_block_type')){
		add_action( 'admin_enqueue_scripts', 'phonicscore_opensheetmusicdisplay_enqueue_admin_scripts' );
		if (current_user_can('edit_posts') && is_admin()){
			$resizeUpdateMessageViewed = get_user_meta(get_current_user_id(), 'phonicscore_opensheetmusicdisplay_resize_update_message_viewed', true);
			if($resizeUpdateMessageViewed === '' || $resizeUpdateMessageViewed == false){
				add_action( 'admin_notices', 'phonicscore_opensheetmusicdisplay_admin_notices' );
				update_user_meta(get_current_user_id(), 'phonicscore_opensheetmusicdisplay_resize_update_message_viewed', true);
			}
		}
	}
}

add_action('plugins_loaded', 'phonicscore_opensheetmusicdisplay_activate_plugin', 10);

include_once 'practicebird_block.php';
?>