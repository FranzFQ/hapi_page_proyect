import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import FavoriteLists from './FavoriteLists';
import '../style/CreateListModal.css';

const FavoriteListsModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="create-list-overlay" onClick={onClose}>
      <div
        className="create-list-container"
        onClick={(e) => e.stopPropagation()}
      >
        <FavoriteLists />
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default FavoriteListsModal;
