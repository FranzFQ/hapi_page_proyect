import React from 'react';

const StatItem = ({ label, value }) => (
  <div className="stat-item">
    <span className="stat-label">{label}</span>
    <span className="stat-value">{value ?? 'N/A'}</span>
  </div>
);

export default function StockKeyStats({ stats }) {
  return (
    <div className="stock-key-stats glass-effect">
      <h3>Estadísticas Clave</h3>
      <div className="stats-grid">
        <StatItem label="Apertura" value={stats.open ? `$${stats.open.toFixed(2)}` : 'N/A'} />
        <StatItem label="Dividendo por acción" value={stats.dividendYield} />
        <StatItem label="Máximo del día" value={stats.high ? `$${stats.high.toFixed(2)}` : 'N/A'} />
        <StatItem label="Volumen" value={stats.volume} />
        <StatItem label="Mínimo del día" value={stats.low ? `$${stats.low.toFixed(2)}` : 'N/A'} />
        <StatItem label="Volumen promedio (1m)" value={stats.avgVolume} />
        <StatItem label="Cierre" value={stats.close ? `$${stats.close.toFixed(2)}` : 'N/A'} />
        <StatItem label="Beta" value={stats.beta?.toFixed(2)} />
        <StatItem label="Capitalización de mercado" value={stats.marketCap} />
        <StatItem label="EPS" value={stats.eps?.toFixed(2)} />
        <StatItem label="Relación P/E" value={stats.peRatio?.toFixed(2)} />
      </div>
    </div>
  );
}