import React from 'react';
import { useNavigate } from 'react-router-dom';
import StockForm from '../admin-components/stock-management/StockForm';
import PageHeader from '../admin-components/stock-management/PageHeader';
import '../style/AdminStocks.css';

export default function AddStockPage() {
  const navigate = useNavigate();

  const handleAddStock = (data) => {
    console.log('Añadiendo nueva acción:', data);
    navigate('/admin/stocks');
  };

  const handleCancel = () => {
    navigate('/admin/stocks');
  };

  return (
    <div className="admin-page-container">
      <PageHeader title="Añadir Nueva Acción" showBackButton={true} showSearchBar={false} />
      <div className="admin-scrollable-content">
        <StockForm 
          onSubmit={handleAddStock}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}