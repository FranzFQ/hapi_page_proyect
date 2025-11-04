import React, { useEffect, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const FilterDropdown = ({ options, activeFilter, onFilterChange, onClose, parentRef }) => {
  const [position, setPosition] = useState({ top: -9999, left: -9999 });

  useLayoutEffect(() => {
    if (parentRef && parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        left: rect.left,
      });
    }
  }, [parentRef]);

  useEffect(() => {
    const handleEscape = (event) => event.key === 'Escape' && onClose();
    const handleClickOutside = (event) => {
      if (parentRef && parentRef.current && !parentRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, parentRef]);

  const handleSelect = (optionId) => {
    onFilterChange(optionId);
    onClose();
  };

  const dropdownContent = (
    <div 
      className="filter-dropdown fade-in" 
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="filter-header">
        <p>Filtrar por</p>
      </div>
      <ul className="filter-options-list">
        {options.map(option => (
          <li 
            key={option.id} 
            className={`filter-option ${activeFilter === option.id ? 'active' : ''}`}
            onClick={() => handleSelect(option.id)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );

  return ReactDOM.createPortal(dropdownContent, document.body);
};

export default FilterDropdown;