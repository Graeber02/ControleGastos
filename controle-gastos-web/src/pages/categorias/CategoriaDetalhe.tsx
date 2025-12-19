import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Categoria } from "../../models/Categoria";
import { categoriaService } from "../../service/categoriaService";

export default function CategoriaDetalhe() {
  const { id } = useParams();
  //const navigate = useNavigate();
  const [categoria, setCategoria] = useState<Categoria | null>(null);

  useEffect(() => {
    categoriaService.listar().then(lista => {
      setCategoria(lista.find(c => c.id === Number(id)) || null);
    });
  }, [id]);

  if (!categoria) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Detalhes da Categoria</h2>
      <p><b>Descrição:</b> {categoria.descricao}</p>
      <p><b>Finalidade:</b> {categoria.finalidade}</p>
    </div>
  );
}