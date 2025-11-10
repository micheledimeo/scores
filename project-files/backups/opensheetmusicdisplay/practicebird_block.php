<?php
if ( ! defined( 'ABSPATH' ) ) exit;

//TODO: make settings?
define('phonicscore_practicebird_deeplink_endpoint_path', '/?phonicscore_practicebird_deeplink_endpoint=1');
define("phonicscore_practicebird_deeplink_settings_page_defaults", phonicescore_practicebird_deeplink_settings_page_defaults());
define("phonicscore_practicebird_deeplink_base_attributes", phonicscore_practicebird_deeplink_attributes());
define("phonicscore_practicebird_deeplink_user_set_defaults", phonicscore_practicebird_deeplink_get_user_set_defaults());
define("phonicscore_practicebird_deeplink_processed_defaults", phonicscore_practicebird_deeplink_get_processed_defaults());

function phonicescore_practicebird_deeplink_settings_page_defaults(){
	$default_values = array(
	);
	$default_values = apply_filters('phonicscore/practicebird_deeplink/settings-default-values', $default_values);
	return $default_values;
}
function phonicscore_practicebird_deeplink_attributes(){
	$attributes = array(
		'musicXmlId' => array(
			'type' => 'number',
			'default' => -1
		),
		'target' => array(
			'type' => 'string',
			'default' => ''
		),
		'musicXmlTitle' => array(
			'type' => 'string',
			'default' => ''
		),
		'generateBehavior' => array(
			'type' => 'number',
			'default' => 0
		),
		'qrScale' => array(
			'type' => 'number',
			'default' => 1.0
		),
		'size' => array(
			'type' => 'number',
			'default' => 256
		),
		'iconSize' => array(
			'type' => 'number',
			'default' => 180
		),
		'autoRedirectAppStore' => array(
			'type' => 'boolean',
			'default' => true
		)
	);
	$attributes = apply_filters('phonicscore/practicebird-deeplink/block-attributes', $attributes);
	//So far, these user options are universal branding options.
	//thus it is fine to just set them as the default
	$phonicscore_practicebird_deeplink_default_settings_options = get_option( 'phonicscore_practicebird_deeplink_default_settings_option_name' );
	
	if(is_array($phonicscore_practicebird_deeplink_default_settings_options)){
		foreach($attributes as $key => $value){
			switch($value['type']){
				case 'boolean':
					if(array_key_exists($key, $phonicscore_practicebird_deeplink_default_settings_options) && $phonicscore_practicebird_deeplink_default_settings_options[$key]){
						$attributes[$key]['default'] = true;
					} else {
						$attributes[$key]['default'] = false;
					}
				break;
				default:
					if(array_key_exists($key, $phonicscore_practicebird_deeplink_default_settings_options)){
						$attributes[$key]['default'] = $phonicscore_practicebird_deeplink_default_settings_options[$key];
					}
				break;
			}
		}
	}
	return $attributes;
}

function phonicscore_practicebird_deeplink_get_user_set_defaults(){
	$phonicscore_practicebird_deeplink_user_set_defaults = get_option( 'phonicscore_practicebird_deeplink_default_settings_option_name' );
	$attributes = array();
	if(is_array($phonicscore_practicebird_deeplink_user_set_defaults)){
		foreach(phonicscore_practicebird_deeplink_base_attributes as $key => $value){
			if(!array_key_exists($key, phonicscore_practicebird_deeplink_settings_page_defaults)){
				continue;
			}
			switch($value['type']){
				case 'boolean':
					if(array_key_exists($key, $phonicscore_practicebird_deeplink_user_set_defaults) && $phonicscore_practicebird_deeplink_user_set_defaults[$key]
						&& $value['default'] === false){
						$attributes[$key]['default'] = true;
					} else if((!array_key_exists($key, $phonicscore_practicebird_deeplink_user_set_defaults) || !$phonicscore_practicebird_deeplink_user_set_defaults[$key]) && $value['default'] === true){
						$attributes[$key]['default'] = false;
					}
				break;
				default:
					if(array_key_exists($key, $phonicscore_practicebird_deeplink_user_set_defaults) &&
						$phonicscore_practicebird_deeplink_user_set_defaults[$key] != $value['default']){
						$attributes[$key]['default'] = $phonicscore_practicebird_deeplink_user_set_defaults[$key];
					}
				break;
			}
		}
	}
	return $attributes;
}

function phonicscore_practicebird_deeplink_get_processed_defaults(){
	$attributes = phonicscore_practicebird_deeplink_base_attributes;

	foreach(phonicscore_practicebird_deeplink_user_set_defaults as $key => $value){
		$attributes[$key]['default'] = $value['default'];
	}
	return $attributes;
}

function phonicscore_practicebird_deeplink_generate_admin_client_attributes(){
	$jsonBaseDefaults = wp_json_encode(phonicscore_practicebird_deeplink_base_attributes, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
	$jsonUserDefaults = wp_json_encode(phonicscore_practicebird_deeplink_user_set_defaults, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
	return <<<EOT
	(function(){
		const baseDefaults = {$jsonBaseDefaults};
		const userDefaults = {$jsonUserDefaults};
		const userDefaultsKeys = Object.keys(userDefaults);
		function registerAttributes(settings, name){
			if( name === 'phonicscore/practicebird-deeplink'){
				settings.attributes = {...settings.attributes, ...baseDefaults};
				for(let idx = 0; idx < userDefaultsKeys.length; idx++){
					if(settings.attributes[userDefaultsKeys[idx]]){
						settings.attributes[userDefaultsKeys[idx]].default = userDefaults[userDefaultsKeys[idx]].default;
					}
					
				}
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
					'phonicscore/practicebird_deeplink/block-type-hook',
					registerAttributes
				);
			}
			if(typeof userDefaults === 'object'){
				wp.hooks.addFilter(
					'phonicscore_practicebird_deeplink_attributes-user-defaults',
					'phonicscore/practicebird_deeplink/get-user-defaults',
					getUserDefaults
				);
			}
		}
	})();
	EOT;
}
/**
 * This file defines all registration for the practice bird deeplink block
 */
function phonicscore_practicebird_deeplink_block_init() {
	$dir = __DIR__;

	$script_asset_path = "$dir/build/pbdeeplink_block.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "phonicscore/practicebird-deeplink" block first.'
		);
	}
	$index_js     = 'build/pbdeeplink_block.js';
	$script_asset = require( $script_asset_path );
	//Use default dependencies, add deep link script as well
	if(array_key_exists('dependencies', $script_asset) && is_array($script_asset['dependencies'])){
		$script_asset['dependencies'][] = 'phonicscore_practicebird_deeplink_qrcode_library';
	}
	wp_register_script(
		'phonicscore_practicebird_deeplink_block_editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'phonicscore_practicebird_deeplink_block_editor', 'phonicscore_practicebird_deeplink' );

	$editor_css = 'build/styles/pbdeeplink_block.css';
	wp_register_style(
		'phonicscore_practicebird_deeplink_block_editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/styles/style-pbdeeplink_block.css';
	wp_register_style(
		'phonicscore_practicebird_deeplink_block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type(
		'phonicscore/practicebird-deeplink',
		array(
			'editor_script' => 'phonicscore_practicebird_deeplink_block_editor',
			'editor_style'  => 'phonicscore_practicebird_deeplink_block_editor',
			'style'         => 'phonicscore_practicebird_deeplink_block',
			'render_callback' => 'phonicscore_practicebird_deeplink_render_callback',
			'attributes' => phonicscore_practicebird_deeplink_base_attributes
		)
	);
}

function phonicscore_practicebird_deeplink_render_callback($block_attributes, $content){
	$className = '';
	$iconSize = '180px';
	if(is_array($block_attributes)){
		if(array_key_exists('className', $block_attributes)){
			$className = esc_attr($block_attributes['className']);
		}
		if(array_key_exists('iconSize', $block_attributes)){
			$iconSize = esc_attr($block_attributes['iconSize']) . "px";
		}
		if(!array_key_exists('generateBehavior', $block_attributes)){
			$block_attributes['generateBehavior'] = 0;
		}
		if(!array_key_exists('endpointUrl', $block_attributes)){
			$block_attributes['endpointUrl'] = get_site_url(null, phonicscore_practicebird_deeplink_endpoint_path);
		}
	}

	$asJson = wp_json_encode($block_attributes, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
	return
		<<<EOT
		<div class="practicebird-deeplink__render-placeholder $className">
			<div class="practicebird-deeplink__qr-container"></div>
			<div class="practicebird-deeplink__mobile-container" style="width: $iconSize; height: $iconSize;"></div>
			<code style="display:none!important;" class="practicebird-deeplink__attributes hidden">$asJson</code>
		</div>
EOT;
}

function phonicscore_practicebird_deeplink_shortcode_callback($shortCodeAtts, $content, $name) {
	if(array_key_exists("generatebehavior", $shortCodeAtts)){
		switch($shortCodeAtts["generatebehavior"]){
			case "QR_ONLY":
				$shortCodeAtts["generatebehavior"] = 1;
			break;
			case "MOBILE_ONLY":
				$shortCodeAtts["generatebehavior"] = 2;
			break;
			case "DETECT":
				$shortCodeAtts["generatebehavior"] = 3;
			break;
			case "QR_AND_MOBILE":
			default:
			$shortCodeAtts["generatebehavior"] = 0;
			break;
		}
	}

	if(array_key_exists("qrscale", $shortCodeAtts)){
		$scaleVal = floatval($shortCodeAtts["qrscale"]);
		if($scaleVal){
			$shortCodeAtts["size"] = $scaleVal * 256;
		}
	}

	foreach (phonicscore_practicebird_deeplink_attributes() as $key => $value) {
		//Shortcode have their atts automatically lower cased. We can't do that though because of attribute names
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
	
	return phonicscore_practicebird_deeplink_render_callback($shortCodeAtts, $content);
}

function phonicscore_practicebird_deeplink_shortcode_init(){
	add_shortcode('pb-deep-link', 'phonicscore_practicebird_deeplink_shortcode_callback');
}

function phonicscore_practicebird_deeplink_enqueue_admin_scripts($hook){
    if ( 'post.php' != $hook && 'post-new.php' != $hook ) {
        return;
    }
	wp_enqueue_script(
		'phonicscore_practicebird_deeplink_qrcode_library',
		esc_url( plugins_url( 'build/pbdeeplink/qrcode.min.js', __FILE__ ) ),
		array( ),
		'0.1.4',
		true
	);

	wp_add_inline_script(
		'phonicscore_practicebird_deeplink_qrcode_library',
		phonicscore_practicebird_deeplink_generate_admin_client_attributes(),
	);

	wp_enqueue_style(
		'phonicscore_practicebird_deeplink_qrcode_library_css',
		esc_url( plugins_url( 'build/pbdeeplink/responsive_shim.min.css', __FILE__ ) ),
		array( ),
		'0.1.1'
	);
}

function phonicscore_practicebird_deeplink_enqueue_scripts($hook){
	wp_enqueue_script(
		'phonicscore_practicebird_deeplink_qrcode_library',
		esc_url( plugins_url( 'build/pbdeeplink/qrcode.min.js', __FILE__ ) ),
		array( ),
		'0.1.4',
		true
	);

	wp_enqueue_script(
		'phonicscore_practicebird_deeplink_frontend',
		esc_url( plugins_url( 'build/pbdeeplink_frontend.js', __FILE__ ) ),
		array( 'phonicscore_practicebird_deeplink_qrcode_library', 'phonicscore_opensheetmusicdisplay_opensheetmusicdisplay_block_exports' ),
		'0.1.1',
		true
	);

	wp_enqueue_style(
		'phonicscore_practicebird_deeplink_qrcode_library_css',
		esc_url( plugins_url( 'build/pbdeeplink/responsive_shim.min.css', __FILE__ ) ),
		array( ),
		'0.1.1'
	);
}

function phonicscore_practicebird_deeplink_admin_notices() {
    ?>
    <div class="notice notice-info is-dismissible">
        <p><?php _e( '<strong>All new!</strong> The OpenSheetMusicDisplay plugin now includes a block for deeplinking musicXML into our PracticeBird app!', 'phonicscore_practicebird_deeplink' ); ?></p>
    </div>
    <?php
}

function phonicscore_practicebird_deeplink_setup_rewrite_rules(){
	add_filter( 'query_vars', function( $query_vars ) {
		array_push($query_vars, 'target', 'phonicscore_practicebird_deeplink_endpoint');
		return $query_vars;
	} );
	add_action( 'template_include', function( $template ) {
		$url = SERVER_SCHEME . '://' . SERVER_HOST . SERVER_REQUEST_URI;
		$path = parse_url($url, PHP_URL_PATH);
		if (
		    get_query_var( 'target' ) != false && 
			get_query_var( 'target' ) != '' &&
			get_query_var('phonicscore_practicebird_deeplink_endpoint') != false &&
			get_query_var('phonicscore_practicebird_deeplink_endpoint') != '' ) {
			return plugin_dir_path( __FILE__ ) . 'practicebird_endpoint.php';
		}
		return $template;
	} );
}

function phonicscore_practicebird_deeplink_activate_plugin(){
	add_action( 'init', 'phonicscore_practicebird_deeplink_shortcode_init' );
	add_action( 'wp_enqueue_scripts', 'phonicscore_practicebird_deeplink_enqueue_scripts', 99 );
	phonicscore_practicebird_deeplink_setup_rewrite_rules();
	if(function_exists('register_block_type')){
        add_action( 'init', 'phonicscore_practicebird_deeplink_block_init' );
		add_action( 'admin_enqueue_scripts', 'phonicscore_practicebird_deeplink_enqueue_admin_scripts' );
		if (current_user_can('edit_posts') && is_admin()){
			$messageViewed = get_user_meta(get_current_user_id(), 'phonicscore_practicebird_deeplink_new_block_message_viewed', true);
			if($messageViewed === '' || $messageViewed == false){
				add_action( 'admin_notices', 'phonicscore_practicebird_deeplink_admin_notices' );
				update_user_meta(get_current_user_id(), 'phonicscore_practicebird_deeplink_new_block_message_viewed', true);
			}
		}
	}
}

add_action('plugins_loaded', 'phonicscore_practicebird_deeplink_activate_plugin', 11);
?>