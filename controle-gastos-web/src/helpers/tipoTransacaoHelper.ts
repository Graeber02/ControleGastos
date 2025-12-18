import { TipoTransacao } from "../constantes/TipoTransacao";

export const getTipoTransacaoDescricao = (tipo: number) => {
  return tipo === TipoTransacao.Despesa ? "Despesa" : "Receita";
};