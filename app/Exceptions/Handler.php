<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Inertia\Ssr\SsrException;
use Illuminate\Support\Facades\Log;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Custom reporting of exceptions
     */
    public function report(Throwable $exception): void
    {
        // ✅ Si c'est une erreur SSR, on la logue dans un fichier séparé
        if ($exception instanceof SsrException) {
            Log::channel('ssr')->error($exception->getMessage(), [
                'exception' => $exception,
            ]);
            return; // Empêche l’écriture dans laravel.log
        }

        parent::report($exception);
    }
}
