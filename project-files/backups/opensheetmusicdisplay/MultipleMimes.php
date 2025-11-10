<?php
class phonicscore_opensheetmusicdisplay_MultipleMimes {

    public static function init() {
        add_filter( 'wp_check_filetype_and_ext', [self::class, 'add_multiple_mime_types'], 99, 3 );
    }

    public static function add_multiple_mime_types( $check, $file, $filename ) {
        if ( empty( $check['ext'] ) && empty( $check['type'] ) ) {
            foreach ( self::get_allowed_mime_types() as $mime ) {
                remove_filter( 'wp_check_filetype_and_ext', [ self::class, 'add_multiple_mime_types' ], 99 );
                $mime_filter = function($mimes) use ($mime) {
                    return array_merge($mimes, $mime);
                };

                add_filter('upload_mimes', $mime_filter, 99);
                $check = wp_check_filetype_and_ext( $file, $filename, $mime );
                remove_filter('upload_mimes', $mime_filter, 99);
                add_filter( 'wp_check_filetype_and_ext', [ self::class, 'add_multiple_mime_types' ], 99, 3 );
                if ( ! empty( $check['ext'] ) || ! empty( $check['type'] ) ) {
                    return $check;
                }
            }
        }
        return $check;
    }

    public static function get_allowed_mime_types(){
        return [
            ['musicxml' => 'application/vnd.recordare.musicxml+xml'],
            ['musicxml' => 'application/octet-stream'],
            ['musicxml' => 'text/xml'],
            ['musicxml' => 'application/xml'],
            ['xml' => 'text/xml'],
            ['xml' => 'application/xml'],
            ['xml' => 'application/octet-stream'],
            ['mxl' => 'application/vnd.recordare.musicxml'],
            ['mxl' => 'application/octet-stream']
        ];
    }
}
?>