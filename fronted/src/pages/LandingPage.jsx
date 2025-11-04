import React, { useEffect, useState } from "react";
import "../style/LandingPage.css";
import { useNavigate } from "react-router-dom";
import { searchAllStocks } from "../service/User.api.js";

export default function LandingPage() {
  const navigate = useNavigate();
  const [marketData, setMarketData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.clear();
    loadMarketData();
  }, []);

  // Función para transformar datos de API a formato frontend
  const transformApiData = (apiData) => {
    const categoryToTypeMap = {
      1: 'acciones',
      2: 'acciones', 
      3: 'acciones',
      4: 'acciones'
    };

    return apiData.map(stock => {
      const changeValue = parseFloat((stock.variation/stock.last_price * 100).toFixed(2));
      const changeSign = changeValue >= 0 ? '+' : '';
      
      return {
        symbol: stock.symbol,
        name: stock.name,
        type: categoryToTypeMap[stock.stock_category_id] || 'acciones',
        price: parseFloat(stock.last_price).toFixed(2),
        change: `${changeSign}${changeValue}%`
      };
    });
  };

  // Cargar datos del mercado desde la API
  const loadMarketData = async () => {
    try {
      console.log('Cargando datos del mercado...');
      const response = await searchAllStocks();
      console.log('Respuesta de API:', response);
      
      const transformedData = transformApiData(response.data || response);
      console.log('Datos transformados:', transformedData);
      
      // Tomar solo los primeros 6 stocks para mostrar
      const topStocks = transformedData.slice(0, 6);
      setMarketData(topStocks);
      
    } catch (error) {
      console.error('Error cargando datos del mercado:', error);
      // Datos de respaldo en caso de error
      setMarketData([
        { symbol: "AAPL", name: "Apple", price: "224.18", change: "+1.2%" },
        { symbol: "MSFT", name: "Microsoft", price: "410.33", change: "-0.5%" },
        { symbol: "NVDA", name: "NVIDIA", price: "117.82", change: "+2.7%" },
        { symbol: "AMZN", name: "Amazon", price: "184.51", change: "+0.8%" },
        { symbol: "TSLA", name: "Tesla", price: "260.70", change: "+3.1%" },
        { symbol: "XOM", name: "Exxon", price: "117.10", change: "-1.1%" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  }

  const handleSignUpClick = () => {
    navigate("/register");
  }

  return (
    <div className="landing">
      {/* NAVBAR */}
      <header className="nav">
        <div className="nav__left">
          <div className="brand">
            <span className="brand__dots">
              <i></i><i></i><i></i>
            </span>
            <span className="brand__name">Hapi clone</span>
          </div>
        </div>
        <div className="nav__right">
          <button className="btn btn--ghost" onClick={handleLoginClick}>Iniciar sesion</button>
          <button className="btn btn--primary" onClick={handleSignUpClick}>Crear cuenta</button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">
            Invierte en la Bolsa<br />
            de USA desde Latam
          </h1>
          <p className="hero__subtitle">
            +12,000 acciones, ETFs y criptomonedas desde US$5. ¡Empieza
            tu portafolio hoy!
          </p>

          <div className="hero__cta">
            <button className="btn btn--primary" onClick={handleSignUpClick}>Invertir ahora</button>
          </div>

          <p className="hero__note">
            * Plataforma educativa y de simulación para propósitos académicos.
          </p>
        </div>

        {/* MARKET CARD */}
        <aside className="market-card">
          <div className="market-card__header">
            {isLoading ? "Cargando datos..." : "Mercado en Tiempo Real"}
          </div>

          <div className="market-grid">
            {marketData.map(({ symbol, name, price, change }) => (
              <div key={symbol} className="ticker">
                <div className="ticker__sym">{symbol}</div>
                <div className="ticker__name">{name}</div>
                <div className="ticker__price">${price}</div>
                <div
                  className={
                    "ticker__chg " +
                    (change.startsWith("-") ? "neg" : "pos")
                  }
                >
                  {change}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}