import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../user-components/Header';
import Sidebar from '../user-components/Sidebar';
import StockHeader from '../user-components/stock-detail-components/StockHeader';
import StockChart from '../user-components/stock-detail-components/StockChart';
import StockKeyStats from '../user-components/stock-detail-components/StockKeyStats';
import StockAboutSection from '../user-components/stock-detail-components/StockAboutSection';
import StockAnalystRatings from '../user-components/stock-detail-components/StockAnalystRatings';
import SimilarStocks from '../user-components/stock-detail-components/SimilarStocks';
import StockNews from '../user-components/stock-detail-components/StockNews';
import BuySellPanel from '../user-components/stock-detail-components/BuySellPanel';
import PurchasingPowerModal from '../user-components/stock-detail-components/PurchasingPowerModal';
import '../style/StockDetails.css';

const fetchStockData = (symbol) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        symbol: symbol.toUpperCase(),
        name: `${symbol.toUpperCase()} Example Corp - Ordinary Shares`,
        price: 1.81 + Math.random(),
        changeValue: 1.19 + Math.random(),
        changePercent: 193.68 + Math.random(),
        about: `Acerca de ${symbol.toUpperCase()} NETWORKS CORP... Backed by dynamic business fundamentals...`,
        keyStats: {
          open: 2.27, high: 2.44, low: 1.58, close: 0.61, marketCap: '17.50M', volume: '302.94M', avgVolume: '188.65K', dividendYield: 'N/A', peRatio: -0.2, beta: 1.46, eps: -0.34
        },
        analystRatings: { buy: 50, hold: 50, sell: 0 },
        similar: [
          { symbol: 'AAPL', name: 'Apple', logoUrl: 'https://via.placeholder.com/30/cccccc/000000?text=A' },
          { symbol: 'TSLA', name: 'Tesla', logoUrl: 'https://via.placeholder.com/30/FF0000/ffffff?text=T' },
          { symbol: 'AMC', name: 'AMC Entertainment', logoUrl: 'https://via.placeholder.com/30/0000FF/ffffff?text=A' },
          { symbol: 'F', name: 'Ford Motor', logoUrl: 'https://via.placeholder.com/30/00FF00/000000?text=F' },
          { symbol: 'SNDL', name: 'Sundial Growers', logoUrl: 'https://via.placeholder.com/30/FFFF00/000000?text=S' },
        ],
        news: [
          { id: 'n1', title: `${symbol.toUpperCase()} reports quarterly earnings beat, shares surge`, source: 'Reuters', date: 'Oct 29', url: '#' },
          { id: 'n2', title: `Analyst upgrades ${symbol.toUpperCase()} to 'Buy' citing strong growth prospects`, source: 'Bloomberg', date: 'Oct 28', url: '#' },
          { id: 'n3', title: `New product launch expected from ${symbol.toUpperCase()} next month`, source: 'The Verge', date: 'Oct 27', url: '#' },
        ]
      });
    }, 800);
  });
};

export default function StockDetailPage() {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [activeTab, setActiveTab] = useState('resumen');

  const aboutRef = useRef(null);
  const similarRef = useRef(null);
  const newsRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchStockData(symbol);
      setStockData(data);
      setLoading(false);
      setActiveTab('resumen'); // Reset tab on data load
    };
    loadData();
    window.scrollTo(0, 0); // Scroll al inicio al cargar nueva acción
  }, [symbol]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'resumen' && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (tabId === 'mis-inversiones') {
      navigate('/portfolio'); // Navega a la página de portafolio
    } else if (tabId === 'similares' && similarRef.current) {
      similarRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (tabId === 'noticias' && newsRef.current) {
      newsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="dashboard-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="center-content stock-detail-page-layout">
          <div className="stock-detail-main">
            {loading && <div className="loading-state">Cargando datos de {symbol.toUpperCase()}...</div>}
            {!loading && !stockData && <div className="error-state">No se encontraron datos para {symbol.toUpperCase()}.</div>}
            {!loading && stockData && (
              <div className="fade-in">
                <StockHeader data={stockData} />
                <StockChart 
                  symbol={stockData.symbol} 
                  activeTab={activeTab} 
                  onTabClick={handleTabClick} 
                />
                <div ref={aboutRef}><StockAboutSection about={stockData.about} /></div>
                <StockKeyStats stats={stockData.keyStats} />
                <StockAnalystRatings ratings={stockData.analystRatings} />
                <div ref={similarRef}><SimilarStocks similar={stockData.similar} /></div>
                <div ref={newsRef}><StockNews news={stockData.news} /></div>
              </div>
            )}
          </div>
          {!loading && stockData && (
             <BuySellPanel 
               symbol={stockData.symbol} 
               currentPrice={stockData.price}
               onShowPurchasePower={() => setShowPurchaseModal(true)} 
             />
          )}
        </div>
      </div>
      {showPurchaseModal && <PurchasingPowerModal onClose={() => setShowPurchaseModal(false)} />}
    </div>
  );
}