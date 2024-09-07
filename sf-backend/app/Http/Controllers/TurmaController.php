<?php

namespace App\Http\Controllers;

use App\Models\Turma;
use Illuminate\Http\Request;

class TurmaController extends Controller
{
    public function index(Request $request)
    {
        $limit  = 5;
        $page = $request->input('page', 1);

        $turmas = Turma::with('tipo')
            ->orderBy('name', 'asc')
            ->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'data' => $turmas->items(),
            'total' => $turmas->total(),
            'current_page' => $turmas->currentPage(),
            'total_pages' => $turmas->lastPage(),
        ]);
    }

    public function create(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:3',
        ]);

        $code = $this->generateUniqueCode();

        $turma = Turma::create([
            'name' => $validated['name'],
            'description' => $request->input('description'),
            'code' => $code
        ]);

        return response()->json($turma, 201);
    }

    public function findOne($id)
    {
        $turma = Turma::findOrFail($id);
        return response()->json($turma);
    }

    public function update(Request $request, $id)
    {
        $turma = Turma::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|min:3',
        ]);

        $turma->update($validated);

        return response()->json($turma);
    }

    public function delete($id)
    {
        $aluno = Turma::findOrFail($id);
        $aluno->delete();

        return response()->json(['message' => 'Turma excluída com sucesso']);
    }

    private function generateUniqueCode()
    {
        do {
            $turma = str_pad(mt_rand(0, 99), 2, '0', STR_PAD_LEFT);
        } while (Turma::where('code', $turma)->exists());

        return $turma;
    }
}
