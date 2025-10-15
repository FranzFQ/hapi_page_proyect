import React, { useState, useRef, useEffect } from 'react';
import SearchDropdown from './SearchDropdown.jsx';
import '../style/SearchBar.css';

const SearchBar = ({ placeholder = "Buscar acciones, cripto, fondos..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        const isInDropdown = event.target.closest('.search-dropdown');
        if (!isInDropdown) {
          setIsOpen(false);
        }
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    if (!isOpen && e.target.value.length > 0) {
      setIsOpen(true);
    }
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleClear = () => {
    setSearchValue('');
    setIsOpen(false);
  };

  return (
    <div className="search-bar-wrapper" ref={searchRef}>
      <div className={`search-bar-container ${isOpen ? 'search-active' : ''}`}>
        <i className="fi fi-br-search search-bar-icon"></i>
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
        />
        {searchValue && (
          <button 
            className="search-clear-btn"
            onClick={handleClear}
            type="button"
          >
            <i className="fi fi-rr-cross-small"></i>
          </button>
        )}
      </div>

      {isOpen && (
        <SearchDropdown 
          searchValue={searchValue}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;