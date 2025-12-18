import { useEffect, useState } from "react";
import PessoaForm from "./PessoaForm";
import { pessoaService } from "../../service/pessoaService";
import Modal from "../../Componentes/ModalIncluir";

interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

export default function PessoaList() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const carregar = async () => {
    setPessoas(await pessoaService.listar());
  };

  useEffect(() => {
    carregar();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Deseja realmente excluir esta pessoa?")) return;

    try {
      setLoadingId(id);
      await pessoaService.deletar(id);
      await carregar(); // recarrega a lista
    // eslint-disable-next-line @typescript-eslint/no-unused-vars 
    } catch (error) {
      alert("Erro ao excluir pessoa");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div style={pageContainer}>
      {/* 🔹 HEADER */}
      <div style={pageHeader}>
        <h2 style={{ margin: 0 }}>Pessoas</h2>

        <button
          style={addButton}
          onClick={() => setMostrarModal(true)}
        >
          ➕ Adicionar
        </button>
      </div>

      {/* 🔹 TABELA */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Nome</th>
            <th style={thStyle}>Idade</th>
            <th style={thStyle}>Ações</th>
          </tr>
        </thead>

        <tbody>
          {pessoas.length === 0 ? (
            <tr>
              <td colSpan={4} style={emptyStyle}>
                Nenhuma pessoa cadastrada
              </td>
            </tr>
          ) : (
            pessoas.map(p => (
              <tr key={p.id}>
                <td style={tdStyle}>{p.id}</td>
                <td style={tdStyle}>{p.nome}</td>
                <td style={tdStyle}>{p.idade}</td>
                <td style={tdStyle}>
                  <button
                    style={deleteButton}
                    disabled={loadingId === p.id}
                    onClick={() => handleDelete(p.id)}
                  >
                    {loadingId === p.id ? "Excluindo..." : "🗑 Excluir"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 🔹 MODAL */}
      {mostrarModal && (
        <Modal onClose={() => setMostrarModal(false)}>
          <PessoaForm
            onSuccess={() => {
              carregar();
              setMostrarModal(false);
            }}
            onClose={() => setMostrarModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}

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

const pageContainer: React.CSSProperties = {
  paddingTop: "64px", // altura do header "Controle de Gastos"
  paddingLeft: "16px",
  paddingRight: "16px"
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#1e1e1e",
  borderRadius: "8px",
  overflow: "hidden"
};

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "12px",
  background: "#2a2a2a",
  color: "#fff",
  fontWeight: 600
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

const deleteButton: React.CSSProperties = {
  padding: "6px 10px",
  borderRadius: "6px",
  border: "none",
  background: "#d32f2f",
  color: "white",
  cursor: "pointer",
  fontSize: "0.9em"
};