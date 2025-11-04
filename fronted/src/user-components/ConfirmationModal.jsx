import React from 'react';
import '../style/ConfirmationModal.css';

export default function ConfirmationModal({ onConfirm, onCancel, onPasswordChange, passwordValue }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Confirmar Cambios</h3>
        <p>Por tu seguridad, ingresa tu contraseña actual para guardar los cambios.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="verify-password">Contraseña Actual</label>
            <input
              id="verify-password"
              className="form-input"
              type="password"
              placeholder="••••••••"
              value={passwordValue}
              onChange={onPasswordChange}
              required
              autoFocus
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Confirmar</button>
          </div>
        </form>
      </div>
    </div>
  );
}