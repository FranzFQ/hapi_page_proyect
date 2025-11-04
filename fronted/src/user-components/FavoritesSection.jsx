import React from 'react';
import '../style/UserHome.css';

const FavoritesSection = () => {
  return (
    <div className="favorites-section">
      <button className="sidebar-btn">FAVORITOS</button>
      <button className="sidebar-btn">CREAR LISTA</button>
      <button className="sidebar-btn">LISTAS FAVORITAS</button>
    </div>
  );
};

export default FavoritesSection;
