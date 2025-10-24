import React from 'react';
import '../style/UserGlobal.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="nav-menu">
        <button className="nav-item active">
          <i className="fi fi-br-home"></i>
          PRINCIPAL
        </button>
        <button className="nav-item">
          <i className="fi fi-rr-money-bill-wave"></i>
          TRANSFERENCIAS
        </button>
        <button className="nav-item">
          <i className="fi fi-br-search"></i>
          BUSCADOR
        </button>
        <button className="nav-item">
          <i className="fi fi-rs-chart-line-up"></i>
          PORTAFOLIO
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
