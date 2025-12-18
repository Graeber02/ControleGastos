import { Finalidade } from "../constantes/Finalidade";

export const getFinalidadeDescricao = (finalidade: number): string => {
  switch (finalidade) {
    case Finalidade.Despesa:
      return "Despesa";
    case Finalidade.Receita:
      return "Receita";
    case Finalidade.Ambas:
      return "Ambas";
    default:
      return "Não informada";
  }
};