import React from 'react';
import SearchBar from '../global-components/SearchBar.jsx'
import '../style/UserGlobal.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">logo</div>

      <div className="search-container">
        <div className="search-bar-wrapper">
          <SearchBar placeholder="Buscar acciones, cripto, fondos..." />
        </div>
        <button className="search-btn" style={{zIndex: 10000, position: 'relative'}}>
          <i className="fi fi-br-search"></i>
        </button>
      </div>

      <div className="user-icon">
        <i className="fi fi-rr-user"></i>
      </div>
    </header>
  );
};

export default Header;