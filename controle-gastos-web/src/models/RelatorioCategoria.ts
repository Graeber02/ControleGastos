export interface RelatorioCategoriaItem {
  categoriaId: number;
  categoria: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface RelatorioCategoria {
  categorias: RelatorioCategoriaItem[];
  totalGeralReceitas: number;
  totalGeralDespesas: number;
  saldoGeral: number;
}