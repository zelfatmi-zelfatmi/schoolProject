<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ParentModel extends Model
{
    use HasFactory;

    protected $table = 'parents'; // obligatoire si nom différent du modèle

    protected $fillable = [
        'user_id',
        'profession',
        // ajoute d'autres colonnes ici
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
