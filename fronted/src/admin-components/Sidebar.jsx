import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>Logo</h1>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li 
            className={`nav-item ${isActive('/admin/users') ? 'active' : ''}`} 
            onClick={() => navigate('/admin/users')}
          >
            USUARIOS
          </li>
          <li 
            className={`nav-item ${isActive('/admin/transactions') ? 'active' : ''}`}
            onClick={() => navigate('/admin/transactions')}
          >
            TRANSACCIONES
          </li>
          <li 
            className={`nav-item ${isActive('/admin/stocks') ? 'active' : ''}`}
            onClick={() => navigate('/admin/stocks')}
          >
            ACCIONES
          </li>
          <li 
            className={`nav-item ${isActive('/admin/requests') ? 'active' : ''}`}
            onClick={() => navigate('/admin/requests')}
          >
            SOLICITUDES
          </li>
          <li 
            className={`nav-item ${isActive('/admin/reports') ? 'active' : ''}`}
            onClick={() => navigate('/admin/reports')}
          >
            REPORTES
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <div className="nav-item">ADMIN</div>
      </div>
    </aside>
  );
}