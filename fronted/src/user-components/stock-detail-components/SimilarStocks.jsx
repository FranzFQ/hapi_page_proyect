import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SimilarStocks({ similar }) {
  const navigate = useNavigate();

  const handleClick = (symbol) => {
    navigate(`/stock/${symbol}`);
  };

  if (!similar || similar.length === 0) {
    return null; // No renderiza nada si no hay datos
  }

  return (
    <div className="similar-stocks-section glass-effect">
      <h3>Activos Similares</h3>
      <div className="similar-list">
        {similar.map(stock => (
          <button 
            key={stock.symbol} 
            className="similar-item"
            onClick={() => handleClick(stock.symbol)}
          >
            <img src={stock.logoUrl || `https://via.placeholder.com/30?text=${stock.symbol}`} alt={`${stock.name} logo`} className="similar-logo"/>
            <span>{stock.symbol}</span>
            <span className="similar-name">{stock.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}