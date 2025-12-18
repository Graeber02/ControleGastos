export const Categoria = {
  Despesa: 1,
  Receita: 2,
  Ambas: 3,
} as const;

export type CategoriaId = typeof Categoria[keyof typeof Categoria];