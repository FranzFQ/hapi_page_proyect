import React from 'react';

export default function StockAboutSection({ about }) {
  return (
    <div className="stock-about-section glass-effect">
      <h3>Acerca de</h3>
      <p>{about}</p>
    </div>
  );
}