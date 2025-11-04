import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/SettingsMenu.css";
import UserExist from "../hooks/userExist";

const SettingsMenu = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const permition = UserExist();
    if (permition) {
      navigate("/");
      return;
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    alert("Cierre de sesion exitoso");
    navigate("/");
  };

  return (
    <div className="settings-menu-container">
      <div className="settings-menu-header">
        <button
          onClick={() => navigate("/home")}
          className="back-button"
          title="Volver a inicio"
        >
          <i className="fi fi-rr-arrow-left"></i>
        </button>
        <h2>Ajustes de Cuenta</h2>
      </div>
      <div className="settings-menu-body">
        <div className="settings-section">
          <h3 className="settings-section-title">CUENTA</h3>
          <ul className="settings-options-list">
            <li onClick={() => navigate("/settings/account")}>
              <div className="option-icon">
                <i className="fi fi-rs-user"></i>
              </div>
              <span>Información de cuenta</span>
              <i className="fi fi-rr-angle-small-right"></i>
            </li>
          </ul>
        </div>

        <div className="settings-section">
          <h3 className="settings-section-title">SEGURIDAD</h3>
          <ul className="settings-options-list">
            <li onClick={() => navigate("/settings/edit-profile")}>
              <div className="option-icon">
                <i className="fi fi-rr-edit"></i>
              </div>
              <span>Modificar Datos de Cuenta</span>
              <i className="fi fi-rr-angle-small-right"></i>
            </li>
          </ul>
        </div>

        <div className="settings-section">
          <h3 className="settings-section-title">REFERENCIA</h3>
          <ul className="settings-options-list">
            <li onClick={() => navigate("/settings/Referral")}>
              <div className="option-icon">
                <i className="fi fi-rs-users"></i>
              </div>
              <span>Ingresar codigo de referencia</span>
              <i className="fi fi-rr-angle-small-right"></i>
            </li>
          </ul>
        </div>

        <div className="settings-section">
          <h3 className="settings-section-title">Reportes</h3>
          <ul className="settings-options-list">
            <li onClick={() => navigate("/reports")}>
              <div className="option-icon">
                <i className="fi fi-rr-document-signed"></i>
              </div>
              <span>Generar reporte</span>
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
