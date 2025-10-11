import React from 'react';
import '../style/SearchResults.css';

const SearchResults = ({ searchValue, results, isLoading, activeFilter, onClose }) => {
  const filterLabels = {
    todos: 'Todos',
    acciones: 'Acciones',
    fondos: 'Fondos',
    cripto: 'Cripto'
  };

  const handleResultClick = (item) => {
    console.log('Seleccionado:', item);
    onClose();
  };

  if (!searchValue || searchValue.trim().length === 0) {
    return (
      <div className="search-results-container">
        <div className="search-header-with-close">
          <span className="search-title">Buscar activos</span>
          <button className="close-search-btn" onClick={onClose}>
            <i className="fi fi-rr-cross"></i>
          </button>
        </div>
        <div className="empty-state">
          <i className="fi fi-br-search"></i>
          <p>Escribe para comenzar a buscar</p>
          <span className="empty-hint">Prueba: "Apple", "Bitcoin", "S&P 500"</span>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="search-results-container">
        <div className="search-header-with-close">
          <span className="search-title">Buscando...</span>
          <button className="close-search-btn" onClick={onClose}>
            <i className="fi fi-rr-cross"></i>
          </button>
        </div>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Buscando...</p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="search-results-container">
        <div className="search-header-with-close">
          <span className="search-title">Sin resultados</span>
          <button className="close-search-btn" onClick={onClose}>
            <i className="fi fi-rr-cross"></i>
          </button>
        </div>
        <div className="empty-state">
          <i className="fi fi-rr-search-alt"></i>
          <p>No se encontraron resultados</p>
          <span className="empty-hint">Intenta con otro término o cambia los filtros</span>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-container">
      <div className="search-header-with-close">
        <div className="results-header-info">
          <span className="results-count">
            {results.length} resultado{results.length !== 1 ? 's' : ''}
          </span>
          <span className="results-filter">en {filterLabels[activeFilter]}</span>
        </div>
        <button className="close-search-btn" onClick={onClose}>
          <i className="fi fi-rr-cross"></i>
        </button>
      </div>

      <div className="results-list">
        {results.map(item => (
          <button 
            key={item.id} 
            className="result-item"
            onClick={() => handleResultClick(item)}
            type="button"
          >
            <div className="result-icon">
              <i className={`fi ${
                item.type === 'acciones' ? 'fi-rr-chart-line-up' : 
                item.type === 'cripto' ? 'fi-rr-bitcoin' : 
                'fi-rr-piggy-bank'
              }`}></i>
            </div>
            
            <div className="result-info">
              <div className="result-name">{item.name}</div>
              <div className="result-symbol">{item.symbol}</div>
            </div>
            
            <div className="result-price">
              <div className="price">${item.price.toLocaleString('es-GT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <div className={`change ${item.change.includes('+') ? 'positive' : 'negative'}`}>
                {item.change}
              </div>
            </div>
            
            <i className="fi fi-rr-angle-right result-arrow"></i>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;