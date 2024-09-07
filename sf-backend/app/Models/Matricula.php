<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matricula extends Model
{
    use HasFactory;

    protected $fillable = ['registro_matricula', 'aluno_id', 'turma_id'];

    public function aluno()
    {
        return $this->belongsTo(Aluno::class);
    }

    public function turma()
    {
        return $this->belongsTo(Turma::class);
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($matricula) {
            $aluno = Aluno::find($matricula->aluno_id);
            $turma = Turma::find($matricula->turma_id);

            $matricula->registro_matricula = 'RM' . str_pad($turma->code, 2, '0', STR_PAD_LEFT) . str_pad($aluno->username, 4, '0', STR_PAD_LEFT);
        });
    }
}
