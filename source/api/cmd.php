<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Expires: " . date("r"));

require_once 'config.php';
require_once 'unit.php';

$cmd = POST['cmd'];

if (isset($config['commands'][$cmd])) {
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL,  $commands_url . $config['commands'][$cmd]);
    curl_setopt($curl, CURLOPT_HEADER, 0);
    $result = curl_exec($curl);
    curl_close($curl);
} else {
    $result = false;
}

echo(json_encode([
    'cmd' => $cmd,
    'result' => $result === false ? 0 : 1
    ], JSON_UNESCAPED_UNICODE)
);
