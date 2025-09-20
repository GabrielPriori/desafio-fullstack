import { useEffect, useState } from 'react';
import api from '../service/api_backend';
import { Link, useNavigate } from 'react-router-dom';

interface Nivel {
  id: number;
  nivel: string;
}

interface Desenvolvedores {
    id: number;
    nome: string;
    sexo: string;
    data_nascimento: string;
    hobby: string;
    idade: number;
    nivel: Nivel;
}

interface responseDesenvolvedores {
    data: Desenvolvedores[];
}

function Desenvolvedores() {

    const [desenvolvedores, setDesenvolvedores] = useState<Desenvolvedores[]>([]);
    const [pagina, setPagina] = useState(1);
    const navigate = useNavigate();
    const [alerta, setAlerta] = useState<{ tipo: "success" | "danger"; mensagem: string } | null>(null);

    useEffect(() => {
        const buscaDesenvolvedores = async() => {
            const response = await api.get<responseDesenvolvedores>('desenvolvedores',{params: {'page': pagina}});
            setDesenvolvedores(response.data.data);
        } 
        buscaDesenvolvedores();
    }, [pagina]);

    const deletarDesenvolvedor = async(id: number, desenvolvedor: string) => {
        if (!desenvolvedores){
            return;
        } 

        const confirmado = window.confirm("Tem certeza que deseja deletar este desenvolvedor?");
        if (!confirmado) return;

        try{
            await api.delete(`desenvolvedores/${id}`);
            setDesenvolvedores(desenvolvedores => desenvolvedores.filter(n => n.id !== id));
            setAlerta({ tipo: "success", mensagem: `Desenvolvedor "${desenvolvedor}" deletado com sucesso!` });
        }catch(error){
            setAlerta({ tipo: "danger", mensagem: "Erro ao deletar o desenvolvedor." });
        }
    };

  return (
    <div className="container text-center mt-5">
        <h1 className="mb-4">Desenvolvedores</h1>

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

        <div className="d-flex">
            <Link to="/desenvolvedores/novo" className="btn btn-info mb-2 ms-auto">
                Novo +
            </Link>
        </div>
        <table className="table table-bordered table-striped mx-auto" style={{ width: "50%" }}>
            <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Desenvolvedor</th>
                    <th>Sexo</th>
                    <th>Data de Nascimento</th>
                    <th>Idade</th>
                    <th>Hobby</th>
                    <th>Nivel</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {desenvolvedores.map((desenvolvedor) => (
                    <tr key={desenvolvedor.id}>
                        <td>{desenvolvedor.id}</td>
                        <td>{desenvolvedor.nome}</td>
                        <td>{desenvolvedor.sexo == "M" ? "Masculino" : "Feminino"}</td>
                        <td>{desenvolvedor.data_nascimento}</td>
                        <td>{desenvolvedor.idade}</td>
                        <td>{desenvolvedor.hobby}</td>
                        <td>{desenvolvedor.nivel?.nivel}</td>
                        <td className="d-flex gap-2">
                            <button type="button" className="btn btn-primary" onClick={() => navigate(`/desenvolvedores/editar/${desenvolvedor.id}`)}>
                                Editar
                            </button>
                            <button onClick={() => deletarDesenvolvedor(desenvolvedor.id, desenvolvedor.nome)} type="button" className="btn ms-1 btn-danger">Excluir</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button onClick={() => setPagina(pagina - 1)} disabled={pagina === 1}>
            Anterior
        </button>
        <button className="ms-1 mb-auto" onClick={() => setPagina(pagina + 1)}>
            Próxima
        </button>
    </div>
    
  );
}

export default Desenvolvedores;
