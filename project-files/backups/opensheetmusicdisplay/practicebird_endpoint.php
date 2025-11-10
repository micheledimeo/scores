<?php 
    if ( ! defined( 'ABSPATH' ) ) exit;
    $jsUrl = esc_url( plugins_url( 'build/pbdeeplink/endpoint.min.js?ver=1.1.3', __FILE__ ) )
?>
<html>
    <head></head>
    <body>
        <script type="text/javascript" src=<?php echo $jsUrl ?>></script>
        <script type="text/javascript">
            PracticeBirdDeepLink.Endpoint();
        </script>
    </body>
</html>