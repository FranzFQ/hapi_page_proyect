import React from 'react';

// Componente reutilizable para las tarjetas de estadísticas
export default function StatCard({ title, value }) {
  return (
    <div className="stat-card fade-in">
      <h3 className="stat-card-title">{title}</h3>
      <p className="stat-card-value">{value}</p>
    </div>
  );
}