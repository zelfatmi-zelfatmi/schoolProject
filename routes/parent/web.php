<?php

use App\Http\Controllers\Backend\ParentController as BackendParentController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web']) // 👈 Ajoute ça
    ->prefix('backend')
    ->name('backend.')
    ->group(function () {
        Route::post('parents', [BackendParentController::class, 'store'])->name('parents.store');
        Route::get('parent/dashboard', [BackendParentController::class, 'dashboard'])->name('parent.dashboard');
    });
