<?php
namespace App\Http\Controllers\Backend\Auth;



use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class RegisterController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Register');
    }
}
