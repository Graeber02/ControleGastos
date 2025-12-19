import api from "../api/api";
import type { Pessoa } from "../models/pessoas";

export const pessoaService = {
  listar: async (): Promise<Pessoa[]> => {
    const response = await api.get("/Pessoas/Listar");
    return response.data;
  },

  criar: async (nome: string, idade: number): Promise<Pessoa> => {
    const response = await api.post("/Pessoas/Incluir", {
      nome,
      idade,
    });
    return response.data;
  },

  deletar: async (id: number): Promise<void> => {
    await api.delete(`/Pessoas/Delete/${id}`);
  }
};