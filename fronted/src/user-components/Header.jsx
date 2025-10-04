import React from 'react';
import '../style/UserGlobal.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">logo</div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar..."
        />
        <button className="search-btn">
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
