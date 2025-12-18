import api from "../api/api";
import type { Transacao } from "../models/Transacao";

export const transacaoService = {
  listar: async (): Promise<Transacao[]> => {
    const response = await api.get("/Transacoes/Listar");
    return response.data;
  },

  criar: async (data: Omit<Transacao, "id">): Promise<Transacao> => {
    const response = await api.post("/Transacoes/Incluir", data);
    return response.data;
  }
};