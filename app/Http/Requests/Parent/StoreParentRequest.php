<?php

namespace App\Http\Requests\Parent;

use Illuminate\Foundation\Http\FormRequest;

class StoreParentRequest extends FormRequest
{

public function rules(): array
{
    return [
       'first_name' => 'required|string',
        'last_name' => 'required|string',
        'phone' => 'required|string|min:6',
        'city' => 'required|string',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|min:6|confirmed',
        // 'terms' => 'accepted',
    ];
}

public function messages(): array
{
    return [
        'first_name.required' => 'Le prénom est requis.',
        'last_name.required'  => 'Le nom est requis.',
        'phone.required'      => 'Le téléphone est requis.',
        'city.required'       => 'La ville est requise.',
        'email.required'      => 'L\'email est requis.',
        'email.email'         => 'L\'email doit être valide.',
        'email.unique'        => 'Cet email est déjà utilisé.',
        'password.required'   => 'Le mot de passe est requis.',
        'password.min'        => 'Le mot de passe doit contenir au moins :min caractères.',
        'password.confirmed'  => 'La confirmation du mot de passe ne correspond pas.',
        // 'terms.accepted'      => 'Vous devez accepter les conditions générales.',

    ];
}

    public function authorize(): bool
    {
        return true;
    }
}
