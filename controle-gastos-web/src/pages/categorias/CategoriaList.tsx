import { useEffect, useState } from "react";
import type { Categoria } from "../../models/Categoria";
import { categoriaService } from "../../service/categoriaService";
import { getFinalidadeDescricao } from "../../helpers/finalidadeHelper";
import Modal from "../../Componentes/ModalIncluir";
import CategoriaForm from "./CategoriaForm";

export default function CategoriasList() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const carrega = async () => {
    setCategorias(await categoriaService.listar());
  };

  useEffect(() => {
     const carregar = async () => {
    setCategorias(await categoriaService.listar());
  };
    carregar();
  }, []);

  return (
    <div style={pageContainer}>
      {/* 🔹 HEADER */}
      <div style={pageHeader}>
        <h2 style={{ margin: 0 }}>Categorias</h2>

        <button
          style={addButton}
          onClick={() => setMostrarModal(true)}
        >
          ➕ Nova Categoria
        </button>
      </div>

      {/* 🔹 TABELA (NÃO ALTERADA) */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Descrição</th>
            <th style={thStyle}>Finalidade</th>
          </tr>
        </thead>

        <tbody>
          {categorias.length === 0 ? (
            <tr>
              <td colSpan={3} style={emptyStyle}>
                Nenhuma categoria cadastrada
              </td>
            </tr>
          ) : (
            categorias.map(c => (
              <tr key={c.id}>
                <td style={tdStyle}>{c.id}</td>
                <td style={tdStyle}>{c.descricao}</td>
                <td style={tdStyle}>
                  {getFinalidadeDescricao(c.finalidade)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 🔹 MODAL DE INCLUSÃO */}
      {mostrarModal && (
        <Modal onClose={() => setMostrarModal(false)}>
          <CategoriaForm
            onSuccess={() => {
              carrega();              // 👈 NÃO perde o que já tem
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
  paddingTop: "64px",
  paddingLeft: "16px",
  paddingRight: "16px"
};

const pageHeader: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px"
};

const addButton: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: "8px",
  background: "#1e88e5",
  color: "white",
  textDecoration: "none",
  fontWeight: 500
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#1e1e1e",
  borderRadius: "8px",
  overflow: "hidden"
};

const thStyle: React.CSSProperties = {
  padding: "12px",
  background: "#2a2a2a",
  color: "#fff",
  textAlign: "left"
};

const tdStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderBottom: "1px solid #333",
  color: "#ddd"
};

const emptyStyle: React.CSSProperties = {
  padding: "20px",
  textAlign: "center",
  color: "#aaa"
};

// const linkStyle: React.CSSProperties = {
//   color: "#64b5f6",
//   textDecoration: "none"
// };