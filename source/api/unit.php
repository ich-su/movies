<?php

error_reporting(0);


if (count($_POST) == 0) $post = json_decode(file_get_contents('php://input'), true); // json_decode($HTTP_RAW_POST_DATA, true);
else $post = $_POST;

define('HERE_DIR', 'cfg' . DIRECTORY_SEPARATOR);
define('POST', $post);
