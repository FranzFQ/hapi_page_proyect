import React from 'react';

export default function ActionsList({ actions }) {
  if (!actions || actions.length === 0) {
    return (
      <div className="widget-card">
        <h3 className="widget-title">ACCIONES DISPONIBLES</h3>
        <p>No hay acciones disponibles en este momento.</p>
      </div>
    );
  }

  return (
    <div className="widget-card">
      <h3 className="widget-title">ACCIONES DISPONIBLES</h3>
      <ul className="actions-list">
        {actions.map((action) => (
          <li key={action.id}>{action.name}</li>
        ))}
      </ul>
    </div>
  );
}