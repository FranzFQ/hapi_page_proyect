import React from 'react';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>Logo</h1>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li className="nav-item active">PRINCIPAL</li>
          <li className="nav-item">USUARIOS</li>
          <li className="nav-item">TRANSACCIONES</li>
          <li className="nav-item">ACCIONES</li>
          <li className="nav-item">SOLICITUDES</li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <div className="nav-item">ADMIN</div>
      </div>
    </aside>
  );
}