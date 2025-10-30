import React from 'react';

export default function StockHeader({ data }) {
  const isPositive = data.changeValue >= 0;
  return (
    <div className="stock-header-detail">
      <div className="stock-title">
        <h1>{data.symbol}</h1>
        <h2>{data.name}</h2>
      </div>
      <div className="stock-price-detail">
        <span className="current-price">${data.price.toFixed(2)}</span>
        <span className={`change-detail ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '+' : ''}${data.changeValue.toFixed(2)} ({isPositive ? '+' : ''}{data.changePercent.toFixed(2)}%) Hoy
        </span>
      </div>
      <div className="stock-actions-detail">
        <button className="icon-button"><i className="fi fi-rr-star"></i></button>
        <button className="icon-button"><i className="fi fi-rr-share"></i></button>
      </div>
    </div>
  );
}