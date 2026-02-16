<?php

use App\Http\Controllers\SwaggerController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Swagger documentation routes
Route::get('/swagger', [SwaggerController::class, 'index'])->name('swagger.index');
Route::get('/swagger/spec', [SwaggerController::class, 'spec'])->name('swagger.spec');
