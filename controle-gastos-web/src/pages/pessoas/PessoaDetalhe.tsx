import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Pessoa } from "../../models/pessoas";
import { pessoaService } from "../../service/pessoaService";

export default function PessoaDetalhe() {
  const { id } = useParams();
  const [pessoa, setPessoa] = useState<Pessoa | null>(null);

  useEffect(() => {
    pessoaService.listar().then(lista => {
      setPessoa(lista.find(p => p.id === Number(id)) || null);
    });
  }, [id]);

  if (!pessoa) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Detalhes da Pessoa</h2>
      <p><b>Nome:</b> {pessoa.nome}</p>
      <p><b>Idade:</b> {pessoa.idade}</p>
    </div>
  );
}