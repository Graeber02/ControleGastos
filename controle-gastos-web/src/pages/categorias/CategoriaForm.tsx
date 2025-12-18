import { useState } from "react";
import { categoriaService } from "../../service/categoriaService";
import { Finalidade } from "../../constantes/Finalidade";

interface Props {
  onSuccess: () => void;
  onClose: () => void;
}

export default function CategoriaForm({ onSuccess, onClose }: Props) {
  const [descricao, setDescricao] = useState("");
  const [finalidade, setFinalidade] = useState<number>(Finalidade.Despesa);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!descricao.trim()) {
      alert("Informe a descrição");
      return;
    }

    try {
      setLoading(true);
      await categoriaService.criar(descricao, finalidade);
      onSuccess();
    } catch {
      alert("Erro ao criar categoria");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nova Categoria</h3>

      <div style={field}>
        <label>Descrição</label>
        <input
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          required
        />
      </div>

      <div style={field}>
        <label>Finalidade</label>
        <select
          value={finalidade}
          onChange={e => setFinalidade(Number(e.target.value))}
        >
          <option value={Finalidade.Despesa}>Despesa</option>
          <option value={Finalidade.Receita}>Receita</option>
          <option value={Finalidade.Ambas}>Ambas</option>
        </select>
      </div>

      <div style={actions}>
        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </button>

        <button type="button" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

const field: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "12px"
};

const actions: React.CSSProperties = {
  display: "flex",
  gap: "10px",
  marginTop: "16px"
};