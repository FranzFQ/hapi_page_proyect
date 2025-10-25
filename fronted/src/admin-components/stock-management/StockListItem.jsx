import React from 'react';

export default function StockListItem({ stock, onDetailsClick }) {
  const statusClass = stock.status === 'Activo' ? 'status-active' : 'status-inactive';

  return (
    <div className="stock-list-item fade-in">
      <div className="stock-info">
        <span className="stock-symbol">{stock.symbol}</span>
        <span className="stock-name">{stock.name}</span>
        <span className="stock-price">${stock.price.toFixed(2)}</span>
        <span className="stock-volume">{stock.volume.toLocaleString()}</span>
        <span className={`stock-status ${statusClass}`}>{stock.status}</span>
      </div>
      <div className="stock-actions">
        <button className="btn-details" onClick={() => onDetailsClick(stock.id)}>
          Detalles
        </button>
      </div>
    </div>
  );
}