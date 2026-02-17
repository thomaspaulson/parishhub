<?php

use App\Http\Controllers\Api\BirthController;
use App\Http\Controllers\Api\DeathController;
use App\Http\Controllers\Api\MarriageController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
	// Route::post('register', [AuthController::class, 'register']);
	Route::post('login', [AuthController::class, 'login']);
	Route::post('logout', [AuthController::class, 'logout'])->middleware('auth');
});

Route::apiResource('deaths', DeathController::class);
Route::apiResource('births', BirthController::class);
Route::apiResource('marriages', MarriageController::class);
