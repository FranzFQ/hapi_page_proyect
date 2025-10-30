import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import FilterPanel from './FilterPanel.jsx';
import SearchResults from './SearchResults.jsx';
import '../style/SearchDropdown.css';

const SearchDropdown = ({ searchValue, onClose }) => {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const dropdownContent = (
    <div className="search-overlay">
      <div className="search-dropdown">
        <FilterPanel 
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        
        <SearchResults 
          searchValue={searchValue}
          results={searchResults}
          isLoading={isLoading}
          activeFilter={activeFilter}
          onClose={onClose}
        />
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    dropdownContent,
    document.body
  );
};

export default SearchDropdown;