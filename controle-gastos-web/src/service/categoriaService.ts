import api from "../api/api";
import type { Categoria } from "../models/Categoria";

export const categoriaService = {
  listar: async (): Promise<Categoria[]> => {
    const response = await api.get("/Categorias/Listar");
    return response.data;
  },

  criar: async (descricao: string, finalidade: number): Promise<Categoria> => {
    const response = await api.post("/Categorias/Incluir", { descricao, finalidade });
    return response.data;
  },

  editar: async (id: number, descricao: string, finalidade: number): Promise<Categoria> => {
    const response = await api.put(`/Categorias/Editar/${id}`, { descricao, finalidade });
    return response.data;
  }
};