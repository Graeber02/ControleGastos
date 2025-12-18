import { Link } from "react-router-dom";
import "./Sidebar.css";

interface SidebarProps {
  aberto: boolean;
  onClose: () => void;
}

export default function Sidebar({ aberto, onClose }: SidebarProps) {
  return (
    <>
      {aberto && <div className="overlay" onClick={onClose} />}

      <aside className={`sidebar ${aberto ? "aberto" : ""}`}>
        <h2>Menu</h2>

        <nav>
          <Link to="/pessoas" onClick={onClose}>
            Pessoas
          </Link>
          <Link to="/categorias" onClick={onClose}>
            Categorias
          </Link>
          <Link to="/transacoes" onClick={onClose}>
            Transações
          </Link>
          <hr />

          <Link to="/relatorios/pessoas" onClick={onClose}>
            📊 Relatório por Pessoa
          </Link>

          <Link to="/relatorios/categorias" onClick={onClose}>
            🗂️ Relatório por Categoria
          </Link>
        </nav>
      </aside>
    </>
  );
}