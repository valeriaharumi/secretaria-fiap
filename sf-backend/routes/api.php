<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AlunoController;

Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('alunos', [AlunoController::class, 'index']);
    Route::post('alunos', [AlunoController::class, 'create']);
    Route::get('alunos/{id}', [AlunoController::class, 'findOne']);
    Route::put('alunos/{id}', [AlunoController::class, 'update']);
    Route::delete('alunos/{id}', [AlunoController::class, 'delete']);
});