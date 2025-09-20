<?php

namespace App\Http\Controllers;
use App\Models\Nivel;
use Illuminate\Http\Request;

class NivelController extends Controller
{
    
    public function novoNivel(Request $request){

        if(empty($request->nivel)){
            return response()->json(['erro' => 'Nível não encontrado ou não informado'], 400);
        }

        $nivel = Nivel::create([
            'nivel' => $request->nivel
        ]);

        return response()->json($nivel, 201);

    }

    public function alterarNivel(Request $request, $id){

        $nivel = Nivel::find($id);

        if(empty($nivel->nivel)){
            return response()->json(['erro' => 'Nível não encontrado com o ID informado'], 400);
        }

        $nivel->nivel = $request->nivel;
        $nivel->save();

        return response()->json($nivel, 200);

    }

    public function buscaNiveis(){

        $niveis = Nivel::paginate(10);

        if(count($niveis) == 0){
            return response()->json(['erro' => 'Nenhum nivel cadastrado'], 402);
        }
        
        return response()->json([
            'data' => $niveis->items(),
            'meta' => [
                'total' => $niveis->total(),
                'per_page' => 10,
                'current_page' => $niveis->currentPage(),
                'last_page' => $niveis->lastPage()
            ]
        ], 200);

    }

    public function buscaNivePorID($id){

        $nivel = Nivel::find($id);

        if(empty($nivel->nivel)){
            return response()->json(['erro' => 'Nenhum nivel cadastrado com o id informado'], 402);
        }
        
        return response()->json($nivel, 200);

    }

    public function excluirNivel($id){

        $nivel = Nivel::find($id);

        if(empty($nivel->nivel)){
            return response()->json(['erro' => 'Nível não cadastrado com o ID informado'], 400);
        }
        
        $nivel->delete();
        return response()->noContent();

    }

}
