import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TimeSeriesChart from '../global-components/TimeSeriesChart';
import ConfirmationModal from '../admin-components/stock-management/ConfirmationModal';
import PageHeader from '../admin-components/stock-management/PageHeader';
import '../style/AdminStocks.css';

const mockStockDatabase = [
  { id: '1', symbol: 'AAPL', name: 'Apple Inc.', category: 'Technology', tradingVolume: '54,321', date: '2025-10-14', currentPrice: 182.63, previousPrice: 180.15, status: 'Disponible' },
  { id: '2', symbol: 'MSFT', name: 'Microsoft Corp.', category: 'Technology', tradingVolume: '87,654', date: '2025-10-14', currentPrice: 415.50, previousPrice: 410.20, status: 'Disponible' },
  { id: '3', symbol: 'AMZN', name: 'Amazon.com, Inc.', category: 'E-commerce', tradingVolume: '123,456', date: '2025-10-14', currentPrice: 174.45, previousPrice: 175.00, status: 'No Disponible' },
];

const fetchStockById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stock = mockStockDatabase.find(s => s.id === id);
      resolve(stock);
    }, 500);
  });
};

export default function StockDetailsPage() {
  const { stockId } = useParams();
  const navigate = useNavigate();
  const [stockDetails, setStockDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadStockData = async () => {
      setLoading(true);
      const data = await fetchStockById(stockId);
      setStockDetails(data);
      setLoading(false);
    };
    loadStockData();
  }, [stockId]);

  const handleDelete = () => {
    console.log(`Deleting stock ${stockId}...`);
    setShowModal(false);
    navigate('/admin/stocks');
  };

  const handleDeactivate = () => {
    console.log(`Deactivating stock ${stockId}...`);
    setShowModal(false);
    navigate('/admin/stocks');
  };

  if (loading) {
    return <div className="admin-page-container"><h2>Cargando detalles de la acción...</h2></div>;
  }

  if (!stockDetails) {
    return (
      <div className="admin-page-container">
        <PageHeader title="Error" showBackButton={true} showSearchBar={false} />
        <h2>Acción no encontrada</h2>
        <p>No se encontró ninguna acción con el ID: {stockId}</p>
      </div>
    );
  }

  const changePercent = ((stockDetails.currentPrice - stockDetails.previousPrice) / stockDetails.previousPrice) * 100;

  return (
    <div className="admin-page-container fade-in">
      {/* AQUÍ ESTÁ EL CAMBIO */}
      <PageHeader title={`Detalles de ${stockDetails.symbol}`} showBackButton={true} showSearchBar={false} />

      <div className="admin-scrollable-content details-layout">
        <div className="details-grid">
          <div className="detail-item">
            <label>Símbolo</label>
            <p>{stockDetails.symbol}</p>
          </div>
          <div className="detail-item">
            <label>Precio Actual</label>
            <p>${stockDetails.currentPrice.toFixed(2)}</p>
          </div>
          <div className="detail-item">
            <label>Nombre</label>
            <p>{stockDetails.name}</p>
          </div>
          <div className="detail-item">
            <label>Precio Anterior (Cambio en %)</label>
            <p>${stockDetails.previousPrice.toFixed(2)} ({changePercent.toFixed(2)}%)</p>
          </div>
          <div className="detail-item">
            <label>Categoría</label>
            <p>{stockDetails.category}</p>
          </div>
          <div className="detail-item">
            <label>Estado</label>
            <p>{stockDetails.status}</p>
          </div>
          <div className="detail-item">
            <label>Volumen de Trading</label>
            <p>{stockDetails.tradingVolume}</p>
          </div>
          <div className="detail-item full-width">
            <button className="btn-secondary">Ver Historial de Precios</button>
          </div>
          <div className="detail-item">
            <label>Fecha</label>
            <p>{stockDetails.date}</p>
          </div>
        </div>
        <div className="details-chart">
          <TimeSeriesChart />
        </div>
        <div className="details-actions">
          <button className="btn-edit" onClick={() => navigate(`/admin/stocks/edit/${stockId}`)}>Editar</button>
          <button className="btn-delete" onClick={() => setShowModal(true)}>Eliminar</button>
          <button className="btn-deactivate" onClick={() => setShowModal(true)}>Desactivar</button>
        </div>
        {showModal && (
          <ConfirmationModal 
            stock={stockDetails}
            onCancel={() => setShowModal(false)}
            onDelete={handleDelete}
            onDeactivate={handleDeactivate}
          />
        )}
      </div>
    </div>
  );
}