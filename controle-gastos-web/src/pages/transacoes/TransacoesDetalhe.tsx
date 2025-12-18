import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Transacao } from "../../models/Transacao";
import { transacaoService } from "../../service/transacaoService";

export default function TransacaoDetalhe() {
  const { id } = useParams();
  const [transacao, setTransacao] = useState<Transacao | null>(null);

  useEffect(() => {
    transacaoService.listar().then(lista => {
      setTransacao(lista.find(t => t.id === Number(id)) || null);
    });
  }, [id]);

  if (!transacao) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Detalhes da Transação</h2>
      <p><b>Descrição:</b> {transacao.descricao}</p>
      <p><b>Valor:</b> R$ {transacao.valor}</p>
      <p><b>Tipo:</b> {transacao.tipo === 1 ? "Despesa" : "Receita"}</p>
    </div>
  );
}