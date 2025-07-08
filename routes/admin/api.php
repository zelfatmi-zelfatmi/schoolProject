<?php

use App\Http\Controllers\API\Admin\Eleve\FichePersonal\EleveAvailableCallController;
use App\Http\Controllers\API\Admin\Eleve\FichePersonal\EleveAvailableEleveSessionController;
use App\Http\Controllers\API\Admin\Eleve\FichePersonal\EleveCommentController;
use App\Http\Controllers\API\Admin\Eleve\FichePersonal\EleveResumeHourController;
use App\Http\Controllers\API\Admin\Eleve\FichePersonal\EleveSkillController;
use App\Http\Controllers\API\Admin\Planning\PlanningController;
use App\Http\Controllers\API\Admin\Product\ProductController;
use App\Http\Controllers\API\Admin\Solde\SoldeController;
use App\Http\Controllers\API\Admin\User\Admin\AdminController;
use App\Http\Controllers\API\Admin\User\Eleve\EleveController;
use App\Http\Controllers\API\Admin\User\Moniteur\MoniteurController;
use App\Http\Controllers\API\Admin\Zone\ZoneController;
use App\Http\Controllers\API\Eleve\Cart\CartController;
use App\Http\Controllers\API\Eleve\Order\StripController;
use App\Http\Controllers\API\Global\UserController;
use App\Http\Controllers\API\Moniteur\Facture\FactureMoniteurController;
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

    Route::prefix('plannings')->name('plannings.')
        ->controller(PlanningController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::prefix('reservation')->name('reservation.')->group(function () {
                Route::post('/store', 'store')->name('store');
                Route::put('/update', 'update')->name('update');
            });
            Route::prefix('{planning}')->group(function () {
                Route::put('/', 'update')->name('update');
                Route::delete('/', 'destroy')->name('destroy');
                Route::put('/annulation-session', 'annulationSession')->name('annulation.session');
            });
        });

    // TODO: soldes need to be refactored (we have some duplicated routes in global API)
    Route::prefix('soldes')->name('soldes.')->controller(SoldeController::class)->group(function () {
        Route::prefix('eleve')->name('eleve.')->group(function () {
            Route::prefix('{eleve}')->group(function () {
                Route::get('/', 'getSoldesByEleve')->name('getSoldesByEleve');
                Route::post('/', 'incOrDecSoldeEleve')->name('incOrDecSoldeEleve');
            });
            Route::put('/{solde}', 'update')->name('updateSolde');
        });
    });

    Route::prefix('zones')->name('zones.')->controller(ZoneController::class)->group(function () {
        Route::get('/', 'getAllZones')->name('getAllZones');
        Route::prefix('/{zone}')->group(function () {
            Route::get('/zips', 'getAllZips')->name('getAllZips');
            Route::get('/lieux', 'getAllLieux')->name('getAllLieux');
        });
    });
    Route::name('order.')->prefix('order')
        ->controller(StripController::class)->group(function () {
            Route::post('/', 'store')->name('store');
            Route::post('/{order}/refund', 'refund')->name('refund');
        });


    Route::prefix('product')->controller(ProductController::class)
        ->name('products.')->group(function () {
            Route::get('/', 'getAllProducts')->name('getAllProducts');
            Route::get('/productsForListBox', 'getProductsForListBox')->name('productsForListBox');
        });
    Route::prefix('cart')->controller(CartController::class)
        ->name('cart.')->group(function () {
            Route::get('/{user}', 'getCart')->name('');
            Route::post('/{user}', 'storeOrUpdateMany')->name('storeOrUpdateMany');
        });
    Route::prefix('eleves')->controller(EleveController::class)
        ->name('eleves.')->group(function () {
            Route::prefix('/')->group(function () {
                Route::get('all', 'getAllEleves')->name('all');
            });
        });

    Route::prefix('operators')->name('operators.')->controller(AdminController::class)
        ->group(function () {
            Route::prefix('/')->group(function () {
                Route::get('all', 'getAllOperators')->name('all');
            });
        });

    Route::prefix('user')->controller(UserController::class)
        ->name('user.')->group(function () {
            Route::prefix('/{user}')->group(function () {
                Route::put('', 'archiveUser')->name('archiveUser');
            });
        });

    Route::prefix('available-calls')->name('available-calls.')
        ->controller(EleveAvailableCallController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::post('/', 'store')->name('store');
            Route::prefix('{eleveAvailableCall}')->group(function () {
                Route::put('/', 'update')->name('update');
                Route::delete('/', 'destroy')->name('destroy');
            });
        });

    Route::prefix('available-session')->name('available-session.')
        ->controller(EleveAvailableEleveSessionController::class)->group(function () {
            Route::prefix('{eleve}')->group(function () {
                Route::get('/', 'index')->name('all');
                Route::get('/planning', 'getAllPlanningsEleveGroupByWeek')->name('getAllPlanningsEleveGroupByWeek');
            });
            Route::post('/', 'store')->name('store');
            Route::prefix('{disponibleEleveSession}')->group(function () {
                Route::delete('/', 'destroy')->name('destroy');
            });
        });

    Route::prefix('comments')->controller(EleveCommentController::class)
        ->name('comments.')->group(function () {
            Route::get('/', 'index')->name('index');
            Route::post('/', 'store')->name('store');
            Route::prefix('/{eleveComment}')->group(function () {
                Route::post('/', 'update')->name('update');
                Route::delete('/', 'destroy')->name('destroy');
            });
        });

    Route::prefix('skills')->controller(EleveSkillController::class)
        ->name('skills.')->group(function () {
            Route::get('/{eleve}', 'index')->name('index');
        });


    Route::prefix('resume-hours')->controller(EleveResumeHourController::class)
        ->name('resume-hours.')->group(function () {
            Route::get('/{eleve}', 'index')->name('index');
        });
    Route::prefix('moniteurs')->name('moniteurs.')
        ->group(function () {
            Route::prefix('/')
                ->controller(MoniteurController::class)
                ->group(function () {
                    Route::get('/all', 'getAllMoniteurs')->name('all');
                });

            Route::prefix('factures/{moniteur}')
                ->name('factures.')
                ->controller(FactureMoniteurController::class)
                ->group(function () {
                    Route::get('/', 'getResumeHours')->name('resumes');
                });
        });
});
