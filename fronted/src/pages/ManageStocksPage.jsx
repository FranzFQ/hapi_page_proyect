import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../admin-components/stock-management/PageHeader';
import StockListItem from '../admin-components/stock-management/StockListItem';
import FilterButton from '../global-components/FilterButton';
import '../style/AdminStocks.css';

const mockStocks = [
  { id: '1', symbol: 'AAPL', name: 'Apple Inc.', price: 182.63, volume: 54321, status: 'Activo', category: 'Tech' },
  { id: '2', symbol: 'MSFT', name: 'Microsoft Corp.', price: 415.50, volume: 87654, status: 'Activo', category: 'Tech' },
  { id: '3', symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 174.45, volume: 123456, status: 'Inactivo', category: 'Retail' },
];

const filterOptions = [
  { id: 'all', label: 'Todas las categorías' },
  { id: 'price_high', label: 'Precio más alto' },
  { id: 'price_low', label: 'Precio más bajo' },
  { id: 'volume_high', label: 'Volumen más alto' },
  { id: 'volume_low', label: 'Volumen más bajo' },
];

export default function ManageStocksPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  const handleFilterChange = (filterId) => {
    console.log("Filtro seleccionado:", filterId);
    setActiveFilter(filterId);
  };

  const handleDetails = (stockId) => navigate(`/admin/stocks/${stockId}`);
  const handleAdd = () => navigate('/admin/stocks/add');
  
  const handlePreviousPage = () => console.log('Cargando página anterior...');
  const handleNextPage = () => console.log('Cargando página siguiente...');
  const handleResetPage = () => navigate('/admin/stocks');

  return (
    <div className="admin-page-container fade-in">
      <PageHeader title="Acciones">
        <FilterButton 
          options={filterOptions}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
        <button className="btn-logout" onClick={() => navigate('/home')}>Cerrar Sesión</button>
      </PageHeader>
      
      <div className="admin-content-area">
        <div className="stock-list-header">
          <span>Símbolo | Nombre | Precio | Volumen de Trading | Estado</span>
        </div>
        <div className="stock-list">
          {mockStocks.map(stock => (
            <StockListItem key={stock.id} stock={stock} onDetailsClick={handleDetails} />
          ))}
        </div>
      </div>
      
      <footer className="admin-page-footer">
        <div className="pagination">
          <button onClick={handlePreviousPage} title="Página Anterior">&laquo;</button>
          <button onClick={handleResetPage} className="power-btn" title="Volver al inicio de Acciones">
            <i className="fi fi-rr-power"></i>
          </button>
          <button onClick={handleNextPage} title="Página Siguiente">&raquo;</button>
        </div>
        <button className="btn-primary" onClick={handleAdd}>Añadir Acción</button>
      </footer>
    </div>
  );
}