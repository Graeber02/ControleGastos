import api from "../api/api";
import type { RelatorioPessoa } from "../models/RelatorioPessoa";
import type { RelatorioCategoria } from "../models/RelatorioCategoria";

export const relatorioService = {
  TotaisPorPessoa: async (): Promise<RelatorioPessoa> => {
    // eslint-disable-next-line no-debugger
    debugger;
    const response = await api.get("/Relatorios/PorPessoa");
    return response.data;
  },

  TotaisPorCategoria: async (): Promise<RelatorioCategoria> => {
    // eslint-disable-next-line no-debugger
    debugger;
    const response = await api.get("/Relatorios/PorCategoria");
    return response.data;
  }
};