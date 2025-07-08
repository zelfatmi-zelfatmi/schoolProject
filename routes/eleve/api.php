<?php

use App\Http\Controllers\API\Eleve\Cart\CartController;
use App\Http\Controllers\API\Eleve\General\GeneralController;
use App\Http\Controllers\API\Eleve\Lecon\LeconController;
use App\Http\Controllers\API\Eleve\Order\OrderController;
use App\Http\Controllers\API\Eleve\Order\StripController;
use App\Http\Controllers\API\Eleve\PropositionSession\PropositionSessionController;
use App\Http\Controllers\API\Eleve\Session\SessionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified', 'slow'])->group(function () {
    ///routes Zainab
    // Route::get('/api/orders/{order}', [OrderController::class, 'apiShow'])->name('orders.apiShow');
    ///routes Rida 
    // Method: GET, PUT, POST, DELETE For Carts
    Route::name('carts.')->prefix('carts')
        ->controller(CartController::class)->group(function () {
            Route::get('/list', 'getCart')->name('getCart');
            Route::post('/', 'storeOrUpdate')->name('storeOrUpdate');
            Route::post('/many', 'storeOrUpdateMany')->name('storeOrUpdateMany');
            Route::prefix('{cartItem}')->group(function () {
                Route::delete('/destroy', 'destroy')->name('destroy');
            });
        });
    Route::name('order.')->prefix('order')
        ->controller(StripController::class)->group(function () {
            Route::post('/', 'store')->name('store');
        });


    Route::name('orders.')->prefix('orders')
        ->controller(OrderController::class)->group(function () {
            Route::get('/', 'store')->name('store');
            Route::get('/{order}', 'apiShow')->name('apiShow');
        });


    Route::name('lecons.')->prefix('lecons')
        ->controller(LeconController::class)->group(function () {
            Route::get('/', 'index')->name('index');
        });

    Route::name('general.')->prefix('general')
        ->controller(GeneralController::class)->group(function () {
            Route::get('/info', 'getInfo')->name('info');
        });
    Route::name('session.')->prefix('session')
        ->controller(SessionController::class)->group(function () {
            Route::get('/', 'get')->name('get');
        });

    Route::name('notifications.')->prefix('notifications')->group(function () {
        Route::name('propositions.')->prefix('propositions')
            ->controller(PropositionSessionController::class)->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/count', 'count')->name('count');
                Route::prefix('{propositionSession}')->group(function () {
                    Route::post('/', 'update')->name('update');
                });
            });
    });
});
