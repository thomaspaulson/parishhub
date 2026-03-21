<?php

use App\Http\Controllers\Api\BackupController;
use App\Http\Controllers\Api\BirthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\DeathController;
use App\Http\Controllers\Api\MarriageController;
use App\Http\Controllers\Api\UserController;
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

    Route::get('deaths/download-csv', [DeathController::class, 'downloadCsv']);
    Route::get('deaths/export-csv', [DeathController::class, 'exportCsv']);
    Route::post('deaths/import-csv', [DeathController::class, 'importCsv']);
    Route::apiResource('deaths', DeathController::class);
    Route::get('births/download-csv', [BirthController::class, 'downloadCsv']);
    Route::get('births/export-csv', [BirthController::class, 'exportCsv']);
    Route::post('births/import-csv', [BirthController::class, 'importCsv']);
    Route::apiResource('births', BirthController::class);
    Route::get('marriages/download-csv', [MarriageController::class, 'downloadCsv']);
    Route::get('marriages/export-csv', [MarriageController::class, 'exportCsv']);
    Route::post('marriages/import-csv', [MarriageController::class, 'importCsv']);
    Route::apiResource('marriages', MarriageController::class);
    Route::apiResource('users', UserController::class);
    Route::get('dashboard', [DashboardController::class, 'summary']);
    Route::get('backup/full', [BackupController::class, 'downloadFullBackup']);
});
