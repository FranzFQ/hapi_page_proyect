import React from 'react';
import '../style/UserHome.css'

const UserHome = () => {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="header">
        <div className="logo">logo</div>
        <div className="search-container">
          <input type="text" className="search-input" placeholder="" />
          <button className="search-btn">
            <i className="fi fi-br-search"></i>
          </button>
        </div>
        <div className="user-icon">
          <i className="fi fi-rr-user"></i>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        {/* Sidebar */}
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

        {/* Center Content */}
        <main className="center-content">
          <div className="top-section">
            {/* Investment Section */}
            <div className="investment-section">
              <div className="investment-info">
                <span className="investment-label">EMPIEZA A INVERTIR</span>
                <span className="investment-amount">$ 0.00</span>
              </div>
              <div className="action-buttons">
                <button className="action-btn">DEPOSITAR</button>
                <button className="action-btn">RETIRAR</button>
                <button className="action-btn primary">INVERTIR</button>
              </div>
            </div>

            {/* Right Section */}
            <div className="favorites-section">
              <button className="sidebar-btn">FAVORITOS</button>
              <button className="sidebar-btn">CREAR LISTA</button>
              <button className="sidebar-btn">LISTAS FAVORITAS</button>
            </div>
          </div>

          {/* Categories Section */}
          <div className="categories-section">
            <h2 className="categories-title">CATEGORÍAS</h2>
            <div className="categories-list">
              <div className="category-item">
                <span className="category-name">Acciones</span>
                <span className="category-percentage">+12.5%</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserHome;