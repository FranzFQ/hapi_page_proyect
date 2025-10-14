import React from 'react';
import ReactDOM from 'react-dom';

export default function ConfirmationModal({ stock, onCancel, onDeactivate, onDelete }) {
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="confirmation-modal fade-in">
        <h3>¿SEGURO QUE QUIERES ELIMINAR/DESACTIVAR LAS ACCIONES DE ({stock.name} - {stock.symbol})?</h3>
        <div className="modal-actions">
          <button onClick={onCancel} className="btn-secondary">Cancelar</button>
          <button onClick={onDeactivate} className="btn-deactivate">Desactivar</button>
          <button onClick={onDelete} className="btn-delete">Eliminar</button>
        </div>
        <div className="modal-info">
          <p><strong>SI ES DESACTIVAR:</strong> LA ACCIÓN PASARÁ A (NO DISPONIBLE PARA TRADING)</p>
          <p><strong>SI ES ELIMINAR:</strong> SE ELIMINARÁ POR COMPLETO</p>
        </div>
      </div>
    </div>,
    document.body
  );
}