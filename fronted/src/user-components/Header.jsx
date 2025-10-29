import React from "react";
import SearchBar from "../global-components/SearchBar.jsx";
import { useNavigate } from "react-router-dom";
import "../style/UserGlobal.css";

const Header = () => {
  const navigate = useNavigate();

  const handleSettingUser = () => {
    navigate("/settings");
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img className="logo" src="/../../public/images/Hapi.png" />
      </div>

      <div className="search-container">
        <div className="search-bar-wrapper">
          <SearchBar placeholder="Buscar acciones, cripto, fondos..." />
        </div>
        <button
          className="search-btn"
          style={{ zIndex: 10000, position: "relative" }}
        >
          <i className="fi fi-br-search"></i>
        </button>
      </div>

      <div className="user-icon" onClick={handleSettingUser}>
        <button className="user-btn">
          <i className="fi fi-rr-user"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
