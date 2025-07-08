<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Parent\StoreParentRequest;
use App\Actions\Parent\CreateParent;
use App\Models\ParentModel;

class ParentController extends Controller
{
    public function index()
    {
        return response()->json(ParentModel::with('user')->get());
    }

    public function store(StoreParentRequest $request)
    {
        $parent = CreateParent::execute($request->validated());

        return response()->json([
            'message' => 'Parent créé avec succès',
            'data' => $parent->load('user')
        ], 201);
    }
}
