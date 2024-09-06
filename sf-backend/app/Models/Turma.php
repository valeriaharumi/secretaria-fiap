<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Turma extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'type'];

    public function alunos()
    {
        return $this->belongsToMany(Aluno::class, 'matriculas');
    }
}
