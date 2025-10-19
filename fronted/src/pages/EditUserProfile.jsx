import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/EditUserProfile.css';

const defaultProfile = {
  userId: 'USR-GUA-8A4B2',
  firstName: 'Juan',
  lastName: 'Pérez',
  country: 'Guatemala',
  phone: '+502 1234 5678',
  email: 'juan.perez@email.com',
  emailAlerts: true,
  smsAlerts: false,
};


const FAKE_CORRECT_PASSWORD = 'password123';

export default function EditUserProfile() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : defaultProfile;
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateAndSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const wantsToChangePassword = passwordData.newPassword || passwordData.confirmPassword;

    if (wantsToChangePassword) {
      if (!passwordData.currentPassword) {
        newErrors.currentPassword = 'Debes ingresar tu contraseña actual.';
      } else if (passwordData.currentPassword !== FAKE_CORRECT_PASSWORD) {
        newErrors.currentPassword = 'La contraseña actual es incorrecta.';
      }

      if (passwordData.newPassword.length < 8) {
        newErrors.newPassword = 'Debe tener al menos 8 caracteres.';
      }
      
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden.';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    localStorage.setItem('userProfile', JSON.stringify(profileData));
    alert('Perfil actualizado con éxito. Los datos se han guardado en el navegador.');
    navigate('/home');
  };

  return (
    <div className="admin-page-container fade-in">
      <header className="profile-page-header">
        <div className="header-title-section">
          <button onClick={() => navigate('/home')} className="home-button-header" title="Volver a Principal">
            <i className="fi fi-rr-home"></i>
          </button>
          <h1>Gestionar Perfil</h1>
        </div>
      </header>

      <div className="admin-scrollable-content">
        <div className="profile-form-container">
          <form className="profile-form" onSubmit={validateAndSubmit}>
            <div className="profile-section">
              <h2 className="profile-section-title">Información Personal</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="firstName">Nombre</label>
                  <input id="firstName" name="firstName" className="form-input" type="text" value={profileData.firstName} onChange={handleProfileChange} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="lastName">Apellido</label>
                  <input id="lastName" name="lastName" className="form-input" type="text" value={profileData.lastName} onChange={handleProfileChange} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input id="email" name="email" className="form-input" type="email" value={profileData.email} onChange={handleProfileChange} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Teléfono</label>
                  <input id="phone" name="phone" className="form-input" type="tel" value={profileData.phone} onChange={handleProfileChange} />
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h2 className="profile-section-title">Cambiar Contraseña</h2>
              <p className="section-subtitle">Para cambiar tu contraseña, ingresa primero tu contraseña actual.</p>
              <div className="form-grid security-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="currentPassword">Contraseña Actual</label>
                  <input id="currentPassword" name="currentPassword" className={`form-input ${errors.currentPassword ? 'input-error' : ''}`} type="password" placeholder="••••••••" value={passwordData.currentPassword} onChange={handlePasswordChange} />
                  {errors.currentPassword && <span className="error-message">{errors.currentPassword}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="newPassword">Nueva Contraseña</label>
                  <input id="newPassword" name="newPassword" className={`form-input ${errors.newPassword ? 'input-error' : ''}`} type="password" placeholder="••••••••" value={passwordData.newPassword} onChange={handlePasswordChange} />
                  {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="confirmPassword">Confirmar Contraseña</label>
                  <input id="confirmPassword" name="confirmPassword" className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`} type="password" placeholder="••••••••" value={passwordData.confirmPassword} onChange={handlePasswordChange} />
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
              </div>
            </div>

            <div className="profile-form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/home')}>Cancelar</button>
              <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}