import React from 'react';
import '../style/UserHome.css';

const InvestmentSection = () => {
  return (
    <div className="investment-section">
      <div className="investment-info">
        <span className="investment-label">EMPIEZA A INVERTIR</span>
        <span className="investment-amount">$ 0.00</span>
      </div>
      <div className="action-buttons">
        <button className="action-btn">DEPOSITAR</button>
        <button className="action-btn">RETIRAR</button>
        <button className="action-btn primary">INVERTIR</button>
      </div>
    </div>
  );
};

export default InvestmentSection;
