<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Expires: " . date("r"));

require_once 'config.php';
require_once 'unit.php';

$filename_utf8 = POST['path'] . DIRECTORY_SEPARATOR . POST['fileName'];
$filename_win = iconv('utf-8//IGNORE', 'windows-1251//IGNORE', $filename_utf8);

// exec(HERE_DIR . 'run.cmd "' . $filename_win . '"');
exec(sprintf($exec, $filename_win));

echo(json_encode($filename_utf8, JSON_UNESCAPED_UNICODE));
