import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./Componentes/Menu";

import PessoaList from "./pages/pessoas/PessoaList";
import CategoriaList from "./pages/categorias/CategoriaList";
import TransacaoList from "./pages/transacoes/TransacoesList";

import TotaisPorPessoa from "./pages/Relatorios/TotaisPorPessoa";
import TotaisPorCategoria from "./pages/Relatorios/totaisporCategoria";

export default function App() {
  return (
    <BrowserRouter>
      <Menu>
        <Routes>
          {/* Cadastros */}
          <Route path="/pessoas" element={<PessoaList />} />
          <Route path="/categorias" element={<CategoriaList />} />
          <Route path="/transacoes" element={<TransacaoList />} />

          {/* Relatórios */}
          <Route path="/relatorios/pessoas" element={<TotaisPorPessoa />} />
          <Route path="/relatorios/categorias" element={<TotaisPorCategoria />} />
        </Routes>
      </Menu>
    </BrowserRouter>
  );
}