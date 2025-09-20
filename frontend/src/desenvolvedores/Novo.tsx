import { useState } from "react";
import api from '../service/api_backend';

interface Desenvolvedor {
    nome: string;
    hobby: string;
    sexo: string;
    data_nascimento: string;
    nivel_id: number;
}

function NovoDesenvolvedores() {

    const [desenvolvedor, setDesenvolvedor] = useState<Desenvolvedor>({
        nome: "",
        hobby: "",
        sexo: "M",
        data_nascimento: "",
        nivel_id: 0
    });
    const [alerta, setAlerta] = useState<{ tipo: "success" | "danger"; mensagem: string } | null>(null);

    const novoDev = async () => {
        if(!desenvolvedor) return ;

        try{
            await api.post(`desenvolvedores`, desenvolvedor);
            setAlerta({ tipo: "success", mensagem: `Desenvolvedor "${desenvolvedor.nome}" cadastrado com sucesso!` });
        }catch(err){
            setAlerta({ tipo: "danger", mensagem: "Erro ao cadastrado o desenvolvedor." });
        }

    }

    return (
        <div className="container text-center mt-5">
            <h1 className="mb-4">Desenvolvedor Novo</h1>

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
                        <input type="text" className="form-control" placeholder="João" onChange={e => setDesenvolvedor({ ...desenvolvedor, nome: e.target.value })} value={desenvolvedor.nome}/>
                    </div>
                    <div className="col">
                        <label className="form-label">Hobby</label>
                        <input type="text" className="form-control" placeholder="Futebol" onChange={e => setDesenvolvedor({ ...desenvolvedor, hobby: e.target.value })} value={desenvolvedor.hobby}/>
                    </div>
                    <div className="col">
                        <label className="form-label">Sexo</label>
                        <select className="form-control" onChange={e => setDesenvolvedor({ ...desenvolvedor, sexo: e.target.value })} value={desenvolvedor.sexo}>
                            <option value="F">F</option>
                            <option value="M">M</option>
                        </select>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col">
                        <label className="form-label">Data de Nascimento</label>
                        <input type="date" className="form-control" onChange={e => setDesenvolvedor({ ...desenvolvedor, data_nascimento: e.target.value })} value={desenvolvedor.data_nascimento}/>
                    </div>
                    <div className="col">
                        <label className="form-label">Nivel</label>
                        <input type="number" className="form-control" placeholder="0" onChange={e => setDesenvolvedor({ ...desenvolvedor, nivel_id: Number(e.target.value) })} value={desenvolvedor.nivel_id}/>
                    </div>
                </div>
                <div className="col-auto mt-5">
                    <button onClick={novoDev} type="button" className="btn btn-primary ms-1">Salvar</button>
                </div>
            </form>
        </div>
    )

}

export default NovoDesenvolvedores