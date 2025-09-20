import { useEffect, useState } from 'react';
import api from '../service/api_backend';

function NivelNovo() {

    const [tituloNivel, setTituloNivel] = useState(""); 
    const [alerta, setAlerta] = useState<{ tipo: "success" | "danger"; mensagem: string } | null>(null);

    useEffect(() => {
        if (alerta) {
            const timer = setTimeout(() => setAlerta(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [alerta]);

    const novoNivel = async() => {
        if (!tituloNivel){
            return;
        } 
        try{
            await api.post('niveis', { nivel: tituloNivel });
            setAlerta({ tipo: "success", mensagem: `Nível "${tituloNivel}" cadastrado com sucesso!` });
        }catch(error){
            setAlerta({ tipo: "danger", mensagem: "Erro ao cadastrado o nível." });
        }
    };

    return (
    <div className="container text-center mt-5">
        <h1 className="mb-4">Novo Nivel</h1>
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
                <label className="visually-hidden">Nivel</label>
                <input onChange={(e) => setTituloNivel(e.target.value)} value={tituloNivel} className="form-control" id="nivel"/>    
            </div>
            <div className="col-auto">
                <button onClick={novoNivel} type="button" className="btn btn-primary ms-1">Cadastrar</button>
            </div>
        </form>
    </div>
    );
}

export default NivelNovo;
