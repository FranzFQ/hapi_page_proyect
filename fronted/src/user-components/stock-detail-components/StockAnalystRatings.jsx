import React from 'react';

export default function StockAnalystRatings({ ratings }) {
  return (
    <div className="stock-analyst-ratings glass-effect">
      <h3>Recomendaciones Analistas</h3>
      <div className="ratings-summary">
        <div className="rating-circle">
          <span>Comprar</span>
        </div>
        <div className="ratings-bars">
          <div className="rating-bar-item">
            <span>Comprar {ratings.buy.toFixed(2)}%</span>
            <div className="bar-container">
              <div className="bar buy-bar" style={{ width: `${ratings.buy}%` }}></div>
            </div>
          </div>
          <div className="rating-bar-item">
            <span>Mantener {ratings.hold.toFixed(2)}%</span>
            <div className="bar-container">
              <div className="bar hold-bar" style={{ width: `${ratings.hold}%` }}></div>
            </div>
          </div>
           <div className="rating-bar-item">
            <span>Vender {ratings.sell.toFixed(2)}%</span>
            <div className="bar-container">
              <div className="bar sell-bar" style={{ width: `${ratings.sell}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}