import React, { useState, useEffect } from 'react';
import { searchAllStocks } from '../service/User.api.js';
import ReactDOM from 'react-dom';

import FilterPanel from './FilterPanel.jsx';
import SearchResults from './SearchResults.jsx';
import '../style/SearchDropdown.css';

const SearchDropdown = ({ searchValue, onClose }) => {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allStocks, setAllStocks] = useState([]);

  // Función para transformar datos de API a formato frontend
  const transformApiData = (apiData) => {
    const categoryToTypeMap = {
      1: 'acciones',
      2: 'acciones', 
      3: 'acciones',
      4: 'acciones',
      5: 'criptomonedas',
      6: 'ETFs'
    };

    return apiData.map(stock => {
      const changeValue = parseFloat((stock.variation/stock.last_price * 100).toFixed(2));
      const changeSign = changeValue >= 0 ? '+' : '';
      
      return {
        id: stock.id,
        name: stock.name,
        type: categoryToTypeMap[stock.stock_category_id] || 'acciones',
        symbol: stock.symbol,
        price: parseFloat(stock.last_price),
        change: `${changeSign}${changeValue}%`
      };
    });
  };

  // Cargar todos los stocks al montar el componente
  useEffect(() => {
    const loadAllStocks = async () => {
      try {
        console.log('Cargando todos los stocks de la API...');
        const response = await searchAllStocks();
        console.log('Respuesta de API:', response);
        
        const transformedData = transformApiData(response.data || response);
        console.log('Datos transformados:', transformedData);
        
        setAllStocks(transformedData);
      } catch (error) {
        console.error('Error cargando stocks:', error);
        // Si hay error, dejar allStocks vacío
        setAllStocks([]);
      }
    };
    
    loadAllStocks();
  }, []);

  const performSearch = (query, filter) => {
    if (!query || query.trim().length === 0) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const queryLower = query.toLowerCase().trim();
      
      // Filtrar desde todos los stocks cargados (igual que tu mock original)
      const filteredResults = allStocks.filter(item => {
        const matchesFilter = filter === 'todos' || item.type === filter;
        const matchesSearch = 
          item.name.toLowerCase().includes(queryLower) || 
          item.symbol.toLowerCase().includes(queryLower);
        
        return matchesFilter && matchesSearch;
      });

      console.log('🔍 Resultados filtrados:', filteredResults);
      setSearchResults(filteredResults);
      setIsLoading(false);
    }, 200);
  };

  useEffect(() => {
    performSearch(searchValue, activeFilter);
  }, [searchValue, activeFilter, allStocks]); // Agregamos allStocks a las dependencias

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