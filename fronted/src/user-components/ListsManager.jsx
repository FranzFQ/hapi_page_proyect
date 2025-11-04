// src/components/ListsManager.jsx
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../style/ListsManager.css';

// Modal de búsqueda de activos
const SearchAssetsModal = ({ isOpen, onClose, onAddAsset }) => {
  const [searchValue, setSearchValue] = useState('');
  const [activeFilter, setActiveFilter] = useState('todos');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);

  const mockDatabase = [
    { id: 1, name: 'Apple Inc.', type: 'acciones', symbol: 'AAPL', price: 182.63, change: '+2.3%' },
    { id: 2, name: 'Microsoft Corporation', type: 'acciones', symbol: 'MSFT', price: 415.50, change: '+1.8%' },
    { id: 3, name: 'Amazon.com Inc', type: 'acciones', symbol: 'AMZN', price: 174.45, change: '+3.1%' },
    { id: 4, name: 'Tesla Inc', type: 'acciones', symbol: 'TSLA', price: 238.72, change: '-1.2%' },
    { id: 5, name: 'NVIDIA Corporation', type: 'acciones', symbol: 'NVDA', price: 495.22, change: '+5.4%' },
    { id: 6, name: 'Meta Platforms', type: 'acciones', symbol: 'META', price: 352.89, change: '+2.1%' },
    { id: 7, name: 'Alphabet Inc', type: 'acciones', symbol: 'GOOGL', price: 141.80, change: '+1.5%' },
    { id: 8, name: 'Bitcoin', type: 'cripto', symbol: 'BTC', price: 43467.21, change: '+5.2%' },
    { id: 9, name: 'Ethereum', type: 'cripto', symbol: 'ETH', price: 2287.45, change: '+3.7%' },
    { id: 10, name: 'Cardano', type: 'cripto', symbol: 'ADA', price: 0.58, change: '+2.9%' },
    { id: 11, name: 'Solana', type: 'cripto', symbol: 'SOL', price: 98.34, change: '+8.1%' },
    { id: 12, name: 'Ripple', type: 'cripto', symbol: 'XRP', price: 0.52, change: '-0.8%' },
    { id: 13, name: 'Fondo S&P 500', type: 'fondos', symbol: 'SPY', price: 442.30, change: '+1.2%' },
    { id: 14, name: 'Vanguard Total Stock', type: 'fondos', symbol: 'VTI', price: 234.56, change: '+0.9%' },
    { id: 15, name: 'iShares MSCI Emerging', type: 'fondos', symbol: 'EEM', price: 40.12, change: '+1.7%' },
    { id: 16, name: 'Fondo NASDAQ-100', type: 'fondos', symbol: 'QQQ', price: 387.92, change: '+2.4%' },
  ];

  const performSearch = (query, filter) => {
    if (!query || query.trim().length === 0) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const queryLower = query.toLowerCase().trim();
      
      const filteredResults = mockDatabase.filter(item => {
        const matchesFilter = filter === 'todos' || item.type === filter;
        const matchesSearch = 
          item.name.toLowerCase().includes(queryLower) || 
          item.symbol.toLowerCase().includes(queryLower);
        
        return matchesFilter && matchesSearch;
      });

      setSearchResults(filteredResults);
      setIsLoading(false);
    }, 200);
  };

  useEffect(() => {
    performSearch(searchValue, activeFilter);
  }, [searchValue, activeFilter]);

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
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="search-assets-overlay">
      <div className="search-assets-modal" ref={modalRef}>
        <div className="search-assets-header">
          <button className="back-btn" onClick={onClose}>
            <i className="fi fi-rr-arrow-left"></i>
          </button>
          <h2>Buscar activos</h2>
        </div>

        <div className="search-assets-search">
          <input
            type="text"
            placeholder="Buscar acciones, cripto, fondos..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            autoFocus
          />
          <i className="fi fi-br-search"></i>
        </div>

        <div className="search-assets-filters">
          <button
            className={`filter-btn ${activeFilter === 'todos' ? 'active' : ''}`}
            onClick={() => setActiveFilter('todos')}
          >
            Todos
          </button>
          <button
            className={`filter-btn ${activeFilter === 'acciones' ? 'active' : ''}`}
            onClick={() => setActiveFilter('acciones')}
          >
            Acciones
          </button>
          <button
            className={`filter-btn ${activeFilter === 'cripto' ? 'active' : ''}`}
            onClick={() => setActiveFilter('cripto')}
          >
            Cripto
          </button>
          <button
            className={`filter-btn ${activeFilter === 'fondos' ? 'active' : ''}`}
            onClick={() => setActiveFilter('fondos')}
          >
            Fondos
          </button>
        </div>

        <div className="search-assets-results">
          {isLoading ? (
            <p className="loading-message">Buscando...</p>
          ) : searchValue.trim() === '' ? (
            <p className="empty-search-message">Escribe para buscar activos</p>
          ) : searchResults.length === 0 ? (
            <p className="no-results-message">No se encontraron resultados</p>
          ) : (
            searchResults.map((asset) => (
              <div key={asset.id} className="asset-item">
                <div className="asset-info">
                  <div className="asset-main">
                    <h3 className="asset-name">{asset.name}</h3>
                    <span className="asset-symbol">{asset.symbol}</span>
                  </div>
                  <div className="asset-details">
                    <span className="asset-price">${asset.price}</span>
                    <span className={`asset-change ${asset.change.startsWith('+') ? 'positive' : 'negative'}`}>
                      {asset.change}
                    </span>
                  </div>
                </div>
                <button
                  className="add-asset-btn"
                  onClick={() => onAddAsset(asset)}
                  title="Agregar a la lista"
                >
                  <i className="fi fi-rr-plus"></i>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

// Modal interno para crear o editar lista
const ListModal = ({ isOpen, onClose, list = null, onSave, onDeleteAsset }) => {
  const [listName, setListName] = useState(list?.name || '');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (list) setListName(list.name);
    else setListName('');
  }, [list]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Si el modal de búsqueda está abierto, no hacer nada
      if (isSearchModalOpen) {
        return;
      }
      
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      // Si el modal de búsqueda está abierto, cerrar solo ese
      if (event.key === 'Escape') {
        if (isSearchModalOpen) {
          setIsSearchModalOpen(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, isSearchModalOpen]);

  const handleSubmit = () => {
    if (listName.trim()) {
      onSave({
        ...list,
        id: list?.id || Date.now(),
        name: listName.trim(),
        assets: list?.assets || []
      });
      setListName('');
      onClose();
    }
  };

  const handleAddAsset = (asset) => {
    console.log('Activo agregado a la lista:', asset);
    
    // Actualizar la lista con el nuevo activo
    const updatedList = {
      ...list,
      assets: list?.assets ? [...list.assets, asset] : [asset]
    };
    
    onSave(updatedList);
    
    // Cerrar el modal de búsqueda
    setIsSearchModalOpen(false);
  };

  const handleRemoveAsset = (assetId) => {
    if (list && onDeleteAsset) {
      onDeleteAsset(list.id, assetId);
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

          {/* Mostrar activos de la lista */}
          {list && list.assets && list.assets.length > 0 ? (
            <div className="list-assets-container">
              <h3 className="list-assets-title">Activos en esta lista</h3>
              <div className="list-assets-scroll">
                {list.assets.map((asset) => (
                  <div key={asset.id} className="list-asset-item">
                    <div className="asset-info">
                      <div className="asset-main">
                        <h4 className="asset-name">{asset.name}</h4>
                        <span className="asset-symbol">{asset.symbol}</span>
                      </div>
                      <div className="asset-details">
                        <span className="asset-price">${asset.price}</span>
                        <span className={`asset-change ${asset.change.startsWith('+') ? 'positive' : 'negative'}`}>
                          {asset.change}
                        </span>
                      </div>
                    </div>
                    <button
                      className="remove-asset-btn"
                      onClick={() => handleRemoveAsset(asset.id)}
                      title="Quitar de la lista"
                    >
                      <i className="fi fi-rr-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
              <button 
                className="search-assets-btn"
                onClick={() => setIsSearchModalOpen(true)}
              >
                Agregar más activos
              </button>
            </div>
          ) : !list ? (
            <div className="empty-state">
              <p className="empty-state-title">Tu lista está vacía</p>
              <p className="empty-state-subtitle">
                Añade tus activos favoritos a esta lista
              </p>
              <button 
                className="search-assets-btn"
                onClick={() => setIsSearchModalOpen(true)}
              >
                Buscar activos
              </button>
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-state-title">No hay activos en esta lista</p>
              <p className="empty-state-subtitle">
                Comienza agregando tus activos favoritos
              </p>
              <button 
                className="search-assets-btn"
                onClick={() => setIsSearchModalOpen(true)}
              >
                Buscar activos
              </button>
            </div>
          )}
        </div>

        {/* Modal de búsqueda renderizado siempre que el modal de lista esté abierto */}
        <SearchAssetsModal
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
          onAddAsset={handleAddAsset}
        />
      </div>
    </div>
  );
};

// Componente principal de gestión de listas
const ListsManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [lists, setLists] = useState([
    { 
      id: 1, 
      name: 'Inversiones 2025', 
      favorite: false,
      assets: [
        { id: 1, name: 'Apple Inc.', type: 'acciones', symbol: 'AAPL', price: 182.63, change: '+2.3%' },
        { id: 2, name: 'Microsoft Corporation', type: 'acciones', symbol: 'MSFT', price: 415.50, change: '+1.8%' }
      ]
    },
    { 
      id: 2, 
      name: 'Criptos favoritas', 
      favorite: true,
      assets: [
        { id: 8, name: 'Bitcoin', type: 'cripto', symbol: 'BTC', price: 43467.21, change: '+5.2%' },
        { id: 9, name: 'Ethereum', type: 'cripto', symbol: 'ETH', price: 2287.45, change: '+3.7%' },
        { id: 10, name: 'Cardano', type: 'cripto', symbol: 'ADA', price: 0.58, change: '+2.9%' },
        { id: 11, name: 'Solana', type: 'cripto', symbol: 'SOL', price: 98.34, change: '+8.1%' },
        { id: 12, name: 'Ripple', type: 'cripto', symbol: 'XRP', price: 0.52, change: '-0.8%' }
      ]
    },
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
      const newList = {
        ...listData,
        assets: listData.assets || []
      };
      setLists((prev) => [...prev, newList]);
    }
    setSelectedList(listData); // Actualizar el estado local
  };

  // 🗑️ FUNCIÓN ELIMINAR LISTA
  const handleDeleteList = (id) => {
    setLists((prev) => prev.filter((list) => list.id !== id));
  };

  // 🗑️ FUNCIÓN ELIMINAR ACTIVO DE UNA LISTA
  const handleDeleteAsset = (listId, assetId) => {
    setLists((prev) =>
      prev.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            assets: list.assets.filter((asset) => asset.id !== assetId)
          };
        }
        return list;
      })
    );
    
    // Actualizar también el selectedList si está abierto
    if (selectedList && selectedList.id === listId) {
      setSelectedList((prev) => ({
        ...prev,
        assets: prev.assets.filter((asset) => asset.id !== assetId)
      }));
    }
  };

  // ❤️ FUNCIÓN FAVORITO
  const handleToggleFavorite = (id) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === id ? { ...list, favorite: !list.favorite } : list
      )
    );
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
              <div key={list.id} className="list-item">
                <div className="list-item-content" onClick={() => handleEditList(list)}>
                  <div className="list-item-icon">
                    <i className="fi fi-rr-smile"></i>
                  </div>
                  <div className="list-item-info">
                    <h3 className="list-item-name">{list.name}</h3>
                    <p className="list-item-count">
                      {list.assets ? list.assets.length : 0} activos
                    </p>
                  </div>
                </div>

                <div className="list-item-actions">
                  {/* ❤️ ÍCONO FAVORITO */}
                  <button
                    className={`favorite-btn ${list.favorite ? 'active' : ''}`}
                    onClick={() => handleToggleFavorite(list.id)}
                    title="Marcar como favorito"
                  >
                    <i className="fi fi-rr-heart"></i>
                  </button>

                  {/* 🗑️ ÍCONO ELIMINAR */}
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteList(list.id)}
                    title="Eliminar lista"
                  >
                    <i className="fi fi-rr-trash"></i>
                  </button>

                  {/* ⚙️ ÍCONO CONFIGURAR (reemplaza la flecha) */}
                  <button
                    className="config-btn"
                    onClick={() => handleEditList(list)}
                    title="Configurar lista"
                  >
                    <i className="fi fi-rr-settings"></i>
                  </button>
                </div>
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
        onDeleteAsset={handleDeleteAsset}
      />
    </div>
  );
};

export default ListsManager;