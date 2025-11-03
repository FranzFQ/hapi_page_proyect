import React, { useState } from 'react';
import { createTransaction } from '../../service/User.api.js';

export default function BuySellPanel({ symbol, currentPrice, onShowPurchasePower, stockId }) {
  const [activeTab, setActiveTab] = useState('buy'); // 'buy' or 'sell'
  const [orderType, setOrderType] = useState('market'); // 'market', 'limit', etc.
  const [buyIn, setBuyIn] = useState('dollars'); // 'shares' or 'dollars'
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const estimatedPriceRange = `${(currentPrice * 0.99).toFixed(2)} - ${(currentPrice * 1.01).toFixed(2)}`;
  const estimatedShares = buyIn === 'dollars' && amount > 0 ? (amount / currentPrice).toFixed(6) : (buyIn === 'shares' ? amount : '0.000000');
  const closingCost = 0.15;
  const totalCost = buyIn === 'dollars' ? parseFloat(amount || 0) + closingCost : (buyIn === 'shares' ? (amount * currentPrice) + closingCost : closingCost);

  // Función para manejar la compra/venta
  const handleTransaction = async () => {
  if (!amount || amount <= 0) return;

  setIsLoading(true);
  
  try {
    // Obtener el ID correcto - usa "client_profile_id" en lugar de "client_profile"
    const clientId = localStorage.getItem("client_profile_id") || localStorage.getItem("clientId");
    const userId = localStorage.getItem("userId");
    
    if (!clientId) {
      alert("Error: No se encontró la información del cliente. Por favor inicia sesión nuevamente.");
      return;
    }

    // Calcular cantidad y precio unitario
    const quantity = buyIn === 'dollars' ? (amount / currentPrice) : parseFloat(amount);
    const unitPrice = currentPrice;

    // Preparar los datos de la transacción en el formato CORRECTO que espera tu backend
    const transactionData = {
      type: activeTab === 'buy' ? 'compra' : 'venta',
      client_profile_id: parseInt(clientId), // ← CAMBIO IMPORTANTE: client_profile_id en lugar de client_profile
      details: [
        {
          stock_id: stockId, // ← CAMBIO IMPORTANTE: stock_id en lugar de stock
          quantity: quantity.toFixed(4),
          unit_price: unitPrice.toFixed(2)
        }
      ]
    };

    console.log('Enviando transacción:', transactionData);

    // Llamar a la API para crear la transacción
    const response = await createTransaction(transactionData);
    console.log('Transacción creada:', response);

    // Mostrar mensaje de éxito
    alert(`¡${activeTab === 'buy' ? 'Compra' : 'Venta'} realizada exitosamente!`);
    
    // Limpiar el formulario
    setAmount('');
    
    // Opcional: Recargar datos o notificar al componente padre
    if (window.refreshPortfolio) {
      window.refreshPortfolio();
    }

  } catch (error) {
    console.error('Error en la transacción:', error);
    alert(`Error al realizar la ${activeTab === 'buy' ? 'compra' : 'venta'}. Por favor intenta nuevamente.`);
  } finally {
    setIsLoading(false);
  }
};

  // Función para usar el monto máximo disponible
  const handleMaxAmount = () => {
    // Aquí podrías obtener el poder de compra real desde una API
    const purchasePower = 1000.00; // Ejemplo - deberías obtener esto de tu API
    if (buyIn === 'dollars') {
      setAmount((purchasePower - closingCost).toFixed(2));
    } else {
      setAmount(((purchasePower - closingCost) / currentPrice).toFixed(6));
    }
  };

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
                step={buyIn === 'dollars' ? '0.01' : '0.000001'}
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
              <button 
                className="btn-secondary-panel" 
                onClick={handleMaxAmount}
                type="button"
              >
                Monto máximo
              </button>
              <button 
                className="btn-primary-panel" 
                disabled={!amount || amount <= 0 || isLoading}
                onClick={handleTransaction}
              >
                {isLoading ? 'Procesando...' : 'Continuar'}
              </button>
            </div>

            <div className="purchase-power">
              <span>Poder de compra ${0.00.toFixed(2)}</span>
              <button className="info-button" onClick={onShowPurchasePower}>+</button>
            </div>
          </>
        ) : (
          <div className="sell-content">
            <p>Funcionalidad de venta en desarrollo...</p>
            <button 
              className="btn-primary-panel" 
              disabled={true}
            >
              Próximamente
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}