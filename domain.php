<?php
// Bootstrap
require_once("lib/Daeman.inc.php");

// Get the domain info
$domain = new \DeeHants\Daeman\Domain("earlsoft.co.uk");
$page_data = $domain->getData();

?>
<html>
    <head>
        <title>Domain details</title>
        <link rel='stylesheet' href='style.css' type='text/css' media='all' />
        <script type="text/javascript">
            var page_data = <?php print json_encode($page_data); ?>;
        </script>
    </head>
    <body>
        <h1>Domain</h1>
        <pre><?php print htmlentities(json_encode($page_data, JSON_PRETTY_PRINT)); ?></pre>
        <div class="react-container-domain"></div>

        <!-- Load React. -->
        <!-- Note: when deploying, replace "development.js" with "production.min.js". -->
        <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
        <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>

        <!-- Load our React component. -->
        <script src="domain.js"></script>
    </body>
</html>
