import { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import api from '../service/api_backend';

interface Nivel {
    id: number;
    nivel: string;
}

interface responseNiveis {
    data: Nivel[];
}

function Niveis() {

    const [niveis, setNiveis] = useState<Nivel[]>([]);
    const [pagina, setPagina] = useState(1);
    const navigate = useNavigate();
    const [alerta, setAlerta] = useState<{ tipo: "success" | "danger"; mensagem: string } | null>(null);

    useEffect(() => {
        const buscaNiveis = async () => {
            const response = await api.get<responseNiveis>('niveis',{params: {'page': pagina}});
            setNiveis(response.data.data);
        }
        buscaNiveis();
    }, [pagina]);

    const deletarNivel = async(id: number, nivel: string) => {
        if (!niveis){
            return;
        } 

        const confirmado = window.confirm("Tem certeza que deseja deletar este nível?");
        if (!confirmado) return;

        try{
            await api.delete(`niveis/${id}`);
            setNiveis(niveis => niveis.filter(n => n.id !== id));
            setAlerta({ tipo: "success", mensagem: `Nível "${nivel}" deletado com sucesso!` });
        }catch(error){
            setAlerta({ tipo: "danger", mensagem: "Erro ao deletar o nível." });
        }
    };

    return (
    <div className="container text-center mt-4">
        <h1 className="mb-4">Niveis</h1>

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
            <Link to="/nivel/novo" className="btn btn-info mb-2 ms-auto">
                Novo +
            </Link>
        </div>
        <table className="table table-bordered table-striped mx-auto" style={{ width: "50%" }}>
            <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Nível</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {niveis.map((nivel) => (
                    <tr key={nivel.id}>
                    <td>{nivel.id}</td>
                    <td>{nivel.nivel}</td>
                    <td>
                        <button type="button" className="btn btn-primary" onClick={() => navigate(`/nivel/editar/${nivel.id}`)}>
                            Editar
                        </button>
                        <button onClick={() => deletarNivel(nivel.id, nivel.nivel)} type="button" className="btn ms-1 btn-danger">Excluir</button>
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

export default Niveis;
