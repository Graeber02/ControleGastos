import { useState } from "react";
import { pessoaService } from "../../service/pessoaService";

interface Props {
  onSuccess: () => void;
  onClose: () => void;
}

export default function PessoaForm({ onSuccess, onClose }: Props) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState<number | "">("");

  const salvar = async () => {
    if (!nome || idade === "" || idade < 0) {
      alert("Dados inválidos");
      return;
    }

    await pessoaService.criar(nome, Number(idade));
    onSuccess();
    onClose(); // fecha após salvar
  };

 return (
   <div style={container}>
     <button style={closeBtn} onClick={onClose}>
       ✖
     </button>

     <h2>Nova Pessoa</h2>

     <input
       placeholder="Nome"
       value={nome}
       onChange={(e) => setNome(e.target.value)}
     />

     <input
       type="number"
       placeholder="Idade"
       value={idade}
       onChange={(e) =>
         setIdade(e.target.value === "" ? "" : Number(e.target.value))
       }
     />

     <button onClick={salvar}>Salvar</button>
   </div>
 );
}
const container: React.CSSProperties = {
  position: "relative"
};

const closeBtn: React.CSSProperties = {
  position: "absolute",
  top: "8px",
  right: "8px",
  background: "transparent",
  border: "none",
  fontSize: "18px",
  cursor: "pointer"
};