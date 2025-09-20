<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NivelController;
use App\Http\Controllers\DesenvolvedorController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/niveis', [NivelController::class, 'novoNivel']);
Route::get('/niveis', [NivelController::class, 'buscaNiveis']); 
Route::get('/niveis/{id}', [NivelController::class, 'buscaNivePorID']);
Route::put('/niveis/{id}', [NivelController::class, 'alterarNivel']);
Route::delete('/niveis/{id}', [NivelController::class, 'excluirNivel']);

Route::post('/desenvolvedores', [DesenvolvedorController::class, 'novoDesenvolvedor']);
Route::get('/desenvolvedores', [DesenvolvedorController::class, 'listarDesenvolvedores']);
Route::get('/desenvolvedores/{id}', [DesenvolvedorController::class, 'buscaDesenvolvedor']);
Route::put('/desenvolvedores/{id}', [DesenvolvedorController::class, 'atualizaDesenvolvedor']);
Route::delete('/desenvolvedores/{id}', [DesenvolvedorController::class, 'excluirDesenvolvedor']);