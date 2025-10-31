import React, { useState } from 'react';
import CreateListModal from './CreateListModal';
import '../style/UserHome.css';

const FavoritesSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="favorites-section">
      <button className="sidebar-btn">FAVORITOS</button>
      <button
        className="sidebar-btn"
        onClick={() => setIsModalOpen(true)}
      >
        CREAR LISTA
      </button>
      <button className="sidebar-btn">LISTAS FAVORITAS</button>

      {/* Modal de crear lista */}
      <CreateListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default FavoritesSection;
