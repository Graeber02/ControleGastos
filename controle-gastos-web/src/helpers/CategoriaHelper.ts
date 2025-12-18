import type { Categoria } from "../models/Categoria";

export const getCategoriaDescricaoById = (
  categoriaId: number,
  categorias: Categoria[]
): string => {
  const categoria = categorias.find(c => c.id === categoriaId);
  return categoria ? categoria.descricao : "—";
};