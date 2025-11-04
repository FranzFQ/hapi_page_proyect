import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/SecurityMethods.css';

const SecurityMethods = () => {
  const navigate = useNavigate();
  const [is2faActive, setIs2faActive] = useState(true);

  return (
    <div className="security-methods-container">
      <div className="security-methods-header">
        <button onClick={() => navigate('/settings')} className="back-button" title="Volver a ajustes">
          <i className="fi fi-rr-arrow-left"></i>
        </button>
        <div className="header-text">
          <h2>Métodos de seguridad</h2>
          <p>Selecciona los métodos de seguridad para tus transacciones.</p>
        </div>
      </div>

      <div className="info-box">
        <i className="fi fi-rr-info"></i>
        <span>Por defecto OTP siempre estará activo, pero puedes usar tus Passkeys como método principal.</span>
      </div>

      <ul className="security-options-list">
        <li onClick={() => alert('Navegando a la configuración de Passkey...')}>
          <div className="option-icon">
            <i className="fi fi-rr-user-lock"></i>
          </div>
          <div className="option-text">
            <span>Llave de acceso (Passkey)</span>
            <small>Inicia sesión de forma rápida y segura.</small>
          </div>
          <i className="fi fi-rr-angle-small-right"></i>
        </li>
        <li>
          <div className="option-icon">
            <i className="fi fi-rr-envelope-open-text"></i>
          </div>
          <div className="option-text">
            <span>Autenticación de 2 factores (2FA)</span>
            <small>Añade una capa extra de seguridad.</small>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={is2faActive} 
              onChange={() => setIs2faActive(!is2faActive)} 
            />
            <span className="slider"></span>
          </label>
        </li>
      </ul>
    </div>
  );
};

export default SecurityMethods;