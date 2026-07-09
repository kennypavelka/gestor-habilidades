import iconeLupa from "../../assets/Vector.png";
import estilos from "./BarraPesquisa.module.css";

function BarraPesquisa({ termoBusca, aoAlterarTermoBusca }) {
    return (
        <div className={estilos.container}>
            <input
                type="text"
                className={estilos.campo}
                placeholder="Procurar Habilidade"
                value={termoBusca}
                onChange={(evento) => aoAlterarTermoBusca(evento.target.value)}
            />
            <img src={iconeLupa} alt="Buscar" className={estilos.icone} />
        </div>
    );
}

export default BarraPesquisa;