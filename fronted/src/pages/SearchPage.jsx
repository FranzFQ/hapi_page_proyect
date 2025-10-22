import React, { useState } from 'react';
import Header from '../user-components/Header';
import Sidebar from '../user-components/Sidebar';
import SearchBar from '../global-components/SearchBar';
import SearchCategories from '../global-components/SearchCategories';
import TopGainers from '../global-components/TopGainers';
import '../style/UserHome.css';
import '../style/UserGlobal.css';
import '../style/SearchPage.css';

const mockCategories = [
  'Banca', 'Salud', 'Energía', 'Más Populares', 'Consumo Masivo', 'Energía y Agua', 
  'Tecnología', 'ETFs', 'Dividend Kings', 'Inteligencia Artificial' 
];
const mockTopGainers = [
  { symbol: 'RANI', price: '$1.83', change: '+0.19 (+11.58%)' },
  { symbol: 'ARTV', price: '$5.43', change: '-0.58 (-9.65%)' },
];

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    console.log("Buscando:", e.target.value);
  };

  const handleCategoryClick = (category) => {
    console.log("Categoría seleccionada:", category);
    setSearchTerm(category); 
  };

  const handleGainerClick = (symbol) => {
    console.log("Gainer seleccionado:", symbol);
    setSearchTerm(symbol);
  };

  return (
    <div className="dashboard-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="center-content">
          <div className="page-content-wrapper fade-in">
            <h2 className="page-title">Busca tu siguiente inversión</h2>
            
            <div className="search-input-section">
              <SearchBar 
                placeholder="Busca una empresa o ETF" 
                value={searchTerm} 
                onChange={handleSearchChange} 
              />
            </div>
            
            <SearchCategories 
              categories={mockCategories}
              onCategoryClick={handleCategoryClick}
            />
            
            <TopGainers 
              gainers={mockTopGainers}
              onItemClick={handleGainerClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}