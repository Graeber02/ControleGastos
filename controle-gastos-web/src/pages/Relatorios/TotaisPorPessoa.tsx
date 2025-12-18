import { useEffect, useState } from "react";
import { relatorioService } from "../../service/relatorioService";
import type { RelatorioPessoa } from "../../models/RelatorioPessoa";

export default function TotaisPorPessoa() {
  const [dados, setDados] = useState<RelatorioPessoa | null>(null);

  useEffect(() => {
    relatorioService.TotaisPorPessoa().then(setDados);
  }, []);

  if (!dados) return <p style={{ color: "#fff" }}>Carregando...</p>;

  return (
    <div
      style={{
        padding: "24px",
        marginTop: "56px", // altura do header
      }}
    >
      {/* CABEÇALHO DA PÁGINA */}
      <div
        style={{
          marginBottom: "24px",
          paddingBottom: "12px",
          borderBottom: "1px solid #333",
        }}
      >
        <h1 style={{ margin: 0, color: "#fff", fontSize: "24px" }}>
          Relatório por Pessoa
        </h1>
      </div>

      {/* TABELA */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#1e1e1e",
          borderRadius: "8px",
          overflow: "hidden",
          color: "#fff",
        }}
      >
        <thead style={{ background: "#2a2a2a" }}>
          <tr>
            <th style={th}>Pessoa</th>
            <th style={th}>Receitas</th>
            <th style={th}>Despesas</th>
            <th style={th}>Saldo</th>
          </tr>
        </thead>

        <tbody>
          {dados.pessoas.map((p) => (
            <tr key={p.pessoaId}>
              <td style={td}>{p.pessoa}</td>
              <td style={td}>R$ {p.totalReceitas.toFixed(2)}</td>
              <td style={td}>R$ {p.totalDespesas.toFixed(2)}</td>
              <td
                style={{
                  ...td,
                  color: p.saldo < 0 ? "#f44336" : "#4caf50",
                  fontWeight: 600,
                }}
              >
                R$ {p.saldo.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot style={{ background: "#252525" }}>
          <tr>
            <td style={{ ...td, fontWeight: "bold" }}>Total Geral</td>
            <td style={{ ...td, fontWeight: "bold" }}>
              R$ {dados.totalGeralReceitas.toFixed(2)}
            </td>
            <td style={{ ...td, fontWeight: "bold" }}>
              R$ {dados.totalGeralDespesas.toFixed(2)}
            </td>
            <td style={{ ...td, fontWeight: "bold" }}>
              R$ {dados.saldoGeral.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

const th: React.CSSProperties = {
  padding: "14px",
  textAlign: "left",
  fontWeight: 600,
  borderBottom: "1px solid #333"
};

const td: React.CSSProperties = {
  padding: "12px 14px",
  borderBottom: "1px solid #2f2f2f"
};