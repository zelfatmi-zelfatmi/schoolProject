<?php

use App\Http\Controllers\Backend\ParentController as BackendParentController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Backend\Auth\LoginController;

Route::middleware(['web']) // 👈 Ajoute ça
    ->prefix('backend')
    ->name('backend.')
    ->group(function () {
        Route::post('parents', [BackendParentController::class, 'store'])->name('parents.store');
        Route::get('parent/dashboard', [BackendParentController::class, 'dashboard'])->name('parent.dashboard');
        // Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

    });
