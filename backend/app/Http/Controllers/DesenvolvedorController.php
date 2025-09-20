<?php

namespace App\Http\Controllers;
use App\Models\Desenvolvedor;
use App\Models\Nivel;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class DesenvolvedorController extends Controller
{
    
    public function novoDesenvolvedor(Request $request){

        try{

            $this->validacaoCampos($request);
            $desenvolvedor = Desenvolvedor::create([
                'nome'            => $request->nome,
                'sexo'            => $request->sexo,
                'data_nascimento' => $request->data_nascimento,
                'hobby'           => $request->hobby,
                'nivel_id'        => $request->nivel_id 
            ]);

            return $this->buscaDesenvolvedor($desenvolvedor->id);

        }catch(ValidationException $e){
            return response()->json(['erros' => $e->errors()], 400);
        }

    }

    public function listarDesenvolvedores(){

        $desenvolvedores = Desenvolvedor::with('nivel')->paginate(10);

        if(count($desenvolvedores) == 0){
            return response()->json(['erro' => 'Nenhum desenvolvedor cadastrado'], 402);
        }

        return response()->json([
            'data' => $desenvolvedores->items(),
            'meta' => [
                'total' => $desenvolvedores->total(),
                'per_page' => 10,
                'current_page' => $desenvolvedores->currentPage(),
                'last_page' => $desenvolvedores->lastPage()
            ]
        ],200);

    }

    public function buscaDesenvolvedor($id){

        $desenvolvedor = Desenvolvedor::with('nivel')->find($id);

        if(!$desenvolvedor){
            return response()->json(['erro' => 'Desenvolvedor não cadastrado com o ID informado'], 400);
        }

        return response()->json($desenvolvedor,200);

    }

    public function atualizaDesenvolvedor(Request $request, $id) {

        try {

            $this->validacaoCampos($request);
            $desenvolvedor = Desenvolvedor::find($id);

            if(!$desenvolvedor){
                return response()->json(['erro' => 'Nenhum desenvolvedor cadastrado com o código informado'], 402);
            }

            $desenvolvedor->nome            = $request->nome;
            $desenvolvedor->sexo            = $request->sexo;
            $desenvolvedor->data_nascimento = $request->data_nascimento;
            $desenvolvedor->hobby           = $request->hobby;
            $desenvolvedor->nivel_id        = $request->nivel_id;

            $desenvolvedor->save();

            return $this->buscaDesenvolvedor($id);

        }catch(ValidationException $e){
            return response()->json(['erros' => $e->errors()], 400);
        }

    }

    public function excluirDesenvolvedor($id){

        $desenvolvedor = Desenvolvedor::find($id);

        if(!$desenvolvedor){
            return response()->json(['erro' => 'Nenhum desenvolvedor cadastrado com o código informado'], 400);
        }

        $desenvolvedor->delete();
        return response()->noContent();

    }

    public function validacaoCampos($campos){

        return $campos->validate(
            [
                'nome'            => 'required|string',
                'sexo'            => 'required|string|in:M,F',
                'data_nascimento' => 'required|date',
                'hobby'           => 'nullable|string',
                'nivel_id'        => 'required|exists:nivel,id',
            ],
            [
                'nome.required'            => 'O campo nome é obrigatório.',
                'nome.string'              => 'O campo nome deve ser um texto.',
                'sexo.required'            => 'O campo sexo é obrigatório.',
                'sexo.in'                  => 'O campo sexo deve ser "M" ou "F".',
                'sexo.string'              => 'O campo sexo deve ser um texto.',
                'data_nascimento.required' => 'O campo data de nascimento é obrigatório.',
                'data_nascimento.date'     => 'O campo data de nascimento deve ser uma data válida.',
                'hobby.string'             => 'O campo hobby deve ser um texto.',
                'nivel_id.required'        => 'O campo nível é obrigatório.',
                'nivel_id.exists'          => 'O nível selecionado não existe.',
            ]
        );

    }

}
