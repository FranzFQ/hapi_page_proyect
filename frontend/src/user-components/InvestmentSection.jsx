import React from 'react';
import '../style/UserHome.css';


export default function InvestmentSection({ balance }) {
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(balance || 0);
  
  return (
    <div className="investment-section">
      <div className="investment-info">
        <span className="investment-label">EMPIEZA A INVERTIR</span>
        <p className="investment-amount">{formattedBalance}</p>
      </div>
      <div className="action-buttons">
        <button className="action-btn">DEPOSITAR</button>
        <button className="action-btn">RETIRAR</button>
        <button className="action-btn">INVERTIR</button>
      </div>
    </div>
  );
};


