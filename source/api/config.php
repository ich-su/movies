<?php

$exec = '"c:\Program Files (x86)\K-Lite Codec Pack\MPC-HC64\mpc-hc64.exe" "%s" /fullscreen /playnext'; // /play
$commands_url = 'http://localhost:13579/command.html?wm_command=';

$config = [
    'maxDrawRecords' => 250,

    'commands' => [
        'play' => 887,
        'pause' => 888,
        'stop' => 890,

        'skip back' => 919,
        'skip forward' => 920,

        'jump back short' => 901,
        'jump back' => 903,
        'jump forward short' => 902,
        'jump forward' => 904,

        'framestep' => 891,
        'framestep back' => 892,

        'mute' => 909,
        'volume down' => 908,
        'volume up' => 907,

        'fullscreen' => 830,
        'fullscreen off' => 831,

        'inc size' => 862,
        'dec size' => 863,
        'reset size' => 861,

        'prev audio' => 953,
        'next audio' => 952,

        'prev subtitle' => 955,
        'next subtitle' => 954,

        'exit' => 816,
    ]
];
