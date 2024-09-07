<?php

namespace App\Http\Controllers;

use App\Models\Matricula;
use Illuminate\Http\Request;

class MatriculaController extends Controller
{

    public function create(Request $request)
    {
        $request->validate([
            'aluno_id' => 'required|exists:alunos,id',
            'turma_id' => 'required|exists:turmas,id',
        ]);

        $exists = Matricula::where('aluno_id', $request->aluno_id)
            ->where('turma_id', $request->turma_id)
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'O aluno já está matriculado nessa turma'], 400);
        }

        Matricula::create($request->all());

        return response()->json(['message' => 'Matrícula criada com sucesso'], 201);
    }

    public function index(Request $request)
    {
        $limit = 5;
    $page = $request->input('page', 1);

    $query = Matricula::with('aluno', 'turma');

    if ($request->has('turma_id')) {
        $query->where('turma_id', $request->turma_id);
    }

    $matriculas = $query->orderBy('created_at', 'desc')
        ->paginate($limit, ['*'], 'page', $page);

    return response()->json([
        'data' => $matriculas->items(),
        'total' => $matriculas->total(),
        'current_page' => $matriculas->currentPage(),
        'total_pages' => $matriculas->lastPage(),
    ]);
    }
}
