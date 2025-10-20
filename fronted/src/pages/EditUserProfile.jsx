import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/EditUserProfile.css';

const countries = [
  { name: 'Guatemala', flag: '🇬🇹' },
  { name: 'México', flag: '🇲🇽' },
  { name: 'El Salvador', flag: '🇸🇻' },
  { name: 'Ecuador', flag: '🇪🇨' },
  { name: 'Colombia', flag: '🇨🇴' },
  { name: 'Estados Unidos', flag: '🇺🇸' },
];

const defaultProfile = {
  firstName: 'Juan',
  lastName: 'Pérez',
  country: 'Guatemala',
  phone: '+502 1234 5678',
  email: 'juan.perez@email.com',
  riskProfile: 'Moderado',
  investmentExperience: 'Intermedio',
  profilePicture: 'https://source.unsplash.com/random/200x200?person',
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
  
  const [profilePicturePreview, setProfilePicturePreview] = useState(profileData.profilePicture);
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

  const handlePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setProfilePicturePreview(fileReader.result);
        setProfileData(prev => ({ ...prev, profilePicture: fileReader.result }));
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const validateAndSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const wantsToChangePassword = passwordData.currentPassword || passwordData.newPassword || passwordData.confirmPassword;

    if (wantsToChangePassword) {
      if (!passwordData.currentPassword) newErrors.currentPassword = 'Debes ingresar tu contraseña actual.';
      else if (passwordData.currentPassword !== FAKE_CORRECT_PASSWORD) newErrors.currentPassword = 'La contraseña actual es incorrecta.';
      if (passwordData.newPassword && passwordData.newPassword.length < 8) newErrors.newPassword = 'Debe tener al menos 8 caracteres.';
      if (passwordData.newPassword !== passwordData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    localStorage.setItem('userProfile', JSON.stringify(profileData));
    alert('Perfil actualizado con éxito.');
    navigate('/settings');
  };

  return (
    <div className="profile-form-wrapper">
      <div className="profile-form-header">
        <button type="button" onClick={() => navigate('/settings')} className="back-button" title="Volver a ajustes">
          <i className="fi fi-rr-arrow-left"></i>
        </button>
        <h2>Gestionar Perfil</h2>
      </div>
      <form className="profile-form" onSubmit={validateAndSubmit} noValidate>
        <div className="profile-section picture-section">
          <img src={profilePicturePreview} alt="Vista previa de perfil" className="profile-picture-preview"/>
          <label htmlFor="profilePictureInput" className="profile-picture-upload-btn">
            <i className="fi fi-rr-camera"></i> Cambiar Foto
          </label>
          <input id="profilePictureInput" type="file" accept="image/*" onChange={handlePictureChange} style={{ display: 'none' }}/>
        </div>

        <div className="profile-section">
          <h3 className="profile-section-title">Información Personal</h3>
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
            <div className="form-group">
              <label className="form-label" htmlFor="country">País de Residencia</label>
              <select id="country" name="country" className="form-input" value={profileData.country} onChange={handleProfileChange}>
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="profile-section">
          <h3 className="profile-section-title">Cambiar Contraseña</h3>
          <p className="section-subtitle">Si no deseas cambiar de contraseña, deja los campos vacios.</p>
          <div className="form-grid">
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
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/settings')}>Cancelar</button>
          <button type="submit" className="btn btn-primary">Guardar Cambios</button>
        </div>
      </form>
    </div>
  );
}