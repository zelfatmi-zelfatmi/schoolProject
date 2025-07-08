<?php

use App\Http\Controllers\Backend\Admin\AnnulationTardive\AnnulationTardiveController;
use App\Http\Controllers\Backend\Admin\Cart\CartController;
use App\Http\Controllers\Backend\Admin\Contact\ContactAdminController;
use App\Http\Controllers\Backend\Admin\CpfEleve\CpfController;
use App\Http\Controllers\Backend\Admin\Exams\ExamArchivedController;
use App\Http\Controllers\Backend\Admin\Exams\ExamPassageController;
use App\Http\Controllers\Backend\Admin\Exams\ExamPreListController;
use App\Http\Controllers\Backend\Admin\Exams\ExamWaitingListController;
use App\Http\Controllers\Backend\Admin\FactureMoniteur\FactureMoniteurController;
use App\Http\Controllers\Backend\Admin\LivretApprentissage\Details\SkillsController;
use App\Http\Controllers\Backend\Admin\LivretApprentissage\Group\GroupSkillsController;
use App\Http\Controllers\Backend\Admin\Order\OrderController;
use App\Http\Controllers\Backend\Admin\Page\PagesController;
use App\Http\Controllers\Backend\Admin\Planning\PlanningController;
use App\Http\Controllers\Backend\Admin\Product\ProductController;
use App\Http\Controllers\Backend\Admin\PropositionSession\PropositionSessionController;
use App\Http\Controllers\Backend\Admin\User\Admin\AdminController;
use App\Http\Controllers\Backend\Admin\User\Secretary\SecretaryController;
use App\Http\Controllers\Backend\Admin\User\Eleve\EleveController;
use App\Http\Controllers\Backend\Admin\User\Moniteur\FicheMoniteurController;
use App\Http\Controllers\Backend\Admin\User\Moniteur\MoniteurController;
use App\Http\Controllers\Backend\Admin\Zone\Lieux\LieuxController;
use App\Http\Controllers\Backend\Admin\Zone\Zip\ZipController;
use App\Http\Controllers\Backend\Admin\Zone\ZoneController;
use App\Http\Controllers\Backend\Admin\CodeDeLaRoute\ThemeController;
use App\Http\Controllers\Backend\Admin\CodeDeLaRoute\QuestionController;
use App\Http\Controllers\Backend\Admin\CodeDeLaRoute\SerieController;
// use  App\Http\Controllers\Backend\Eleve\Session\SessionController;
use App\Http\Controllers\Backend\Admin\Planning\CommentaireSessionController;;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Backend\Admin\Notification\NotificationController;
use App\Http\Controllers\Backend\Admin\RdvExamen\RdvExamenController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::middleware(['auth:sanctum,web', config('jetstream.auth_session'), 'verified', 'role:admin|secretary|superAdmin', 'slow'])->group(function () {
    Route::post('/notifications/{notification}/read', [NotificationController::class, 'markAsRead'])->name('notifications.read');

    // CPFController
    Route::prefix('cpf')->name('cpf.')->controller(CpfController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/cpf/signatureHistory', 'signatureHistory')->name('signatureHistory');
        Route::post('/', 'store')->name('store');
        Route::prefix('{cpfEleve}')->group(function () {
            Route::put('/', 'update')->name('update');
            Route::delete('/', 'destroy')->name('destroy');
        });
    });
    // Method: GET, PUT, POST, DELETE For Products
    Route::prefix('products')->name('products.')
        ->controller(ProductController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::post('/', 'store')->name('store');
            Route::get('/create', 'create')->name('create');
            Route::prefix('{product}')->group(function () {
                Route::get('/', 'edit')->name('edit');
                Route::put('/', 'update')->name('update');
                Route::put('/status', 'updateStatus')->name('updateStatus');
                Route::delete('/', 'destroy')->name('destroy');
            });
        });

    // Method: GET, PUT, POST, DELETE For Zones
    Route::prefix('zones')->name('zones.')
        ->controller(ZoneController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::post('/', 'store')->name('store');
            Route::get('/create', 'create')->name('create');
            Route::prefix('{zone}')->group(function () {
                Route::get('/', 'edit')->name('edit');
                Route::put('/', 'update')->name('update');
                Route::delete('/', 'destroy')->name('destroy');
            });
            Route::prefix('{eleve}')->group(function () {
                Route::post('/attach', 'attachZoneToEleve')->name('attachZoneToEleve');
                Route::post('/detach', 'detachZoneToEleve')->name('detachZoneToEleve');
            });
        });

    // Method: GET, PUT, POST, DELETE For LIEUX
    Route::prefix('lieux')->name('lieux.')
        ->controller(LieuxController::class)->group(function () {

            Route::prefix('{zone}')->group(function () {
                Route::get('/', 'index')->name('index');
                Route::post('/', 'store')->name('store');
                Route::get('/create', 'create')->name('create');
            });
            Route::prefix('{lieu}')->group(function () {
                Route::get('/', 'edit')->name('edit');
                Route::put('/', 'update')->name('update');
                Route::delete('/', 'destroy')->name('destroy');
            });
        });

    // Method: GET, PUT, POST, DELETE For LIEUX
    Route::prefix('zips')->name('zips.')
        ->controller(ZipController::class)->group(function () {

            Route::prefix('{zone}')->group(function () {
                Route::get('/', 'index')->name('index');
                Route::post('/', 'store')->name('store');
                Route::get('/create', 'create')->name('create');
            });
            Route::prefix('{zip}')->group(function () {
                Route::get('/', 'edit')->name('edit');
                Route::put('/', 'update')->name('update');
                Route::delete('/', 'destroy')->name('destroy');
            });
        });

    // Method: GET, PUT, POST, DELETE For User
    Route::prefix('users')->name('users.')->group(function () {

        Route::prefix('admins')->name('admin.')
            ->controller(AdminController::class)->group(function () {
                Route::get('/', 'getAllAdmins')->name('getAllAdmins');
                Route::get('/create', 'createAdmin')->name('createAdmin');
                Route::post('/', 'storeAdmin')->name('storeAdmin');
                Route::prefix('{user}')->group(function () {
                    Route::get('/', 'editAdmin')->name('editAdmin');
                    Route::put('/', 'updateAdmin')->name('updateAdmin');
                    Route::delete('/', 'destroyAdmin')->name('destroyAdmin');
                });
            });
        Route::prefix('secretarys')->name('secretary.')
            ->controller(SecretaryController::class)->group(function () {
                Route::get('/', 'getAllSecretarys')->name('getAllSecretarys');
                Route::get('/create', 'createSecretary')->name('createSecretary');
                Route::post('/', 'storeSecretary')->name('storeSecretary');
                Route::prefix('{user}')->group(function () {
                    Route::get('/', 'editSecretary')->name('editSecretary');
                    Route::put('/updateUser', 'update')->name('update');
                    // Route::delete('/', 'destroySecretary')->name('destroySecretary');
                });
            });
        Route::prefix('moniteurs')->name('moniteur.')->group(function () {
            Route::controller(MoniteurController::class)->group(function () {

                Route::get('/', 'getAllMoniteurs')->name('getAllMoniteurs');
                Route::get('/create', 'createMonteur')->name('createMoniteur');
                Route::post('/', 'storeMonteur')->name('storeMoniteur');
                Route::prefix('{moniteur}')->group(function () {
                    Route::get('/edit', 'editMoniteur')->name('editMoniteur');
                    Route::get('/factures', 'invoices')->name('invoices');
                    Route::put('/', 'updateMoniteur')->name('updateMoniteur');
                    Route::delete('/', 'destroyMoniteur')->name('destroyMoniteur');
                });
            });
            Route::prefix('{moniteur}')->controller(FicheMoniteurController::class)->group(function () {
                Route::get('/documents', 'documents')->name('documents');
                Route::put('/documents', 'documentsUpdate')->name('documents.update');

                Route::get('/coordonnees-bancaire', 'coordonneesBancaire')->name('coordonneesBancaire');
                Route::post('/coordonnees-bancaire', 'coordonneesBancaireSave')->name('coordonneesBancaireSave');
            });
        });
        Route::prefix('eleves')->name('eleve.')->group(function () {
            Route::controller(EleveController::class)->group(function () {
                Route::get('/', 'getAllEleves')->name('getAllEleves');
                Route::get('/create', 'createEleve')->name('createEleve');
                Route::post('/', 'storeEleve')->name('storeEleve');
                Route::prefix('{eleve}')->group(function () {
                    Route::get('/info', 'editEleve')->name('editEleve');
                    Route::get('/zones', 'getSoldAndZones')->name('getSoldAndZones');
                    Route::get('/general', 'getGeneraleInfo')->name('getGeneraleInfo');
                    Route::get('/livret', 'getEleveLivret')->name('getEleveLivret');
                    Route::get('/cpf', 'getCpf')->name('getCpf');
                    Route::put('/', 'updateEleve')->name('updateEleve');
                    Route::post('/', 'archiveEleve')->name('archiveEleve');
                });
            });
        });
    });

    // Exams Controllers Routes
    Route::prefix('exams')->name('exams.')->group(function () {

        Route::prefix('waiting-list')->name('waiting-list.')
            ->controller(ExamWaitingListController::class)->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/{examenEleve}', 'edit')->name('edit');
                Route::post('/{examenEleve}', 'update')->name('update');
            });

        Route::prefix('pre-list')->name('pre-list.')
            ->controller(ExamPreListController::class)->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/{examenEleve}', 'edit')->name('edit');
                Route::post('/{examenEleve}', 'update')->name('update');
                Route::post('/declare/{examenEleve}', 'storeDeclareExamen')->name('declare');
            });
        Route::prefix('passage')->name('passage.')
            ->controller(ExamPassageController::class)->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/{examenEleve}', 'edit')->name('edit');
                Route::post('/{examenEleve}', 'update')->name('update');
            });
        Route::prefix('archived')->name('archived.')
            ->controller(ExamArchivedController::class)->group(function () {
                Route::get('/', 'index')->name('index');
                Route::post('/{examenEleve}', 'update')->name('update');
            });
    });

    // Method: GET, PUT, POST, DELETE For Cart
    Route::prefix('carts')->name('carts.')
        ->controller(CartController::class)->group(function () {
            Route::put('/{cart}/update-reminder', 'updateReminder')->name('updateReminder'); // ✅ L'ID du panier est requis
            Route::get('/', 'index')->name('index');
            Route::prefix('{cart}')->group(function () {
                Route::get('/', 'show')->name('show');
                Route::delete('/', 'destroy')->name('destroy');
            });
            Route::prefix('item/{cartItem}')->group(function () {
                Route::delete('/', 'destroyItem')->name('destroy.item');
            });
        });

    // Method: GET, PUT, POST, DELETE For Order
    Route::prefix('orders')->name('orders.')
        ->controller(OrderController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('/create', 'create')->name('create');
            Route::post('storeOrder', 'store')->name('store');
            Route::prefix('{order}')->group(function () {
                Route::get('/', 'show')->name('show');
                Route::get('/edit', 'edit')->name('edit'); // Route pour afficher le formulaire d'édition
                Route::put('/update', 'update')->name('update'); // Route pour enregistrer les modifications
            });
        });


    Route::name('annulation-tardive.')->prefix('annulation-tardive')
        ->controller(AnnulationTardiveController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::prefix('{annulationTardive}')->group(function () {
                Route::put('/', 'update')->name('update');
            });
        });

    Route::prefix('plannings')->name('plannings.')
        ->controller(PlanningController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::post('/', 'store')->name('store');
            Route::get('/create', 'create')->name('create');
            Route::get('/plannings/{id}', 'show')->name('show');
            Route::prefix('{planning}')->group(function () {
                Route::get('/', 'edit')->name('edit');
                Route::put('/', 'update')->name('update');
                Route::delete('/', 'destroy')->name('destroy');
            });
        });

    Route::prefix('livret-apprentissage')->name('livret-apprentissage.')->group(function () {
        Route::prefix('groups')->name('groups.')
            ->controller(GroupSkillsController::class)->group(function () {
                Route::get('/', 'index')->name('index');
                Route::post('/', 'store')->name('store');
                // Route::get('/create', 'create')->name('create');
                Route::prefix('{skillGroup}')->group(function () {
                    // Route::get('/', 'edit')->name('edit');
                    Route::put('/', 'update')->name('update');
                    Route::delete('/', 'destroy')->name('destroy');
                });
            });

        Route::prefix('skills')->name('skills.')
            ->controller(SkillsController::class)->group(function () {
                Route::prefix('{skillGroup}')->group(function () {
                    Route::get('/', 'index')->name('index');
                    Route::post('/', 'store')->name('store');
                    Route::get('/create', 'create')->name('create');
                });
                Route::prefix('{skill}')->group(function () {
                    Route::get('/', 'edit')->name('edit');
                    Route::put('/', 'update')->name('update');
                    Route::delete('/', 'destroy')->name('destroy');
                });
            });
    });
    Route::prefix('proposition-session')->name('proposition-session.')
        ->controller(PropositionSessionController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::prefix('{propositionSession}')->group(function () {
                Route::post('/', 'update')->name('update');
            });
        });

    Route::prefix('invoices')->name('invoices.')
        ->controller(FactureMoniteurController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('/admin', 'factureAdmin')->name('admin');
            Route::post('/factures/telecharger', [FactureMoniteurController::class, 'downloadInvoice'])->name('downloadInvoice');
            Route::put('/payment', [FactureMoniteurController::class, 'updateOrCreatePaymentDate'])->name('updateOrCreatePaymentDate');
            Route::prefix('{factureMoniteur}')->group(function () {
                Route::get('/', 'view')->name('view');
                Route::put('/', 'update')->name('update');
            });
        });
    Route::prefix('pages')->name('pages.')->controller(PagesController::class)
        ->group(function () {
            Route::get('/dashboard', 'dashboard')->name('dashboard'); // 👈 Ajout de cette ligne

            Route::prefix('promo')->name('promo.')
                ->group(function () {
                    Route::get('/', 'index')->name('index');
                    Route::get('/create', 'create')->name('create');
                    Route::post('/', 'store')->name('store');
                    Route::prefix('{page}')->group(function () {
                        Route::get('/', 'edit')->name('edit');
                        Route::post('/', 'update')->name('update');
                        Route::delete('/', 'delete')->name('delete');
                    });
                });
            Route::prefix('home')->name('home.')
                ->group(function () {
                    Route::get('/', 'homeCustomize')->name('index');
                    Route::prefix('{page}')->group(function () {
                        Route::post('/', 'update')->name('update');
                    });
                });
        });

    Route::prefix('contact')->name('contact.')
        ->controller(ContactAdminController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::prefix('{contactAdmin}')->group(function () {
                Route::put('/', 'update')->name('update');
            });
        });
    // Thèmes
    Route::get('themes', [ThemeController::class, 'index'])->name('themes.index');
    Route::get('themes/create', [ThemeController::class, 'create'])->name('themes.create');
    Route::post('themes', [ThemeController::class, 'store'])->name('themes.store');
    Route::put('themes/{theme}/toggle', [ThemeController::class, 'toggle'])->name('themes.toggle');
    Route::get('themes/{theme}/edit', [ThemeController::class, 'edit'])->name('themes.edit');
    Route::put('themes/{theme}', [ThemeController::class, 'update'])->name('themes.update');
    Route::get('questions', [QuestionController::class, 'index'])->name('questions.index');
    Route::get('questions/create', [QuestionController::class, 'create'])->name('questions.create');
    Route::post('questions/store', [QuestionController::class, 'store'])->name('questions.store');
    Route::get('questions/{question}/edit', [QuestionController::class, 'edit'])->name('questions.edit');
    Route::put('questions/{question}', [QuestionController::class, 'update'])->name('questions.update');
    Route::prefix('rdvExamen')->name('rdvExamen.')
        ->controller(RdvExamenController::class)->group(function () {
            Route::get('/list/rdv', 'index')->name('list');
        });
    // Questions

    // Séries
    Route::get('series', [SerieController::class, 'index'])->name('series.index');
    Route::post('sessions/commentaire', [CommentaireSessionController::class, 'updateCommentaire'])->name('session.updateCommentaire');
});
