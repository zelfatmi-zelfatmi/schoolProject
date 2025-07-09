<?php
namespace App\Http\Controllers\Backend\Auth;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\User\LoginRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
class LoginController extends Controller
{
    public function create(): Response
    {
      return Inertia::render('Login');
    }

    public function store(LoginRequest $request): JsonResponse
    {
        if (Auth::attempt($request->only('email', 'password'))) {
            $request->session()->regenerate();
            return response()->json(['message' => 'Success']);
        }
        throw ValidationException::withMessages([
            'email' => ['les informations de connexion sont incorrectes']]);
    }
    public function logout(Request $request)
   {
    Auth::logout(); // Déconnecte l'utilisateur
    $request->session()->invalidate(); // Invalide la session
    $request->session()->regenerateToken(); // Regénère le token CSRF pour plus de sécurité

    return response()->json(['message' => 'Déconnexion réussie']);
  }

}
