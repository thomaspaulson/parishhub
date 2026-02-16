<?php

use App\Http\Controllers\Api\DeathController;
use Illuminate\Support\Facades\Route;

Route::apiResource('deaths', DeathController::class);
