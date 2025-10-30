import React, { useState } from 'react';

export default function BuySellPanel({ symbol, currentPrice, onShowPurchasePower }) {
  const [activeTab, setActiveTab] = useState('buy'); // 'buy' or 'sell'
  const [orderType, setOrderType] = useState('market'); // 'market', 'limit', etc.
  const [buyIn, setBuyIn] = useState('dollars'); // 'shares' or 'dollars'
  const [amount, setAmount] = useState('');

  const estimatedPriceRange = `${(currentPrice * 0.99).toFixed(2)} - ${(currentPrice * 1.01).toFixed(2)}`;
  const estimatedShares = buyIn === 'dollars' && amount > 0 ? (amount / currentPrice).toFixed(2) : (buyIn === 'shares' ? amount : '0.00');
  const closingCost = 0.15;
  const totalCost = buyIn === 'dollars' ? parseFloat(amount || 0) + closingCost : (buyIn === 'shares' ? (amount * currentPrice) + closingCost : closingCost);

  return (
    <aside className="buy-sell-panel glass-effect">
      <div className="buy-sell-tabs">
        <button 
          className={`tab ${activeTab === 'buy' ? 'active' : ''}`}
          onClick={() => setActiveTab('buy')}
        >
          Comprar {symbol}
        </button>
        <button 
          className={`tab ${activeTab === 'sell' ? 'active' : ''}`}
          onClick={() => setActiveTab('sell')}
        >
          Vender {symbol}
        </button>
      </div>

      <div className="panel-content">
        {activeTab === 'buy' ? (
          <>
            <div className="form-group-panel">
              <label>Tipo de compra</label>
              <select value={orderType} onChange={(e) => setOrderType(e.target.value)}>
                <option value="market">Mercado</option>
                <option value="limit">Límite</option>
              </select>
            </div>

            <div className="form-group-panel">
              <label>Comprar en</label>
              <div className="toggle-buttons">
                <button 
                  className={buyIn === 'shares' ? 'active' : ''} 
                  onClick={() => setBuyIn('shares')}
                >
                  Acciones
                </button>
                <button 
                  className={buyIn === 'dollars' ? 'active' : ''} 
                  onClick={() => setBuyIn('dollars')}
                >
                  Dólares
                </button>
              </div>
            </div>

            <div className="form-group-panel">
              <label>{buyIn === 'shares' ? 'Acciones' : 'Monto'}</label>
              <input 
                type="number" 
                placeholder={buyIn === 'dollars' ? '$0.00' : '0'} 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
              />
            </div>

            <div className="order-summary">
              <div className="summary-item">
                <span>Precio Est. ⓘ</span>
                <span>${estimatedPriceRange}</span>
              </div>
              <div className="summary-item">
                <span>Acciones est.</span>
                <span>{estimatedShares}</span>
              </div>
              <div className="summary-item">
                <span>Costo de cierre ⓘ</span>
                <span>+${closingCost.toFixed(2)}</span>
              </div>
              <div className="summary-item total">
                <span>Total</span>
                <span>${totalCost.toFixed(2)}</span>
              </div>
            </div>

            <div className="panel-actions">
              <button className="btn-secondary-panel">Monto máximo</button>
              <button className="btn-primary-panel" disabled={!amount || amount <= 0}>Continuar</button>
            </div>

            <div className="purchase-power">
              <span>Poder de compra ${0.00.toFixed(2)}</span>
              <button className="info-button" onClick={onShowPurchasePower}>+</button>
            </div>
          </>
        ) : (
          <div className="sell-placeholder">
            <p>Formulario de venta irá aquí.</p>
          </div>
        )}
      </div>
    </aside>
  );
}