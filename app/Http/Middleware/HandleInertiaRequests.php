<?php
namespace App\Http\Middleware;

use Inertia\Middleware;
use Illuminate\Http\Request;

class HandleInertiaRequests extends Middleware
{
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'errors' => fn () => $request->session()->get('errors') 
                ? $request->session()->get('errors')->getBag('default')->getMessages()
                : [],
        ]);
    }
}
