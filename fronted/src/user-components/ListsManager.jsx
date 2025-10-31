// src/components/ListsManager.jsx
import React, { useState, useRef, useEffect } from 'react';
import '../style/ListsManager.css';

// Modal interno para crear o editar lista
const ListModal = ({ isOpen, onClose, list = null, onSave }) => {
  const [listName, setListName] = useState(list?.name || '');
  const modalRef = useRef(null);

  useEffect(() => {
    if (list) setListName(list.name);
    else setListName('');
  }, [list]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSubmit = () => {
    if (listName.trim()) {
      onSave({
        id: list?.id || Date.now(),
        name: listName.trim(),
        activeCount: list?.activeCount || 0
      });
      setListName('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="list-modal-overlay">
      <div className="list-modal" ref={modalRef}>
        <div className="list-modal-header">
          <button className="back-btn" onClick={onClose}>
            <i className="fi fi-rr-arrow-left"></i>
          </button>
          <div className="list-modal-actions">
            {list && <button className="delete-btn">Eliminar</button>}
            <button className="save-btn" onClick={handleSubmit}>
              {list ? 'Guardar cambios' : 'Crear lista'}
            </button>
          </div>
        </div>

        <div className="list-modal-body">
          <div className="list-icon">
            <i className="fi fi-rr-smile"></i>
          </div>

          <input
            type="text"
            className="list-name-input"
            placeholder="Nombre de la lista"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            maxLength={50}
            autoFocus
          />

          {!list && (
            <div className="empty-state">
              <p className="empty-state-title">Tu lista está vacía</p>
              <p className="empty-state-subtitle">
                Añade tus activos favoritos a esta lista
              </p>
              <button className="search-assets-btn">Buscar activos</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente principal de gestión de listas
const ListsManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [lists, setLists] = useState([
    { id: 1, name: 'Inversiones 2025', activeCount: 2 },
    { id: 2, name: 'Criptos favoritas', activeCount: 5 },
  ]);

  const handleCreateList = () => {
    setSelectedList(null);
    setIsModalOpen(true);
  };

  const handleEditList = (list) => {
    setSelectedList(list);
    setIsModalOpen(true);
  };

  const handleSaveList = (listData) => {
    if (selectedList) {
      setLists((prev) => prev.map((l) => (l.id === listData.id ? listData : l)));
    } else {
      setLists((prev) => [...prev, listData]);
    }
  };

  return (
    <div className="lists-manager">
      <div className="lists-container">
        <div className="lists-header">
          <h2 className="lists-title">Tus listas</h2>
          <button className="add-list-btn" onClick={handleCreateList}>
            <i className="fi fi-rr-plus"></i>
          </button>
        </div>

        <div className="lists-scroll">
          {lists.length === 0 ? (
            <p className="empty-lists-msg">No tienes listas aún</p>
          ) : (
            lists.map((list) => (
              <div
                key={list.id}
                className="list-item"
                onClick={() => handleEditList(list)}
              >
                <div className="list-item-content">
                  <div className="list-item-icon">
                    <i className="fi fi-rr-smile"></i>
                  </div>
                  <div className="list-item-info">
                    <h3 className="list-item-name">{list.name}</h3>
                    <p className="list-item-count">
                      {list.activeCount} activos
                    </p>
                  </div>
                </div>
                <i className="fi fi-rr-angle-right list-item-arrow"></i>
              </div>
            ))
          )}
        </div>

        {lists.length > 3 && <button className="view-more-btn">Ver más</button>}
      </div>

      <ListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        list={selectedList}
        onSave={handleSaveList}
      />
    </div>
  );
};

export default ListsManager;
