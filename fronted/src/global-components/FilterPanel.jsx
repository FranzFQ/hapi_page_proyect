import React from 'react';
import '../style/FilterPanel.css';

const FilterPanel = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'todos', label: 'Todos', icon: 'fi fi-rr-apps' },
    { id: 'acciones', label: 'Acciones', icon: 'fi fi-rr-chart-line-up' },
    { id: 'cripto', label: 'Cripto', icon: 'fi fi-rr-bitcoin' },
    { id: 'fondos', label: 'Fondos', icon: 'fi fi-rr-piggy-bank' },
  ];

  return (
    <div className="filter-panel">
      <div className="filter-chips">
        {filters.map(filter => (
          <button
            key={filter.id}
            className={`filter-chip ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.id)}
            type="button"
          >
            <i className={filter.icon}></i>
            <span>{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;