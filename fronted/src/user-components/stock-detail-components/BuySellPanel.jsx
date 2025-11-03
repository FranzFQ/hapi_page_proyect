import React, { useState, useEffect } from 'react';
// En tus imports, asegúrate de tener:
import { 
  createTransaction, 
  getPortfolioByClientId, 
  createPortfolio, 
  updatePortafolio,
  createPortfolioInvestment,
  updatePortfolioInvestment  // ← AGREGAR ESTE IMPORT
} from '../../service/User.api.js';

export default function BuySellPanel({ symbol, currentPrice, onShowPurchasePower, stockId }) {
  const [activeTab, setActiveTab] = useState('buy');
  const [orderType, setOrderType] = useState('market');
  const [buyIn, setBuyIn] = useState('dollars');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [availableShares, setAvailableShares] = useState(0);

  // Cargar acciones disponibles cuando cambie a venta
  useEffect(() => {
    if (activeTab === 'sell') {
      loadAvailableShares();
    }
  }, [activeTab, symbol, stockId]);

  // Función para cargar acciones disponibles
  const loadAvailableShares = async () => {
    try {
      const clientId = localStorage.getItem("client_profile_id") || localStorage.getItem("clientId");
      
      if (!clientId) {
        console.log('❌ No hay clientId');
        setAvailableShares(0);
        return;
      }

      // INTENTAR OBTENER DATOS REALES
      try {
        const portfolioResponse = await getPortfolioByClientId(clientId);
        console.log('📊 Respuesta real de portfolio:', portfolioResponse);
        
        let stocksData = portfolioResponse.data || portfolioResponse;
        let userStock = null;
        
        if (stocksData && Array.isArray(stocksData)) {
          userStock = stocksData.find(stock => 
            stock.symbol === symbol || 
            stock.stock_id === stockId ||
            stock.stock?.id === stockId
          );
        }
        
        if (userStock) {
          const quantity = parseFloat(userStock.quantity || userStock.shares || 0);
          setAvailableShares(quantity);
          console.log(`✅ Acciones reales de ${symbol}: ${quantity}`);
          return;
        }
      } catch (error) {
        console.log('⚠️ Error obteniendo portafolio real:', error);
      }

      // DATOS MOCK TEMPORALES
      console.log('🔄 Usando datos mock temporales');
      const mockShares = {
        'AAPL': 15.5,
        'MSFT': 8.2,
        'TSLA': 3.1,
        'GOOGL': 2.5,
        'AMZN': 4.0,
        'NVDA': 6.7
      };
      const mockQuantity = mockShares[symbol] || 5.0;
      setAvailableShares(mockQuantity);
      console.log(`📊 Acciones mock de ${symbol}: ${mockQuantity}`);

    } catch (error) {
      console.error('❌ Error cargando stocks:', error);
      setAvailableShares(5.0);
    }
  };

  // Función para actualizar el portafolio
  // Función para actualizar el portafolio CORREGIDA
  const updateUserPortfolio = async (transactionData) => {
    try {
      const clientId = localStorage.getItem("client_profile_id") || localStorage.getItem("clientId");
      if (!clientId) return;

      console.log('🔄 Actualizando portafolio investment...');
      
      // Obtener portafolio actual del usuario
      const currentPortfolio = await getPortfolioByClientId(clientId);
      console.log('📊 Portafolio actual:', currentPortfolio);

      const portfolioData = currentPortfolio.data || currentPortfolio;
      
      // Buscar si ya existe una inversión para este stock
      let existingInvestment = null;
      let portfolioId = null;

      if (portfolioData && Array.isArray(portfolioData)) {
        // Buscar en portfolio_investment
        existingInvestment = portfolioData.find(item => 
          item.stock_id === stockId || 
          item.stock?.id === stockId ||
          item.portfolio_investment?.stock_id === stockId
        );
        
        // Obtener el portfolio_id principal
        portfolioId = existingInvestment?.portfolio_id || 
                    existingInvestment?.portfolio?.id || 
                    portfolioData[0]?.id;
      }

      const quantity = parseFloat(transactionData.details[0].quantity);
      const unitPrice = parseFloat(transactionData.details[0].unit_price);
      const isBuy = transactionData.type === 'compra';

      if (existingInvestment && existingInvestment.id) {
        // Actualizar inversión existente en PortfolioInvestment
        const currentQuantity = parseFloat(existingInvestment.quantity || 0);
        const newQuantity = isBuy ? currentQuantity + quantity : currentQuantity - quantity;
        
        console.log(`📈 Actualizando investment: ${currentQuantity} -> ${newQuantity}`);

        if (newQuantity > 0) {
          // Actualizar la cantidad en PortfolioInvestment
          await updatePortfolioInvestment(existingInvestment.id, {
            quantity: newQuantity.toFixed(4),
            // Para compras, actualizar el precio promedio
            purchase_price: isBuy ? 
              ((currentQuantity * parseFloat(existingInvestment.purchase_price || unitPrice)) + (quantity * unitPrice)) / newQuantity :
              existingInvestment.purchase_price
          });
          console.log('✅ PortfolioInvestment actualizado');
        } else {
          // Si la cantidad llega a 0, marcar como inactiva
          await updatePortfolioInvestment(existingInvestment.id, {
            is_active: false
          });
          console.log('📝 Investment marcado como inactivo');
        }
      } else if (isBuy) {
        // Crear nueva inversión en PortfolioInvestment
        console.log('🆕 Creando nueva inversión en PortfolioInvestment');
        
        // Primero necesitamos el portfolio_id principal
        if (!portfolioId) {
          // Si no existe portfolio, crear uno primero
          const newPortfolio = await createPortfolio({
            client_profile: parseInt(clientId),
            name: "Portafolio Principal",
            created_at: new Date().toISOString(),
            is_active: true
          });
          portfolioId = newPortfolio.data.id;
          console.log('✅ Nuevo portfolio creado:', portfolioId);
        }
        
        // Crear la inversión en PortfolioInvestment
        await createPortfolioInvestment({
          portfolio: portfolioId,
          stock: stockId,
          quantity: quantity.toFixed(4),
          purchase_price: unitPrice.toFixed(2),
          purchased_at: new Date().toISOString(),
          is_active: true
        });
        console.log('✅ Nueva inversión creada en PortfolioInvestment');
      }

    } catch (error) {
      console.error('❌ Error actualizando portfolio investment:', error);
    }
  };

  // Validar si el monto es válido
  const isValidAmount = () => {
    if (!amount || amount <= 0) return false;
    
    if (activeTab === 'sell') {
      const sharesToSell = buyIn === 'shares' ? parseFloat(amount) : (parseFloat(amount) / currentPrice);
      return sharesToSell <= availableShares;
    }
    
    return true;
  };

  const estimatedPriceRange = `${(currentPrice * 0.99).toFixed(2)} - ${(currentPrice * 1.01).toFixed(2)}`;
  const estimatedShares = buyIn === 'dollars' && amount > 0 ? (amount / currentPrice).toFixed(6) : (buyIn === 'shares' ? amount : '0.000000');
  const closingCost = 0.15;
  
  const totalCost = activeTab === 'buy' 
    ? (buyIn === 'dollars' ? parseFloat(amount || 0) + closingCost : (buyIn === 'shares' ? (amount * currentPrice) + closingCost : closingCost))
    : (buyIn === 'shares' ? (amount * currentPrice) - closingCost : parseFloat(amount || 0) - closingCost);

  // Función para manejar la compra/venta
  const handleTransaction = async () => {
    if (!amount || amount <= 0) return;

    if (activeTab === 'sell') {
      const sharesToSell = buyIn === 'shares' ? parseFloat(amount) : (parseFloat(amount) / currentPrice);
      if (sharesToSell > availableShares) {
        alert(`Error: No tienes suficientes acciones. Disponibles: ${availableShares.toFixed(4)}`);
        return;
      }
    }

    setIsLoading(true);
    
    try {
      const clientId = localStorage.getItem("client_profile_id") || localStorage.getItem("clientId");
      
      if (!clientId) {
        alert("Error: No se encontró la información del cliente. Por favor inicia sesión nuevamente.");
        return;
      }

      const quantity = buyIn === 'dollars' ? (amount / currentPrice) : parseFloat(amount);
      const unitPrice = currentPrice;

      const transactionData = {
        type: activeTab === 'buy' ? 'compra' : 'venta',
        client_profile_id: parseInt(clientId),
        details: [
          {
            stock_id: stockId,
            quantity: quantity.toFixed(4),
            unit_price: unitPrice.toFixed(2)
          }
        ]
      };

      console.log('📤 Enviando transacción:', transactionData);

      const response = await createTransaction(transactionData);
      console.log('✅ Transacción creada:', response);

      await updateUserPortfolio(transactionData);

      alert(`¡${activeTab === 'buy' ? 'Compra' : 'Venta'} realizada exitosamente!`);
      
      setAmount('');
      
      if (activeTab === 'sell') {
        await loadAvailableShares();
      }
      
      if (window.refreshPortfolio) {
        window.refreshPortfolio();
      }

    } catch (error) {
      console.error('❌ Error en la transacción:', error);
      alert(`Error al realizar la ${activeTab === 'buy' ? 'compra' : 'venta'}. Por favor intenta nuevamente.`);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para usar el monto máximo disponible
  const handleMaxAmount = () => {
    if (activeTab === 'buy') {
      const purchasePower = 1000.00;
      if (buyIn === 'dollars') {
        setAmount((purchasePower - closingCost).toFixed(2));
      } else {
        setAmount(((purchasePower - closingCost) / currentPrice).toFixed(6));
      }
    } else {
      if (buyIn === 'shares') {
        setAmount(availableShares.toFixed(4));
      } else {
        setAmount((availableShares * currentPrice).toFixed(2));
      }
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
                disabled={!isValidAmount() || isLoading}
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
          <>
            <div className="form-group-panel">
              <label>Tipo de venta</label>
              <select value={orderType} onChange={(e) => setOrderType(e.target.value)}>
                <option value="market">Mercado</option>
                <option value="limit">Límite</option>
              </select>
            </div>

            <div className="form-group-panel">
              <label>Vender en</label>
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
              <label>{buyIn === 'shares' ? 'Acciones a vender' : 'Monto a obtener'}</label>
              <input 
                type="number" 
                placeholder={buyIn === 'dollars' ? '$0.00' : '0'} 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                step={buyIn === 'dollars' ? '0.01' : '0.000001'}
              />
              <div className="available-shares">
                Disponibles: <strong>{availableShares.toFixed(4)}</strong> acciones
              </div>
            </div>

            <div className="order-summary">
              <div className="summary-item">
                <span>Precio Est. ⓘ</span>
                <span>${estimatedPriceRange}</span>
              </div>
              <div className="summary-item">
                <span>Acciones a vender</span>
                <span>{estimatedShares}</span>
              </div>
              <div className="summary-item">
                <span>Comisión ⓘ</span>
                <span>-${closingCost.toFixed(2)}</span>
              </div>
              <div className="summary-item total">
                <span>Total a recibir</span>
                <span>${Math.max(0, totalCost).toFixed(2)}</span>
              </div>
            </div>

            <div className="panel-actions">
              <button 
                className="btn-secondary-panel" 
                onClick={handleMaxAmount}
                type="button"
              >
                Vender máximo
              </button>
              <button 
                className="btn-primary-panel sell-btn" 
                disabled={!isValidAmount() || isLoading}
                onClick={handleTransaction}
              >
                {isLoading ? 'Procesando...' : 'Vender'}
              </button>
            </div>

            {!isValidAmount() && amount > 0 && (
              <div className="error-message">
                ❌ No tienes suficientes acciones para vender
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  );
}