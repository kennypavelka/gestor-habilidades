import { useEffect, useState } from "react";
import BarraPesquisa from "../../components/BarraPesquisa/BarraPesquisa";
import ListaHabilidades from "../../components/ListaHabilidades/ListaHabilidades";
import ModalNovaHabilidade from "../../components/ModalNovaHabilidade/ModalNovaHabilidade";
import {
    listarHabilidades,
    cadastrarHabilidade,
    excluirHabilidade,
    atualizarStatusHabilidade,
    atualizarNomeHabilidade,
} from "../../services/habilidadeService";
import estilos from "./PaginaInicial.module.css";

function PaginaInicial() {
    const [habilidades, setHabilidades] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [termoBusca, setTermoBusca] = useState("");
    const [modalAberto, setModalAberto] = useState(false);
    const [habilidadeEmEdicao, setHabilidadeEmEdicao] = useState(null);

    useEffect(() => {
        carregarHabilidades();
    }, []);

    async function carregarHabilidades() {
        try {
            setCarregando(true);
            const dados = await listarHabilidades();
            setHabilidades(dados);
        } catch (erro) {
            console.error("Erro ao carregar habilidades:", erro);
        } finally {
            setCarregando(false);
        }
    }

    function lidarComAbrirModalCriacao() {
        setHabilidadeEmEdicao(null);
        setModalAberto(true);
    }

    function lidarComAbrirModalEdicao(habilidade) {
        setHabilidadeEmEdicao(habilidade);
        setModalAberto(true);
    }

    async function lidarComSalvarModal(nomeHabilidade) {
        if (habilidadeEmEdicao) {
            try {
                await atualizarNomeHabilidade(habilidadeEmEdicao.id, nomeHabilidade);
                setHabilidades((atual) =>
                    atual.map((habilidade) =>
                        habilidade.id === habilidadeEmEdicao.id
                            ? { ...habilidade, habilidade: nomeHabilidade }
                            : habilidade
                    )
                );
                setModalAberto(false);
            } catch (erro) {
                console.error("Erro ao editar habilidade:", erro);
            }
            return;
        }

        try {
            const novaHabilidade = await cadastrarHabilidade({
                habilidade: nomeHabilidade,
                status: false,
            });
            setHabilidades((atual) => [...atual, novaHabilidade]);
            setModalAberto(false);
        } catch (erro) {
            console.error("Erro ao cadastrar habilidade:", erro);
        }
    }

    async function lidarComExcluirHabilidade(id) {
        try {
            await excluirHabilidade(id);
            setHabilidades((atual) => atual.filter((habilidade) => habilidade.id !== id));
        } catch (erro) {
            console.error("Erro ao excluir habilidade:", erro);
        }
    }

    async function lidarComAlternarStatus(id, novoStatus) {
        setHabilidades((atual) =>
            atual.map((habilidade) =>
                habilidade.id === id ? { ...habilidade, status: novoStatus } : habilidade
            )
        );
        try {
            await atualizarStatusHabilidade(id, novoStatus);
        } catch (erro) {
            console.error("Erro ao atualizar status da habilidade:", erro);
            setHabilidades((atual) =>
                atual.map((habilidade) =>
                    habilidade.id === id ? { ...habilidade, status: !novoStatus } : habilidade
                )
            );
        }
    }

    const habilidadesFiltradas = habilidades.filter((habilidade) =>
        habilidade.habilidade.toLowerCase().includes(termoBusca.toLowerCase())
    );

    const totalHabilidades = habilidades.length;
    const totalAprendidas = habilidades.filter((habilidade) => habilidade.status).length;
    const percentualAprendido =
        totalHabilidades > 0
            ? Math.round((totalAprendidas / totalHabilidades) * 100)
            : 0;

    return (
        <div className={estilos.pagina}>
            <div className={estilos.conteudo}>
                <h1 className={estilos.titulo}>Gerenciador de Habilidades</h1>

                {totalHabilidades > 0 && (
                    <p className={estilos.progresso}>
                        {totalAprendidas} de {totalHabilidades} habilidades aprendidas (
                        {percentualAprendido}%)
                    </p>
                )}

                <BarraPesquisa
                    termoBusca={termoBusca}
                    aoAlterarTermoBusca={setTermoBusca}
                />

                <ListaHabilidades
                    habilidades={habilidadesFiltradas}
                    totalHabilidades={totalHabilidades}
                    carregando={carregando}
                    aoAlternarStatus={lidarComAlternarStatus}
                    aoEditarHabilidade={lidarComAbrirModalEdicao}
                    aoExcluirHabilidade={lidarComExcluirHabilidade}
                />

                <div className={estilos.rodape}>
                    <button
                        className={estilos.botaoAdicionar}
                        onClick={lidarComAbrirModalCriacao}
                        aria-label="Adicionar nova habilidade"
                    >
                        +
                    </button>
                </div>
            </div>

            {modalAberto && (
                <ModalNovaHabilidade
                    habilidadeEmEdicao={habilidadeEmEdicao}
                    aoFechar={() => setModalAberto(false)}
                    aoSalvar={lidarComSalvarModal}
                />
            )}
        </div>
    );
}

export default PaginaInicial;