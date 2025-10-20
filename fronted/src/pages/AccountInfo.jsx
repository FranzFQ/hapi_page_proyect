import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/AccountInfo.css';

const userData = {
  fullName: 'Kevin Yax',
  birthDate: '10/09/2003',
  documentType: 'N/A',
  documentNumber: 'N/A',
  email: 'titopuac342@gmail.com',
  phone: '+50238263022',
  address: 'Totonicapan, Guatemala',
};

const handleExportData = () => {
  const dataStr = JSON.stringify(userData, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  const exportFileDefaultName = 'user_account_data.json';
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

export default function AccountInfo() {
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    const isConfirmed = window.confirm('¿Estás seguro de que quieres eliminar tu cuenta de forma permanente? Esta acción no se puede deshacer.');
    
    if (isConfirmed) {
      alert('Tu cuenta ha sido eliminada. (Simulación Frontend)');
      navigate('/loginEmail');
    }
  };

  return (
    <div className="account-info-container">
      <div className="account-info-header">
        <button onClick={() => navigate('/settings')} className="back-button" title="Volver a ajustes">
          <i className="fi fi-rr-arrow-left"></i>
        </button>
        <h2>Información de la Cuenta</h2>
      </div>

      <div className="account-info-body">
        <div className="info-section">
          <h3 className="info-section-title">Datos Personales</h3>
          <div className="info-item">
            <span className="info-label">Nombre y apellido</span>
            <span className="info-value">{userData.fullName}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Fecha de nacimiento</span>
            <span className="info-value">{userData.birthDate}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Tipo de documento</span>
            <span className="info-value">{userData.documentType}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Número de documento</span>
            <span className="info-value">{userData.documentNumber}</span>
          </div>
        </div>

        <div className="info-section">
          <h3 className="info-section-title">Datos de Contacto</h3>
          <div className="info-item">
            <span className="info-label">Correo electrónico</span>
            <span className="info-value">{userData.email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Número celular</span>
            <span className="info-value">{userData.phone}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Dirección</span>
            <span className="info-value">{userData.address}</span>
          </div>
        </div>
      </div>

      <div className="account-info-actions">
        <button className="export-button" onClick={handleExportData}>
          <i className="fi fi-rr-download"></i>
          Exportar Datos
        </button>
        <button className="delete-button" onClick={handleDeleteAccount}>
          <i className="fi fi-rr-trash"></i>
          Eliminar Cuenta
        </button>
      </div>
    </div>
  );
}