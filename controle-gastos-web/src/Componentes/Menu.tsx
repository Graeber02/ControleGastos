import { useState } from "react";
import Sidebar from "./SideBar";

export default function Menu({ children }: { children: React.ReactNode }) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div>
      {/* 🔹 HEADER FIXO */}
      <header style={headerStyle}>
        <button
          onClick={() => setMenuAberto(prev => !prev)}
          style={menuBtn}
        >
          ☰
        </button>

        <h1 style={{ marginLeft: "12px" }}>Controle de Gastos</h1>
      </header>

      {/* 🔹 LAYOUT (SIDEBAR + CONTEÚDO) */}
      <div style={layoutStyle}>
        <Sidebar aberto={menuAberto} onClose={() => setMenuAberto(false)} />

        <main
          style={{
            ...mainStyle,
            marginLeft: menuAberto ? 220 : 0 // 👈 AJUSTE CHAVE
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
const headerStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: "56px",
  display: "flex",
  alignItems: "center",
  background: "#121212",
  color: "white",
  padding: "0 16px",
  zIndex: 1100
};

const layoutStyle: React.CSSProperties = {
  display: "flex"
};

const mainStyle: React.CSSProperties = {
  marginTop: "10px", // altura do header
  padding: "0 20px 20px",   // 👈 remove espaço superior
  width: "100%",
  transition: "margin-left 0.3s ease"
};

const menuBtn: React.CSSProperties = {
  fontSize: "22px",
  background: "none",
  border: "none",
  color: "white",
  cursor: "pointer"
};