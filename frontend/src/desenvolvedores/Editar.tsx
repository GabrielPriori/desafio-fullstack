import { useEffect, useState } from "react";
import api from '../service/api_backend';
import { useParams } from "react-router-dom";

interface Desenvolvedor {
    nome: string;
    hobby: string;
    sexo: string;
    data_nascimento: string;
    nivel_id: number;
}

function EditarDesenvolvedores() {

    const [desenvolvedor, setDesenvolvedor] = useState<Desenvolvedor>();
    const { id } = useParams();
    const [alerta, setAlerta] = useState<{ tipo: "success" | "danger"; mensagem: string } | null>(null);

    useEffect(() => {
        const buscaDev = async () => {
            const response = await api.get(`desenvolvedores/${id}`);
            setDesenvolvedor(response.data);
        }
        buscaDev();
    }, [id]);

    const atualizarDev = async () => {
        if(!desenvolvedor) return ;

        try{
            await api.put(`desenvolvedores/${id}`, desenvolvedor);
            setAlerta({ tipo: "success", mensagem: `Desenvolvedor "${desenvolvedor.nome}" atualizado com sucesso!` });
        }catch(err){
            setAlerta({ tipo: "danger", mensagem: "Erro ao atualizar o desenvolvedor." });
        }

    }

    if(!desenvolvedor) {
        return <div className="container text-center mt-5"><p>Carregando...</p></div>;
    }

    return (
        <div className="container text-center mt-5">
            <h1 className="mb-4">Desenvolvedor Editar</h1>

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

            <form>
                <div className="row">
                    <div className="col">
                        <label className="form-label">Nome</label>
                        <input type="text" className="form-control" value={desenvolvedor.nome} onChange={(e) => setDesenvolvedor({ ...desenvolvedor, nome: e.target.value })}/>
                    </div>
                    <div className="col">
                        <label className="form-label">Hobby</label>
                        <input type="text" className="form-control" value={desenvolvedor.hobby} onChange={(e) => setDesenvolvedor({ ...desenvolvedor, hobby: e.target.value })}/>
                    </div>
                    <div className="col">
                        <label className="form-label">Sexo</label>
                        <select className="form-control" value={desenvolvedor.sexo} onChange={(e) => setDesenvolvedor({ ...desenvolvedor, sexo: e.target.value })}>
                            <option value="F">F</option>
                            <option value="M">M</option>
                        </select>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col">
                        <label className="form-label">Data de Nascimento</label>
                        <input type="date" className="form-control" value={desenvolvedor.data_nascimento} onChange={(e) => setDesenvolvedor({ ...desenvolvedor, data_nascimento: e.target.value })}/>
                    </div>
                    <div className="col">
                        <label className="form-label">Nivel</label>
                        <input type="number" className="form-control" value={desenvolvedor.nivel_id} onChange={(e) => setDesenvolvedor({ ...desenvolvedor, nivel_id: Number(e.target.value) })}/>
                    </div>
                </div>
                <div className="col-auto mt-5">
                    <button onClick={atualizarDev} type="button" className="btn btn-primary ms-1">Salvar</button>
                </div>
            </form>
        </div>
    )

}

export default EditarDesenvolvedores