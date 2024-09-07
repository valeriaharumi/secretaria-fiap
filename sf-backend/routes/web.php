<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AlunoController;
use App\Http\Controllers\TurmaController;
use App\Http\Controllers\MatriculaController;

Route::post('login', [AuthController::class, 'login']);

// Route::middleware('auth:sanctum')->group(function () {
    Route::get('alunos', [AlunoController::class, 'index']);
    Route::post('alunos', [AlunoController::class, 'create']);
    Route::get('alunos/{id}', [AlunoController::class, 'findOne']);
    Route::put('alunos/{id}', [AlunoController::class, 'update']);
    Route::delete('alunos/{id}', [AlunoController::class, 'delete']);

    Route::get('turmas', [TurmaController::class, 'index']);
    Route::post('turmas', [TurmaController::class, 'create']);
    Route::get('turmas/{id}', [TurmaController::class, 'findOne']);
    Route::put('turmas/{id}', [TurmaController::class, 'update']);
    Route::delete('turmas/{id}', [TurmaController::class, 'delete']);

    Route::post('matriculas', [MatriculaController::class, 'create']);
    Route::get('matriculas', [MatriculaController::class, 'index']);
// });
