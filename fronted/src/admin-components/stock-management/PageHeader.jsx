import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../global-components/SearchBar';

export default function PageHeader({ title, showBackButton = false, showSearchBar = true, children }) {
  const navigate = useNavigate();

  return (
    <header className="admin-page-header">
      <div className="header-title-section">
        {showBackButton ? (
          <button onClick={() => navigate(-1)} className="back-button" title="Regresar">
            <i className="fi fi-rr-angle-left"></i>
          </button>
        ) : (
          <button onClick={() => navigate('/admin')} className="home-button-header" title="Ir al Dashboard Principal">
            <i className="fi fi-rr-home"></i>
          </button>
        )}
        <h1>{title}</h1>
      </div>

      {showSearchBar && (
        <div className="header-search-section">
          <SearchBar placeholder="Buscar por símbolo o nombre..." />
        </div>
      )}

      <div className="header-actions-section">
        {children}
      </div>
    </header>
  );
}