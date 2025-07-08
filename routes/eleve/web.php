<?php

use App\Http\Controllers\Backend\Eleve\AnnulationTardive\AnnulationTardiveController;
use App\Http\Controllers\Backend\Eleve\Cart\CartController;
use App\Http\Controllers\Backend\Eleve\Cpf\CpfEleveController;
use App\Http\Controllers\Backend\Eleve\DashboardController;
use App\Http\Controllers\Backend\Eleve\LivretApprentissage\LivretApprentissageController;
use App\Http\Controllers\Backend\Eleve\Notifications\NotificationsController;
use App\Http\Controllers\Backend\Eleve\Order\OrderController;
use App\Http\Controllers\Backend\Eleve\Session\SessionController;
use App\Http\Controllers\Backend\Eleve\Settings\ContractFormationController;
use App\Http\Controllers\Backend\Eleve\Settings\NephController;
use App\Http\Controllers\Backend\Eleve\Shop\BoutiqueController;
use App\Http\Controllers\Backend\Eleve\User\UsersController;
use App\Http\Controllers\Backend\Eleve\CodeDeLaRoute\DashboardCodeController;
use App\Http\Controllers\Backend\Eleve\CodeDeLaRoute\ExamenController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|---------------------------------------------------------------- ----------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::middleware(['auth:sanctum,web', config('jetstream.auth_session'), 'verified', 'role:eleve', 'slow'])->group(function () {

    Route::prefix('/')->name('dashboard.')
        ->controller(DashboardController::class)->group(function () {
            Route::get('/', 'index')->name('index');
        });

    // Method: GET, PUT, POST, DELETE For User
    Route::prefix('profile')->name('profile.')
        ->controller(UsersController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('/password-change', 'passwordChange')->name('password.change');
            // Route::post('/', 'store')->name('store');
            // Route::get('/create', 'create')->name('create');
            Route::prefix('{eleve}')->group(function () {
                Route::get('/', 'edit')->name('edit');
                Route::put('/', 'update')->name('update');
                Route::put('/edit-password', 'updatePassword')->name('password.update');
                Route::delete('/', 'destroy')->name('destroy');
            });
        });


    Route::name('settings.')->prefix('settings')->group(function () {
        Route::name('contrat-de-formation.')->prefix('contrat-de-formation')->controller(ContractFormationController::class)->group(function () {
            Route::get('/', 'index')->name('index');
        });
        Route::name('neph.')->prefix('neph')->controller(NephController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::put('/', 'update')->name('update');
        });
    });

    // Method: GET, PUT, POST, DELETE For Carts
    Route::prefix('sessions')->name('sessions.')
        ->controller(SessionController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::post('/', 'store')->name('store');
            Route::get('/create', 'create')->name('create');
            Route::prefix('{session}')->group(function () {
                Route::get('/', 'edit')->name('edit');
                Route::put('/', 'update')->name('update');
                Route::delete('/', 'destroy')->name('destroy');
            });
        });

    Route::name('shop.')->prefix('shop')
        ->controller(BoutiqueController::class)->group(function () {
            Route::get('/', 'index')->name('index');
        });

    // TODO: deprecated
    Route::name('carts.')->prefix('carts')
        ->controller(CartController::class)->group(function () {
            Route::get('/', 'index')->name('index');
        });


    Route::name('annulation-tardives.')->prefix('annulation-tardives')
        ->controller(AnnulationTardiveController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::post('/', 'store')->name('store');
            Route::prefix('{annulationTardive}')->group(function () {
                Route::post('/', 'update')->name('update');
            });
        });

    Route::name('notifications.')->prefix('notifications')
        ->controller(NotificationsController::class)->group(function () {
            Route::get('/', 'index')->name('index');
        });

    // Method: GET, PUT, POST, DELETE For Order
    Route::prefix('orders')->name('orders.')
        ->controller(OrderController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::prefix('{order}')->group(function () {
                Route::get('/', 'show')->name('show');
            });
        });

    Route::prefix('livert-apprentissage')->name('livert-apprentissage.')
        ->controller(LivretApprentissageController::class)->group(function () {
            Route::get('/', 'index')->name('index');
        });

    Route::name('cpf.')->prefix('cpf')
        ->controller(CpfEleveController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::prefix('{cpfEleve}')->group(function () {
                Route::get('/', 'view')->name('view');
                Route::post('/', 'store')->name('store');
            });
        });

    Route::get('/examen', [ExamenController::class, 'start'])->name('codelaRoute.examen');

    Route::get('/dashboard', [DashboardCodeController::class, 'index'])->name('codelaRoute.dashboardCodeLaRoute');
});


//Route::prefix('paypal')->name('paypal.')
//    ->controller(PayPalController::class)
//    ->group(function () {
//        Route::prefix('transaction')->name('transaction.')->group(function () {
//            Route::get('process', 'processTransaction')->name('process');
//            Route::get('success', 'successTransaction')->name('success');
//            Route::get('cancel', 'cancelTransaction')->name('cancel');
//        });
//    });
