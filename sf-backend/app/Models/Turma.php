<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Turma extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'type', 'code'];

    public function alunos()
    {
        return $this->belongsToMany(Aluno::class, 'matriculas');
    }
    
    public function tipo()
    {
        return $this->belongsTo(Tipo::class);
    }
}