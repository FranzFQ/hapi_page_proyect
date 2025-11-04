import React, { useState, useRef } from 'react';
import FilterDropdown from './FilterDropdown.jsx';
import '../style/Filter.css';

const FilterButton = ({ options, activeFilter, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  return (
    <div className="filter-wrapper">
      <button 
        ref={buttonRef}
        className="filter-button" 
        onClick={() => setIsOpen(true)}
      >
        <span>Filtros</span>
        <i className="fi fi-rr-filters"></i>
      </button>

      {isOpen && (
        <FilterDropdown
          options={options}
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
          onClose={() => setIsOpen(false)}
          parentRef={buttonRef}
        />
      )}
    </div>
  );
};

export default FilterButton;