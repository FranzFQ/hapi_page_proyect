import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../style/SettingsPage.css";
import UserExist from "../hooks/userExist";

const SettingsPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const permition = UserExist();
    if (permition) {
      navigate("/");
      return;
    }
  }, []);

  return (
    <div className="settings-page-background">
      <div className="settings-page-container fade-in">
        <header className="settings-page-header">
          <h1>Gestion del Perfil</h1>
        </header>
        <main className="settings-page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
