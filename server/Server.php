<?php

use Workerman\Worker;

require_once __DIR__ . '/../vendor/autoload.php';

// Initializate entity of class Worker
$wsWorker = new Worker('websocket://127.0.0.1:2346');

// Quantity of processes for handling a connection from user
$wsWorker->count = 4;

// Callback for open a connection
$wsWorker->onConnect = function ($connection) {
    echo "New connection \n";
};

// Handle a message
$wsWorker->onMessage = function ($connection, $data) use ($wsWorker) {
    foreach($wsWorker->connections as $clientConnection) {
        $clientConnection->send($data);
    }
};

// Callback for close a connection
$wsWorker->onClose = function ($connection) {
    echo "Connection closed \n";
};

Worker::runAll();
