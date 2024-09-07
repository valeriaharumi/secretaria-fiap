<?php

namespace App\Http\Controllers;

use App\Models\Aluno;
use Illuminate\Http\Request;

class AlunoController extends Controller
{
    public function index(Request $request)
    {
        $limit  = 5;
        $page = $request->input('page', 1);

        $alunos = Aluno::orderBy('name', 'asc')->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $alunos->items(),
            'total' => $alunos->total(),
            'current_page' => $alunos->currentPage(),
            'total_pages' => $alunos->lastPage(),
        ]);
    }

    public function create(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:3',
            'birth_date' => 'required|date',
        ]);

        $usuario = $this->generateUniqueUsername();

        $aluno = Aluno::create([
            'name' => $validated['name'],
            'birth_date' => $validated['birth_date'],
            'username' => $usuario
        ]);

        return response()->json($aluno, 201);
    }

    public function findOne($id)
    {
        $aluno = Aluno::findOrFail($id);
        return response()->json($aluno);
    }

    public function update(Request $request, $id)
    {
        $aluno = Aluno::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|min:3',
            'birth_date' => 'required|date',
        ]);

        $aluno->update($validated);

        return response()->json($aluno);
    }

    public function delete($id)
    {
        $aluno = Aluno::findOrFail($id);
        $aluno->delete();

        return response()->json(['message' => 'Aluno excluído com sucesso']);
    }

    private function generateUniqueUsername()
    {
        do {
            $usuario = str_pad(mt_rand(0, 9999), 4, '0', STR_PAD_LEFT);
        } while (Aluno::where('username', $usuario)->exists());

        return $usuario;
    }
}
