<?php

namespace App\Actions\Parent;

use App\Models\User;
use App\Models\ParentModel;

class CreateParent
{
    public static function execute(array $data): ParentModel
    {
        $user = User::create([
            'first_name' => $data['first_name'],
            'last_name'  => $data['last_name'],
            'email'      => strtolower($data['email']),
            'password'   => bcrypt($data['password']),
        ]);

        $user->assignRole('parent');

        return ParentModel::create(['user_id' => $user->id]);
    }
}
