<?php

use Illuminate\Support\Facades\Route;
use App\Events\TestMessage;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/broadcast-test', function () {
    event(new TestMessage('Hello from Web Route!'));
    return 'Event broadcasted!';
});
