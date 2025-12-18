export interface RelatorioPessoaItem {
  pessoaId: number;
  pessoa: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface RelatorioPessoa {
  pessoas: RelatorioPessoaItem[];
  totalGeralReceitas: number;
  totalGeralDespesas: number;
  saldoGeral: number;
}