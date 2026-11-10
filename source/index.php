<?php
header("Content-Type:text/html; charset=UTF-8");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Expires: " . date("r"));
?>
<!DOCTYPE HTML>
<html id="html">

<head>
    <title>Запускатель фильмов. Web-версия</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="shortcut icon" href="apple-touch-icon.png">
    <link rel="icon" href="apple-touch-icon.png">
    <link rel="stylesheet" href="web/material-icons.css">
    <script type="text/javascript" src="web/cookie.js"></script>
    <?php echo('<link rel="stylesheet" href="web/movies.css?t=' . time() . '">'); ?>
    <?php echo('<script type="text/javascript" src="web/movies.js?t=' . time() . '"></script>'); ?>
    <?php
        if (isset($_COOKIE['theme'])) {
            $theme = $_COOKIE['theme'];
            if ($theme != 'blue') {
                echo('<link rel="stylesheet" href="web/themes/' . $theme . '.css?t=' . time() . '">');
            }
        }
    ?>
</head>

<body id="body">
    <div id="top">
        <div id="errors" class="display-none"></div>
        <div id="letters" class="display-none"></div>
        <div id="search"></div>
        <div id="navigation"></div>
    </div>

    <div id="main">
        <div class="wait">
            подготовка списка...
        </div>
    </div>

    <div id="menu" class="menu-hide display-none"></div>
</body>

</html>

<!-- <div class="icon" style="height:300px;font-size:1385%;color:var(--color-link-hover);background-color:var(--color-link-active-back)">play_circle_outline</div> -->
