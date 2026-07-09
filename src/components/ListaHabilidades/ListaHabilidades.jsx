import HabilidadeCard from "../HabilidadeCard/HabilidadeCard";
import ilustracaoVazio from "../../assets/adicionar-habilidades.png";
import estilos from "./ListaHabilidades.module.css";

function ListaHabilidades({
                              habilidades,
                              totalHabilidades,
                              carregando,
                              aoAlternarStatus,
                              aoEditarHabilidade,
                              aoExcluirHabilidade,
                          }) {
    if (carregando) {
        return <p className={estilos.mensagem}>Carregando habilidades...</p>;
    }

    if (totalHabilidades === 0) {
        return (
            <div className={estilos.vazio}>
                <img
                    src={ilustracaoVazio}
                    alt="Adicione novas habilidades"
                    className={estilos.ilustracao}
                />
            </div>
        );
    }

    if (habilidades.length === 0) {
        return (
            <p className={estilos.mensagem}>Nenhuma habilidade encontrada.</p>
        );
    }

    return (
        <div className={estilos.lista}>
            {habilidades.map((habilidade) => (
                <HabilidadeCard
                    key={habilidade.id}
                    habilidade={habilidade}
                    aoAlternarStatus={aoAlternarStatus}
                    aoEditar={aoEditarHabilidade}
                    aoExcluir={aoExcluirHabilidade}
                />
            ))}
        </div>
    );
}

export default ListaHabilidades;