import axios from "axios";

const api = axios.create({
    baseURL: "https://6738a9b34eb22e24fca89864.mockapi.io/api",
});

export async function listarHabilidades() {
    const resposta = await api.get("/habilidades");
    return resposta.data;
}

export async function cadastrarHabilidade(novaHabilidade) {
    const resposta = await api.post("/habilidades", novaHabilidade);
    return resposta.data;
}

export async function excluirHabilidade(id) {
    await api.delete(`/habilidades/${id}`);
}

export async function atualizarStatusHabilidade(id, novoStatus) {
    const resposta = await api.put(`/habilidades/${id}`, { status: novoStatus });
    return resposta.data;
}

export async function atualizarNomeHabilidade(id, novoNome) {
    const resposta = await api.put(`/habilidades/${id}`, { habilidade: novoNome });
    return resposta.data;
}