import React from 'react';
import { Outlet } from 'react-router-dom';
import '../style/SettingsPage.css';

const SettingsPage = () => {
  return (
    <div className="settings-page-background">
      <div className="settings-page-container fade-in">
        <header className="settings-page-header">
          <h1>Gestión De Perfil</h1>
        </header>
        <main className="settings-page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;