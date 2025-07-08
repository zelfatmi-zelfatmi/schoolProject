<?php
namespace App\Http\Controllers\Backend;
use Illuminate\Validation\ValidationException;

use App\Http\Controllers\Controller;
use App\Http\Requests\Parent\StoreParentRequest;
use App\Actions\Parent\CreateParent;
use App\Models\ParentModel;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Exception;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\RedirectResponse;
class ParentController extends Controller
{

    public function dashboard()
{
    return Inertia::render('parent/DashboardPage');
}

    public function index()
    {
        $parents = ParentModel::with('user')->paginate(10);
        return view('backend.parents.index', compact('parents'));
    }

    public function create()
    {
        return view('backend.parents.create');
    }
public function store(StoreParentRequest $request)
{
    DB::beginTransaction();

    try {
        Log::info('Début de la création du parent', ['request_data' => $request->all()]);

        // Validation est déjà effectuée par le FormRequest (StoreParentRequest)
        $validatedData = $request->validated();  // Données validées

        // Log avant la création de l'utilisateur
        Log::info('Validation réussie. Création du parent.', ['validated_data' => $validatedData]);

        // Création du parent avec les données validées
        $parent = CreateParent::execute($validatedData);

        // Log après la création
        Log::info('Parent créé avec succès', ['parent_id' => $parent->id]);

        // Commit de la transaction
        DB::commit();

        // Redirection après la création
return redirect()->route('backend.parent.dashboard');

    } catch (Exception $e) {
        // Rollback en cas d'erreur
        DB::rollback();

        // Log de l'erreur
        Log::error('Erreur lors de la création du parent', ['error' => $e->getMessage()]);

        // Flash de l'erreur pour l'utilisateur
        session()->flash('error', 'Une erreur est survenue lors de la création du parent');
        throw $e;  // Relancer l'exception
    }
}


}
