import React from 'react';
import ReactDOM from 'react-dom';

export default function PurchasingPowerModal({ onClose }) {
  const myMoney = 0.00;
  const purchasingPower = 0.00;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="purchasing-power-modal glass-effect fade-in" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-button" onClick={onClose}>&times;</button>
        <h2>Poder de compra</h2>
        <div className="power-details">
          <div className="power-item">
            <span>Mi dinero</span>
            <span>${myMoney.toFixed(2)}</span>
          </div>
          <div className="power-item">
            <span>Poder de compra</span>
            <span>${purchasingPower.toFixed(2)}</span>
          </div>
        </div>
        <p className="modal-info-text">
          Tu poder de compra puede cambiar si tienes ventas en proceso o dinero reservado por compras programadas. 
          <a href="#" target="_blank" rel="noopener noreferrer"> Aprende más</a>
        </p>
        <button className="btn-primary-modal" onClick={() => console.log('Navegar a Agregar Fondos')}>
          Agregar fondos
        </button>
      </div>
    </div>,
    document.body
  );
}