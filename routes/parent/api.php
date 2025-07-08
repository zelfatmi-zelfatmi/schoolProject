<?php

use App\Http\Controllers\Api\ParentController;
use Illuminate\Support\Facades\Route;
Route::prefix('parents')
    ->name('parents.')
    ->controller(ParentController::class)
    ->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::get('/{parent}', 'show')->name('show'); // optionnel
        Route::put('/{parent}', 'update')->name('update'); // optionnel
        Route::delete('/{parent}', 'destroy')->name('destroy'); // optionnel
    });
