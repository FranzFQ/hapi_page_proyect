import React, { useState, useEffect } from 'react';
import { 
  createTransaction, 
  getPortfolioByClientId, 
  createPortfolio, 
  createPortfolioInvestment,
  updatePortfolioInvestment,
  getPortfolioInvestmentByPortafolioId,
  getClientById,
  updateClient
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

  // Función para actualizar el balance del cliente
  const updateClientBalance = async (transactionData, currentPrice) => {
    try {
      const clientId = localStorage.getItem("clientId");
      if (!clientId) {
        // // console.log('No hay clientId para actualizar balance');
        return;
      }

      // // console.log('Actualizando balance del cliente...');
      
      // 1. Obtener el cliente actual
      const clientResponse = await getClientById(clientId);
      // // console.log('Cliente actual:', clientResponse.data);
      
      const currentClient = clientResponse.data;
      const currentBalance = parseFloat(currentClient.balance_available || 0);
      
      // 2. Calcular el cambio de balance
      const quantity = parseFloat(transactionData.details[0].quantity);
      const unitPrice = parseFloat(transactionData.details[0].unit_price);
      const closingCost = 0.15; // Mismo costo de cierre
      
      let balanceChange = 0;
      
      if (transactionData.type === 'compra') {
        // COMPRA: Restar (cantidad * precio) + costo de cierre
        balanceChange = -((quantity * unitPrice) + closingCost);
        // // console.log(`COMPRA: Balance ${currentBalance} - ${Math.abs(balanceChange)}`);
      } else {
        // VENTA: Sumar (cantidad * precio) - costo de cierre  
        balanceChange = (quantity * unitPrice) - closingCost;
        // // console.log(`VENTA: Balance ${currentBalance} + ${balanceChange}`);
      }
      
      const newBalance = currentBalance + balanceChange;
      
      // Validar que no quede balance negativo en compras
      if (newBalance < 0 && transactionData.type === 'compra') {
        console.error('Balance insuficiente para la compra');
        throw new Error('Balance insuficiente');
      }
      
      // // console.log(`Nuevo balance: ${currentBalance} + ${balanceChange} = ${newBalance}`);
      
      // 3. Actualizar el balance del cliente
      const updateResult = await updateClient(clientId, {
        balance_available: newBalance.toFixed(2)
      });
      
      // // console.log('Balance actualizado:', updateResult.data);
      
      return newBalance;
      
    } catch (error) {
      console.error('Error actualizando balance:', error);
      throw error;
    }
  };

  // Función para cargar acciones disponibles
  const loadAvailableShares = async () => {
    try {
      const clientId = localStorage.getItem("clientId");
      
      if (!clientId) {
        // // console.log('No hay clientId');
        setAvailableShares(0);
        return;
      }

      // // console.log('Buscando acciones REALES para:', symbol, 'StockID:', stockId);

      // INTENTAR OBTENER DATOS REALES
      try {
        const portfolioResponse = await getPortfolioByClientId(clientId);
        // // console.log('Respuesta real de portfolio:', portfolioResponse);
        
        let portfolioData = portfolioResponse.data || portfolioResponse;
        
        if (!portfolioData || portfolioData.length === 0) {
          // // console.log('No hay portfolio creado');
          setAvailableShares(0);
          return;
        }

        const portfolioId = portfolioData[0].id;
        // // console.log('Portfolio ID:', portfolioId);

        // OBTENER LAS INVERSIONES DEL PORTFOLIO
        const investmentsResponse = await getPortfolioInvestmentByPortafolioId(portfolioId);
        // // console.log('Inversiones del portfolio:', investmentsResponse.data);
        
        let investmentsData = investmentsResponse.data || investmentsResponse;
        
        if (!investmentsData || investmentsData.length === 0) {
          // // console.log('No hay inversiones en este portfolio');
          setAvailableShares(0);
          return;
        }

        // BUSCAR LA INVERSIÓN ESPECÍFICA PARA ESTE STOCK
        const stockInvestment = investmentsData.find(inv => {
            console.log('Comparando investment:', {
            investmentStockId: inv.stock,
            targetStockId: stockId,
            investmentData: inv
          });
          return inv.stock === stockId;
        });

        // // console.log('Stock investment encontrado:', stockInvestment);

        if (stockInvestment && stockInvestment.is_active !== false) {
          const quantity = parseFloat(stockInvestment.quantity || 0);
          setAvailableShares(quantity);
          // // console.log(`Acciones REALES de ${symbol}: ${quantity}`);
          return;
        } else {
          // // console.log(`No se encontró inversión para ${symbol}`);
          setAvailableShares(0);
          return;
        }

      } catch (error) {
        // // console.log('Error obteniendo datos reales:', error);
        setAvailableShares(0);
        return;
      }

    } catch (error) {
      console.error('Error cargando stocks:', error);
      setAvailableShares(0);
    }
  };

  // Función para actualizar el portafolio CORREGIDA (arreglo el error toFixed)
  // Función para actualizar el portafolio CORREGIDA
  const updateUserPortfolio = async (transactionData) => {
    try {
      const clientId = localStorage.getItem("clientId");
      // // console.log('ClientID:', clientId);
      
      if (!clientId) {
        // // console.log('No hay clientId');
        return;
      }

      // // console.log('Iniciando actualización de portfolio...');

      // 1. OBTENER O CREAR PORTFOLIO
      let portfolio;
      try {
        const portfolioResponse = await getPortfolioByClientId(clientId);
        
        // IF: Si no existe portfolio, crear uno nuevo
        if (!portfolioResponse.data || portfolioResponse.data.length === 0) {
          // console.log('No hay portfolio, creando uno...');
          const newPortfolio = await createPortfolio({
            client_profile: parseInt(clientId),
            name: "Portafolio Principal",
            created_at: new Date().toISOString(),
            is_active: true,
            total_investion: 0,
            average_price: 0,
            current_value: 0
          });
          portfolio = newPortfolio.data;
          // console.log('Nuevo portfolio creado:', portfolio);
        } else {
          portfolio = portfolioResponse.data[0];
          // console.log('Portfolio encontrado:', portfolio);
        }
      } catch (error) {
        // console.log('Error obteniendo portfolio, creando uno nuevo...');
        // Si hay error al obtener, crear nuevo portfolio
        const newPortfolio = await createPortfolio({
          client_profile: parseInt(clientId),
          name: "Portafolio Principal",
          created_at: new Date().toISOString(),
          is_active: true,
          total_investion: 0,
          average_price: 0,
          current_value: 0
        });
        portfolio = newPortfolio.data;
        // console.log('Nuevo portfolio creado por error:', portfolio);
      }

      const portfolioId = portfolio.id;
      // console.log('Portfolio ID:', portfolioId);

      if (!portfolioId) {
        console.error('No se pudo obtener portfolio ID');
        return;
      }

      // 2. OBTENER INVERSIONES EXISTENTES
      let investmentsResponse;
      try {
        investmentsResponse = await getPortfolioInvestmentByPortafolioId(portfolioId);
        // console.log('Inversiones encontradas:', investmentsResponse.data);
      } catch (error) {
        // console.log('No hay inversiones aún');
        investmentsResponse = { data: [] };
      }

      let investmentsData = investmentsResponse.data || investmentsResponse;
      const quantity = parseFloat(transactionData.details[0].quantity);
      const unitPrice = parseFloat(transactionData.details[0].unit_price);
      const isBuy = transactionData.type === 'compra';

      // console.log(`Transacción: ${quantity} acciones a $${unitPrice} (${isBuy ? 'COMPRA' : 'VENTA'})`);

      // 3. BUSCAR INVERSIÓN EXISTENTE
      const existingInvestment = Array.isArray(investmentsData) 
        ? investmentsData.find(inv => inv.stock === stockId)
        : null;

      // console.log('Investment existente:', existingInvestment);

      if (existingInvestment) {
        // ACTUALIZAR INVERSIÓN EXISTENTE
        const currentQuantity = parseFloat(existingInvestment.quantity || 0);
        let newQuantity, newPrice;

        if (isBuy) {
          newQuantity = currentQuantity + quantity;
          // Calcular nuevo precio promedio ponderado
          const totalValue = (currentQuantity * parseFloat(existingInvestment.purchase_price || 0)) + (quantity * unitPrice);
          newPrice = totalValue / newQuantity;
          // console.log(`COMPRA: ${currentQuantity} + ${quantity} = ${newQuantity}, precio promedio: $${newPrice.toFixed(2)}`);
        } else {
          newQuantity = currentQuantity - quantity;
          // ARREGLADO: Asegurar que newPrice sea un número
          newPrice = parseFloat(existingInvestment.purchase_price || 0);
          // console.log(`VENTA: ${currentQuantity} - ${quantity} = ${newQuantity}, precio mantiene: $${newPrice.toFixed(2)}`);
        }

        try {
          // console.log('Actualizando investment...');
          const updateResult = await updatePortfolioInvestment(existingInvestment.id, {
            quantity: newQuantity.toFixed(4),
            purchase_price: newPrice.toFixed(2),
            is_active: newQuantity > 0
          });
          // console.log('Investment actualizado:', updateResult.data);
        } catch (error) {
          console.error('Error actualizando investment:', error);
        }

      } else if (isBuy) {
        // CREAR NUEVA INVERSIÓN
        // console.log('Creando nueva inversión...');
        try {
          const createResult = await createPortfolioInvestment({
            portfolio: portfolioId,
            stock: stockId,
            quantity: quantity.toFixed(4),
            purchase_price: unitPrice.toFixed(2),
            purchased_at: new Date().toISOString(),
            is_active: true
          });
          // console.log('Nueva inversión creada:', createResult.data);
        } catch (error) {
          console.error('Error creando investment:', error);
        }
      }

      // console.log('Proceso de portfolio completado');

    } catch (error) {
      console.error('Error crítico:', error);
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

  const validateBalance = async (amount, currentPrice, buyIn) => {
    try {
      const clientId = localStorage.getItem("clientId");
      if (!clientId) return false;

      const clientResponse = await getClientById(clientId);
      const currentBalance = parseFloat(clientResponse.data.balance_available || 0);
      
      const closingCost = 0.15;
      let requiredAmount = 0;
      
      if (buyIn === 'dollars') {
        requiredAmount = parseFloat(amount) + closingCost;
      } else {
        requiredAmount = (parseFloat(amount) * currentPrice) + closingCost;
      }
      
      // // console.log(`Validación balance: ${currentBalance} >= ${requiredAmount}`);
      
      return currentBalance >= requiredAmount;
    } catch (error) {
      console.error('Error validando balance:', error);
      return false;
    }
  };

  // Componente para mostrar el balance real
  const RealBalanceDisplay = () => {
    const [balance, setBalance] = useState(0);
    
    useEffect(() => {
      loadBalance();
    }, []);

    const loadBalance = async () => {
      try {
        const clientId = localStorage.getItem("clientId");
        if (!clientId) return;
        
        const clientResponse = await getClientById(clientId);
        const currentBalance = parseFloat(clientResponse.data.balance_available || 0);
        setBalance(currentBalance);
      } catch (error) {
        console.error('Error cargando balance:', error);
      }
    };

    return (
      <div className="purchase-power">
        <span>Balance disponible: ${balance.toFixed(2)}</span>
        <button className="info-button" onClick={() => { loadBalance(); onShowPurchasePower(); }}>+</button>
      </div>
    );
  };

  // Función para manejar la compra/venta
  const handleTransaction = async () => {
    if (!amount || amount <= 0) return;

    // Validar balance para compras
    if (activeTab === 'buy') {
      const hasSufficientBalance = await validateBalance(amount, currentPrice, buyIn);
      if (!hasSufficientBalance) {
        alert('Error: Balance insuficiente para realizar esta compra.');
        return;
      }
    }

    if (activeTab === 'sell') {
      const sharesToSell = buyIn === 'shares' ? parseFloat(amount) : (parseFloat(amount) / currentPrice);
      if (sharesToSell > availableShares) {
        alert(`Error: No tienes suficientes acciones. Disponibles: ${availableShares.toFixed(4)}`);
        return;
      }
    }

    setIsLoading(true);
    
    try {
      const clientId = localStorage.getItem("clientId");
      
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

      
      const newBalance = await updateClientBalance(transactionData, currentPrice);
      
      const response = await createTransaction(transactionData);
      
      await updateUserPortfolio(transactionData);

      
      
      await new Promise(resolve => setTimeout(resolve, 500));
      await loadAvailableShares();

      // Mostrar mensaje de éxito con el nuevo balance
      alert(`¡${activeTab === 'buy' ? 'Compra' : 'Venta'} realizada exitosamente!\nNuevo balance: $${newBalance.toFixed(2)}`);
      
      setAmount('');
      
      // Actualizar el balance en la UI si existe una función para ello
      if (window.updateUserBalance) {
        window.updateUserBalance(newBalance);
      }
      
      if (window.refreshPortfolio) {
        window.refreshPortfolio();
      }

      // // console.log('TRANSACCIÓN COMPLETADA');

    } catch (error) {
      console.error('Error en la transacción:', error);
      
      if (error.message === 'Balance insuficiente') {
        alert('Error: Balance insuficiente para realizar la compra.');
      } else {
        alert(`Error al realizar la ${activeTab === 'buy' ? 'compra' : 'venta'}. Por favor intenta nuevamente.`);
      }
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
            <RealBalanceDisplay />
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
              <div className="summary-item">
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
                No tienes suficientes acciones para vender
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  );
}