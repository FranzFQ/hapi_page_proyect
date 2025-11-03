import React, { useState } from 'react';
import CreateListModal from './CreateListModal';
import FavoriteListsModal from './FavoritesListModal';
import '../style/UserHome.css';

const FavoritesSection = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);

  return (
    <div className="favorites-section">
      <div className="favorites-buttons-container">
        <button
          className="sidebar-btn"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <i className="fi fi-rr-plus"></i> CREAR LISTA
        </button>

        <button
          className="sidebar-btn"
          onClick={() => setIsFavoritesModalOpen(true)}
        >
          <i className="fi fi-rr-heart"></i> LISTAS FAVORITAS
        </button>
      </div>

      {/* Modal para crear nueva lista */}
      <CreateListModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* Modal para listas favoritas */}
      <FavoriteListsModal
        isOpen={isFavoritesModalOpen}
        onClose={() => setIsFavoritesModalOpen(false)}
      />
    </div>
  );
};

export default FavoritesSection;
