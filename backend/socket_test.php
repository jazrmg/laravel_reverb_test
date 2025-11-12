<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = '0.0.0.0';
$port = 8081;

echo "Creating socket...\n";
$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
if ($socket === false) {
    echo "socket_create() failed: reason: " . socket_strerror(socket_last_error()) . "\n";
    exit;
}

echo "Setting socket option...\n";
$ret = socket_set_option($socket, SOL_SOCKET, SO_REUSEADDR, 1);
if ($ret === false) {
    echo "socket_set_option() failed: reason: " . socket_strerror(socket_last_error()) . "\n";
    exit;
}

echo "Binding socket...\n";
$ret = socket_bind($socket, $host, $port);
if ($ret === false) {
    echo "socket_bind() failed: reason: " . socket_strerror(socket_last_error($socket)) . "\n";
    exit;
}

echo "Listening on $host:$port\n";
$ret = socket_listen($socket, 5);
if ($ret === false) {
    echo "socket_listen() failed: reason: " . socket_strerror(socket_last_error($socket)) . "\n";
    exit;
}

do {
    echo "Waiting for a connection...\n";
    $client = socket_accept($socket);
    if ($client === false) {
        echo "socket_accept() failed: reason: " . socket_strerror(socket_last_error($socket)) . "\n";
        break;
    }
    echo "Connection accepted.\n";

    $input = socket_read($client, 2048);
    echo "Received: " . $input . "\n";

    $message = "OK";
    socket_write($client, $message, strlen($message));

    socket_close($client);
} while (true);

socket_close($socket);

