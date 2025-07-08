<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
     public function boot(): void
   {


    Route::middleware('web')
        ->group(base_path('routes/front/web.php'));
         Route::middleware('web')
            ->prefix('parent')
            ->group(base_path('routes/parent/web.php'));
    }

}
