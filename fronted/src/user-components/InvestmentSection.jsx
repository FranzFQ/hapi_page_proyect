import React from 'react';
import '../style/UserHome.css';
import { useNavigate } from 'react-router-dom';


export default function InvestmentSection({ balance, userName }) {
  const navigate = useNavigate()
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(balance || 0);
  
  const goToDeposit = (() => {
    navigate("/banking/deposit")
  })

  const goToWithdraw = (() => {
    navigate("/banking/withdraw")
  })

  const goToInvest = (() => {
    navigate("/search")
  })

  return (
    <div className="investment-section">
      <span className="investment-label">Bienvenido</span>
      <span className="investment-label">{userName}</span>
      <div className="investment-info">
        <span className="investment-label">EMPIEZA A INVERTIR</span>
        <p className="investment-amount">{formattedBalance}</p>
      </div>
      <div className="action-buttons">
        <button className="action-btn" onClick={goToDeposit}>DEPOSITAR</button>
        <button className="action-btn" onClick={goToWithdraw}>RETIRAR</button>
        <button className="action-btn" onClick={goToInvest}>INVERTIR</button>
      </div>
    </div>
  );
};


