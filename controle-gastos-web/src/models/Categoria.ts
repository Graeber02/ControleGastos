export interface Categoria {
  id: number;
  descricao: string;
  finalidade: number; // 1, 2, 3 (Despesa, Receita, Ambas)
}