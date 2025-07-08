<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{

public function boot(): void
{
    $this->routes(function () {
        Route::middleware('web')
            ->group(base_path('routes/front/web.php'));
            
        // TON fichier personnalisé
        Route::middleware('web')
            ->group(base_path('routes/parent/web.php'));
        Route::middleware('web')
            ->group(base_path('routes/parent/api.php'));
    });
}

}