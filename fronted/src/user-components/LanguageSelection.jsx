import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/LanguageSelection.css';

const languages = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
];

const LanguageSelection = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('es');

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    alert(`Idioma cambiado a ${langCode}. (Lógica de frontend)`);
  };

  return (
    <div className="language-selection-container">
      <div className="language-selection-header">
        <button onClick={() => navigate('/settings')} className="back-button" title="Volver a ajustes">
          <i className="fi fi-rr-arrow-left"></i>
        </button>
        <h2>Seleccionar Idioma</h2>
      </div>

      <ul className="language-options-list">
        {languages.map((lang) => (
          <li 
            key={lang.code} 
            className={selectedLanguage === lang.code ? 'selected' : ''}
            onClick={() => handleLanguageChange(lang.code)}
          >
            <span className="flag">{lang.flag}</span>
            <span className="name">{lang.name}</span>
            <div className="radio-button">
              {selectedLanguage === lang.code && <div className="radio-dot"></div>}
            </div>
          </li>
        ))}
      </ul>
       <div className="language-actions">
        <button className="btn btn-primary" onClick={() => navigate('/settings')}>Confirmar</button>
      </div>
    </div>
  );
};

export default LanguageSelection;