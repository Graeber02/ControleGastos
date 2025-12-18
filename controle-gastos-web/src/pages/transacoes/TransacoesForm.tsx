import { useState } from "react";
import type { Categoria } from "../../models/Categoria";
import type { Pessoa } from "../../models/pessoas";
import { transacaoService } from "../../service/transacaoService";
import { Finalidade } from "../../constantes/Finalidade";

interface Props {
  categorias: Categoria[];
  pessoas: Pessoa[];
  onSuccess: () => void;
  onClose: () => void;
}

export default function TransacaoForm({
  categorias,
  pessoas,
  onSuccess,
  onClose
}: Props) {
  const [descricao, setDescricao] = useState("");
  //const [valor, setValor] = useState(0);
  const [valor, setValor] = useState<string>("");

  const [tipo, setTipo] = useState<
    typeof Finalidade[keyof typeof Finalidade]
  >(Finalidade.Despesa);

  const [pessoaId, setPessoaId] = useState<number | null>(null);
  const [categoriaId, setCategoriaId] = useState<number | null>(null);

  const pessoaSelecionada =
    pessoaId !== null ? pessoas.find(p => p.id === pessoaId) ?? null : null;

  const categoriasFiltradas = categorias.filter(
    c => c.finalidade === tipo || c.finalidade === Finalidade.Ambas
  );

  const salvar = async () => {
    const valorNumerico = valor === "" ? 0 : Number(valor);

    if (!descricao.trim() || valorNumerico <= 0 || !pessoaId || !categoriaId) {
      alert("Preencha todos os campos corretamente");
      return;
    }

    await transacaoService.criar({
      descricao,
      valor: valorNumerico,
      tipo,
      pessoaId,
      categoriaId,
    });

    onSuccess();
  };

  return (
    <div style={container}>
      {/* HEADER */}
      <div style={header}>
        <h2 style={{ margin: 0 }}>Nova Transação</h2>
        <button style={closeBtn} onClick={onClose}>
          ✕
        </button>
      </div>

      {/* FORM */}
      <div style={form}>
        <div style={field}>
          <label>Descrição</label>
          <input
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <div style={field}>
          <label>Valor</label>
          <input
            type="number"
            min={0}
            step="0.01"
            value={valor}
            onChange={(e) => {
              const raw = e.target.value;
              // remove zero à esquerda (ex: 055 -> 55)
              const normalizado = raw.replace(/^0+(?=\d)/, "");
              setValor(normalizado);
            }}
          />
        </div>

        <div style={field}>
          <label>Pessoa</label>
          <select
            value={pessoaId ?? ""}
            onChange={(e) =>
              setPessoaId(e.target.value ? Number(e.target.value) : null)
            }
          >
            <option value="">Selecione</option>
            {pessoas.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome} ({p.idade} anos)
              </option>
            ))}
          </select>
        </div>

        <div style={field}>
          <label>Tipo</label>
          <select
            value={tipo}
            onChange={(e) =>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              setTipo(Number(e.target.value) as any)
            }
            disabled={!!pessoaSelecionada && pessoaSelecionada.idade < 18}
          >
            <option value={Finalidade.Despesa}>Despesa</option>
            <option value={Finalidade.Receita}>Receita</option>
          </select>
        </div>

        <div style={field}>
          <label>Categoria</label>
          <select
            value={categoriaId ?? ""}
            onChange={(e) =>
              setCategoriaId(e.target.value ? Number(e.target.value) : null)
            }
          >
            <option value="">Selecione</option>
            {categoriasFiltradas.map((c) => (
              <option key={c.id} value={c.id}>
                {c.descricao}
              </option>
            ))}
          </select>
        </div>

        {/* ACTIONS */}
        <div style={actions}>
          <button style={cancelBtn} onClick={onClose}>
            Cancelar
          </button>
          <button style={saveBtn} onClick={salvar}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

const container: React.CSSProperties = {
  background: "#1e1e1e",
  padding: "20px",
  borderRadius: "10px",
  minWidth: "400px",
  color: "#fff"
};

const header: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px"
};

const closeBtn: React.CSSProperties = {
  background: "transparent",
  border: "none",
  color: "#fff",
  fontSize: "20px",
  cursor: "pointer"
};

const form: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px"
};

const field: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "4px"
};

const actions: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  marginTop: "16px"
};

const cancelBtn: React.CSSProperties = {
  padding: "8px 14px",
  background: "#444",
  border: "none",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer"
};

const saveBtn: React.CSSProperties = {
  padding: "8px 14px",
  background: "#1e88e5",
  border: "none",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer"
};