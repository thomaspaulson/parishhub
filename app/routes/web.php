<?php

use App\Http\Controllers\PrintController;
use App\Http\Controllers\SwaggerController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/print/{id}/{type}', [PrintController::class, 'show']);
Route::get('/print/{id}/{type}/pdf', [PrintController::class, 'pdf']);
// Route::get('/print/{id}/{type}', function () {
//     return view('print');
// });

// Swagger documentation routes
Route::get('/swagger', [SwaggerController::class, 'index'])->name('swagger.index');
Route::get('/swagger/spec', [SwaggerController::class, 'spec'])->name('swagger.spec');

Route::view('/{any}', 'welcome')->where('any', '.*');
