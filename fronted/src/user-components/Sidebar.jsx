import React from 'react';
import '../style/UserGlobal.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className="sidebar">
      <nav className="nav-menu">
        <ul>
          <li
            className={`nav-item ${isActive('/home') ? 'active' : ''}`}
            onClick={() => navigate('/home')}
          >
            PRINCIPAL
          </li>
          <li
            className={`nav-item ${isActive('/transactions') ? 'active' : ''}`}
            onClick={() => navigate('/transactions')}
          >
            TRANSFERENCIAS
          </li>
          <li
            className={`nav-item ${isActive('/searcher') ? 'active' : ''}`}
            onClick={() => navigate('/searcher')}
          >
            BUSCADOR
          </li>
          <li
            className={`nav-item ${isActive('/portfolio') ? 'active' : ''}`}
            onClick={() => navigate('/portfolio')}
          >
            PORTAFOLIO
          </li>
        </ul>
      </nav>
    </aside>
  );
}
