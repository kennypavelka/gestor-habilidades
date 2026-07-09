import { useState } from "react";
import estilos from "./ModalNovaHabilidade.module.css";

function ModalNovaHabilidade({ habilidadeEmEdicao, aoFechar, aoSalvar }) {
    const [nomeHabilidade, setNomeHabilidade] = useState(
        habilidadeEmEdicao?.habilidade ?? ""
    );

    const estaEditando = Boolean(habilidadeEmEdicao);

    function lidarComSubmit(evento) {
        evento.preventDefault();
        if (!nomeHabilidade.trim()) return;
        aoSalvar(nomeHabilidade.trim());
    }

    return (
        <div className={estilos.overlay}>
            <div className={estilos.modal}>
                <h2 className={estilos.titulo}>
                    {estaEditando ? "EDITAR HABILIDADE" : "NOVA HABILIDADE"}
                </h2>

                <form onSubmit={lidarComSubmit}>
                    <input
                        type="text"
                        className={estilos.campo}
                        placeholder="Digite uma nova Habilidade"
                        value={nomeHabilidade}
                        onChange={(evento) => setNomeHabilidade(evento.target.value)}
                        autoFocus
                    />

                    <div className={estilos.acoes}>
                        <button
                            type="button"
                            className={estilos.botaoCancelar}
                            onClick={aoFechar}
                        >
                            CANCEL
                        </button>
                        <button type="submit" className={estilos.botaoSalvar}>
                            APPLY
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalNovaHabilidade;