import estilos from "./HabilidadeCard.module.css";

function HabilidadeCard({ habilidade, aoAlternarStatus, aoEditar, aoExcluir }) {
    return (
        <div className={estilos.linha}>
      <span
          className={`${estilos.marcaConcluida} ${
              habilidade.status ? estilos.marcaVisivel : ""
          }`}
      >
        ✓
      </span>

            <button
                type="button"
                className={`${estilos.checkbox} ${
                    habilidade.status ? estilos.checkboxMarcado : ""
                }`}
                onClick={() => aoAlternarStatus(habilidade.id, !habilidade.status)}
                aria-label="Marcar habilidade como aprendida"
            />

            <span
                className={`${estilos.nome} ${
                    habilidade.status ? estilos.nomeConcluido : ""
                }`}
            >
        {habilidade.habilidade}
      </span>

            <button
                className={estilos.botaoAcao}
                onClick={() => aoEditar(habilidade)}
                aria-label="Editar habilidade"
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                </svg>
            </button>

            <button
                className={estilos.botaoAcao}
                onClick={() => aoExcluir(habilidade.id)}
                aria-label="Excluir habilidade"
            >
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
            </button>
        </div>
    );
}

export default HabilidadeCard;