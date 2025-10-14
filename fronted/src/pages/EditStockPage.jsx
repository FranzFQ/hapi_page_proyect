import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StockForm from '../admin-components/stock-management/StockForm';
import PageHeader from '../admin-components/stock-management/PageHeader';
import '../style/AdminStocks.css';

const mockStockDatabase = [
  { id: '1', symbol: 'AAPL', name: 'Apple Inc.', price: 182.63, category: 'Technology', description: 'A leading company in consumer electronics.' },
  { id: '2', symbol: 'MSFT', name: 'Microsoft Corp.', price: 415.50, category: 'Technology', description: 'A multinational technology corporation.' },
  { id: '3', symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 174.45, category: 'E-commerce', description: 'Focuses on e-commerce, cloud computing, and AI.' },
];

const fetchStockById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stock = mockStockDatabase.find(s => s.id === id);
      resolve(stock);
    }, 500);
  });
};

export default function EditStockPage() {
  const { stockId } = useParams();
  const navigate = useNavigate();
  const [stockToEdit, setStockToEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStockData = async () => {
      setLoading(true);
      const data = await fetchStockById(stockId);
      setStockToEdit(data);
      setLoading(false);
    };
    loadStockData();
  }, [stockId]);

  const handleEditStock = (data) => {
    console.log(`Guardando cambios para la acción ${stockId}:`, data);
    navigate('/admin/stocks');
  };

  const handleCancel = () => {
    navigate(`/admin/stocks/${stockId}`);
  };
  
  if (loading) {
    return <div className="admin-page-container"><h2>Cargando datos de la acción...</h2></div>;
  }

  if (!stockToEdit) {
    return (
      <div className="admin-page-container">
        <PageHeader title="Error" showBackButton={true} showSearchBar={false} />
        <h2>Acción no encontrada</h2>
        <p>No se encontró ninguna acción con el ID: {stockId}</p>
      </div>
    );
  }

  return (
    <div className="admin-page-container">
      <PageHeader title={`Editar ${stockToEdit.symbol}`} showBackButton={true} showSearchBar={false} />
      <div className="admin-scrollable-content">
        <StockForm 
          initialData={stockToEdit} 
          isEditing={true} 
          onSubmit={handleEditStock}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}