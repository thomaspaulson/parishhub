<?php

use App\Http\Controllers\Api\BirthController;
use App\Http\Controllers\Api\DeathController;
use App\Http\Controllers\Api\MarriageController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('/auth')->group(function () {
	// Route::post('register', [AuthController::class, 'register']);
	Route::post('/login', [AuthController::class, 'login']);
});

Route::middleware('auth:sanctum')->group(function () {
    // logout
    Route::post('auth/logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete(); // Revoke the current token
        return response()->noContent();
    });

    Route::apiResource('deaths', DeathController::class);
    Route::apiResource('births', BirthController::class);
    Route::apiResource('marriages', MarriageController::class);
});
