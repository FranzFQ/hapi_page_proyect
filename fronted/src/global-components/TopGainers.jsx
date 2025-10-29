import React from 'react';
import '../style/SearchPage.css';

export default function TopGainers({ gainers, onItemClick }) {
  return (
    <div className="top-section-search glass-effect">
      <h3 className="section-subtitle">Top Ganadores</h3>
      <div className="top-list-search">
        {gainers.map((item, index) => (
          <div 
            key={index} 
            className="top-item-card"
            onClick={() => onItemClick(item.symbol)}
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