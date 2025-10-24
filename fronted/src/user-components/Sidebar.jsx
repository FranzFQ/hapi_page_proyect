import React from "react";
import "../style/UserGlobal.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className="sidebar">
      <nav className="nav-menu">
        <button
          type="button"
          className={`nav-item ${isActive("/home") ? "active" : ""}`}
          onClick={() => navigate("/home")}
        >
          <i className="fi fi-br-home" style={{ marginRight: 12 }}></i>
          PRINCIPAL
        </button>

        <button
          type="button"
          className={`nav-item ${isActive("/transactions") ? "active" : ""}`}
          onClick={() => navigate("/transactions")}
        >
          <i className="fi fi-rr-money-bill-wave" style={{ marginRight: 12 }}></i>
          TRANSFERENCIAS
        </button>

        <button
          type="button"
          className={`nav-item ${isActive("/searcher") ? "active" : ""}`}
          onClick={() => navigate("/searcher")}
        >
          <i className="fi fi-br-search" style={{ marginRight: 12 }}></i>
          BUSCADOR
        </button>

        <button
          type="button"
          className={`nav-item ${isActive("/portfolio") ? "active" : ""}`}
          onClick={() => navigate("/portfolio")}
        >
          <i className="fi fi-rs-chart-line-up" style={{ marginRight: 12 }}></i>
          PORTAFOLIO
        </button>
      </nav>
    </aside>
  );
}
