import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/SearchPage.css';

export default function TopGainers({ gainers }) {
  const navigate = useNavigate();

  const handleGainerClick = (symbol) => {
    navigate(`/stock/${symbol}`);
  };

  return (
    <div className="top-section-search glass-effect">
      <h3 className="section-subtitle">Top Ganadores</h3>
      <div className="top-list-search">
        {gainers.map((item, index) => (
          <div 
            key={index} 
            className="top-item-card"
            onClick={() => handleGainerClick(item.symbol)}
          >
            <span className="item-symbol">{item.symbol}</span>
            <span className="item-price">{item.price}</span>
            <span className={`item-change ${item.change.includes('+') ? 'positive' : 'negative'}`}>
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}