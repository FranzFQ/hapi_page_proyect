import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/SettingsMenu.css';

const SettingsMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/loginEmail');
  };

  return (
    <div className="settings-menu-container">
      <div className="settings-menu-header">
        <button onClick={() => navigate('/home')} className="back-button" title="Volver a inicio">
          <i className="fi fi-rr-arrow-left"></i>
        </button>
        <h2>Ajustes de Cuenta</h2>
      </div>
      <div className="settings-menu-body">
        <div className="settings-section">
          <h3 className="settings-section-title">CUENTA</h3>
          <ul className="settings-options-list">
            <li onClick={() => navigate('/settings/account')}>
              <div className="option-icon">
                <i className="fi fi-rr-document"></i>
              </div>
              <span>Información de cuenta</span>
              <i className="fi fi-rr-angle-small-right"></i>
            </li>
          </ul>
        </div>
        
        <div className="settings-section">
          <h3 className="settings-section-title">SEGURIDAD</h3>
          <ul className="settings-options-list">
            <li onClick={() => navigate('/settings/edit-profile')}>
              <div className="option-icon">
                <i className="fi fi-rr-lock"></i>
              </div>
              <span>Modificar Datos de Cuenta</span>
              <i className="fi fi-rr-angle-small-right"></i>
            </li>
            <li onClick={() => navigate('/settings/security')}>
              <div className="option-icon">
                <i className="fi fi-rr-shield-check"></i>
              </div>
              <span>Métodos de seguridad</span>
              <i className="fi fi-rr-angle-small-right"></i>
            </li>
          </ul>
        </div>

        <div className="settings-section">
          <h3 className="settings-section-title">PREFERENCIAS</h3>
          <ul className="settings-options-list">
            <li onClick={() => navigate('/settings/language')}>
              <div className="option-icon">
                <i className="fi fi-rr-globe"></i>
              </div>
              <span>Idioma</span>
              <i className="fi fi-rr-angle-small-right"></i>
            </li>
          </ul>
        </div>
      </div>

      <div className="settings-menu-actions">
        <button className="logout-button" onClick={handleLogout}>
          <i className="fi fi-rr-sign-out-alt"></i>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsMenu;