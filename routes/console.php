<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use App\Events\TestMessage;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('test:broadcast', function () {
    event(new TestMessage('Hello from Artisan Command!'));
    $this->info('TestMessage event broadcasted!');
});
