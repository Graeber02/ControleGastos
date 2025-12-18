import { useEffect, useState } from "react";
import type { Transacao } from "../../models/Transacao";
import type { Categoria } from "../../models/Categoria";
import { transacaoService } from "../../service/transacaoService";
import { categoriaService } from "../../service/categoriaService";
import { pessoaService } from "../../service/pessoaService";
import { getFinalidadeDescricao } from "../../helpers/finalidadeHelper";
import { getCategoriaDescricaoById } from "../../helpers/CategoriaHelper";
import Modal from "../../Componentes/ModalIncluir";
import TransacaoForm from "./TransacoesForm";
import type { Pessoa } from "../../models/pessoas";

export default function TransacoesList() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const carrega = async () => {
    setTransacoes(await transacaoService.listar());
  };

  useEffect(() => {  
    const carregar = async () => {
      setTransacoes(await transacaoService.listar());
    };
    carregar();
    categoriaService.listar().then(setCategorias);
    pessoaService.listar().then(setPessoas);
  }, []);

  return (
    <div style={pageContainer}>
      {/* 🔹 HEADER */}
      <div style={pageHeader}>
        <h2 style={{ margin: 0 }}>Transações</h2>

        <button style={addButton} onClick={() => setMostrarModal(true)}>
          ➕ Nova Transação
        </button>
      </div>

      {/* 🔹 TABELA */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...thBase, ...align("center") }}>ID</th>
            <th style={{ ...thBase, ...align("left") }}>Descrição</th>
            <th style={{ ...thBase, ...align("right") }}>Valor</th>
            <th style={{ ...thBase, ...align("center") }}>Tipo</th>
            <th style={{ ...thBase, ...align("center") }}>Pessoa</th>
            <th style={{ ...thBase, ...align("left") }}>Categoria</th>
          </tr>
        </thead>

        <tbody>
          {transacoes.map(t => (
            <tr key={t.id}>
              <td style={{ ...tdBase, ...align("center") }}>{t.id}</td>
              <td style={{ ...tdBase, ...align("left") }}>{t.descricao}</td>
              <td style={{ ...tdBase, ...align("right") }}>
                R$ {t.valor.toFixed(2)}
              </td>
              <td style={{ ...tdBase, ...align("center") }}>
                {getFinalidadeDescricao(t.tipo)}
              </td>
              <td style={{ ...tdBase, ...align("center") }}>{t.pessoaId}</td>
              <td style={{ ...tdBase, ...align("left") }}>
                {getCategoriaDescricaoById(t.categoriaId, categorias)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔹 MODAL */}
      {mostrarModal && (
        <Modal onClose={() => setMostrarModal(false)}>
          <TransacaoForm
            categorias={categorias}
            pessoas={pessoas}
            onSuccess={() => {
              carrega();
              setMostrarModal(false);
            }}
            onClose={() => setMostrarModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}

const pageContainer: React.CSSProperties = {
  padding: "16px",
  paddingTop: "80px", // aumenta o espaço do topo
  boxSizing: "border-box", // garante que padding não quebre o layout
  minHeight: "100vh", // ocupa a tela inteira
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#1e1e1e",
  borderRadius: "8px",
  overflow: "hidden"
};

const thBase: React.CSSProperties = {
  padding: "12px",
  background: "#2a2a2a",
  color: "#fff",
  fontWeight: 600,
  borderBottom: "1px solid #333"
};

const tdBase: React.CSSProperties = {
  padding: "10px 12px",
  borderBottom: "1px solid #333",
  color: "#ddd"
};

/**
 * Helper de alinhamento (TypeScript safe)
 */
const align = (
  value: "left" | "center" | "right"
): React.CSSProperties => ({
  textAlign: value
});

const pageHeader: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px"
};

const addButton: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  background: "#1e88e5",
  color: "white",
  fontWeight: 500
};