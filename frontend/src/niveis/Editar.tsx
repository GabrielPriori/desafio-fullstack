import { useEffect, useState } from 'react';
import api from '../service/api_backend';
import { useParams } from "react-router-dom";

interface Nivel {
    id: number;
    nivel: string;
}

function NivelEditar() {

    const [nivel, setNivel] = useState<Nivel>();
    const { id } = useParams();
    const [alerta, setAlerta] = useState<{ tipo: "success" | "danger"; mensagem: string } | null>(null);

    useEffect(() => {
        const buscaNivel = async () => {
            const response = await api.get(`niveis/${id}`);
            setNivel(response.data);
        }
        buscaNivel();
    }, [id]);

    useEffect(() => {
        if (alerta) {
            const timer = setTimeout(() => setAlerta(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [alerta]);

    const atualizarNivel = async() => {
        if (!nivel){
            return;
        } 
        try{
            await api.put(`niveis/${id}`, { nivel: nivel.nivel });
            setAlerta({ tipo: "success", mensagem: `Nível "${nivel.nivel}" atualizado com sucesso!` });
        }catch(error){
            setAlerta({ tipo: "danger", mensagem: "Erro ao atualizar o nível." });
        }
    };

    if(!nivel) {
        return <div className="container text-center mt-5"><p>Carregando...</p></div>;
    }

    return (
    <div className="container text-center mt-5">
        <h1 className="mb-4">Editar Nivel</h1>
        {alerta && (
            <div className={`toast align-items-center text-bg-${alerta.tipo} border-0 show position-fixed top-0 end-0 m-3`} role="alert"
                aria-live="assertive" aria-atomic="true" >
                <div className="d-flex">
                    <div className="toast-body">
                        {alerta.mensagem}
                    </div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"
                        onClick={() => setAlerta(null)} >
                    </button>
                </div>
            </div>
        )}
        <form className="d-flex justify-content-center align-items-center">
            <div className="col-auto">
                <label className="visually-hidden">ID - {nivel?.id}</label>
                <input type="text" readOnly className="form-control-plaintext" value={`ID - ${nivel.id}`}/>
            </div>
            <div className="col-auto">
                <label className="visually-hidden">Nivel</label>
                <input className="form-control" id="nivel" value={nivel.nivel} placeholder={nivel.nivel} onChange={(e) => setNivel({ ...nivel, nivel: e.target.value })}/>    
            </div>
            <div className="col-auto">
                <button onClick={atualizarNivel} type="button" className="btn btn-primary ms-1">Salvar</button>
            </div>
        </form>
    </div>
    );
}

export default NivelEditar;
