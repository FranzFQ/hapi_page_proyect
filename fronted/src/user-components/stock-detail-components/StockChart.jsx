import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../../style/StockDetails.css';

const generateMockPriceData = () => {
  let price = 1.81;
  const data = [];
  for (let i = 30; i >= 0; i--) {
    price += (Math.random() - 0.5) * 0.1;
    data.push({ date: `Oct ${30-i}`, price: Math.max(0.1, price) });
  }
  return data;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="tooltip-label">{`Fecha: ${label}`}</p>
        <p className="tooltip-value">{`Precio: $${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};

export default function StockChart({ symbol, activeTab, onTabClick }) {
  const [timeRange, setTimeRange] = React.useState('1M');
  const mockPriceData = generateMockPriceData();

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    console.log(`Cambiando a rango: ${range} para ${symbol}`);
  };

  return (
    <div className="stock-chart-container glass-effect">
      <div className="chart-time-controls">
        {['1D', '1S', '1M', '3M', '1A'].map(range => (
          <button 
            key={range} 
            className={`time-button ${timeRange === range ? 'active' : ''}`}
            onClick={() => handleTimeRangeChange(range)}
          >
            {range}
          </button>
        ))}
      </div>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={mockPriceData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
             <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary-1)" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="var(--color-primary-1)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis dataKey="date" stroke="rgba(255, 255, 255, 0.5)" fontSize={10} />
            <YAxis stroke="rgba(255, 255, 255, 0.5)" fontSize={10} domain={['auto', 'auto']} />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="var(--color-primary-1)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorPrice)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
       <div className="chart-tabs">
         <button 
           className={`tab-button ${activeTab === 'resumen' ? 'active' : ''}`} 
           onClick={() => onTabClick('resumen')}>
           Resumen
         </button>
         <button 
           className={`tab-button ${activeTab === 'mis-inversiones' ? 'active' : ''}`} 
           onClick={() => onTabClick('mis-inversiones')}>
           Mis inversiones
         </button>
         <button 
           className={`tab-button ${activeTab === 'similares' ? 'active' : ''}`} 
           onClick={() => onTabClick('similares')}>
           Similares
         </button>
         <button 
           className={`tab-button ${activeTab === 'noticias' ? 'active' : ''}`} 
           onClick={() => onTabClick('noticias')}>
           Noticias
         </button>
       </div>
    </div>
  );
}