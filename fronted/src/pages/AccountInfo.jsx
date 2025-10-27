import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../style/AccountInfo.css";
import { getUserById } from "../service/User.api";
import UserExist from "../hooks/userExist";

export default function AccountInfo() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [referral_code, setReferral_code] = useState("");

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const permition = UserExist();
    if (permition) {
      navigate("/");
      return;
    }
    getUserById(userId).then((response) => {
      const userData = response.data;
      if (userData) {
        setFirstName(userData.first_name);
        setLastName(userData.last_name);
        setEmail(userData.email);
        setPhone(userData.phone);
        setReferral_code(userData.referral_code);
      }
    });
  }, []);

  const handleDeleteAccount = () => {
    const isConfirmed = window.confirm(
      "¿Estás seguro de que quieres eliminar tu cuenta de forma permanente? Esta acción no se puede deshacer."
    );

    if (isConfirmed) {
      alert("Tu cuenta ha sido eliminada. (Simulación Frontend)");
      navigate("/loginEmail");
    }
  };

  return (
    <div className="account-info-container">
      <div className="account-info-header">
        <button
          onClick={() => navigate("/settings")}
          className="back-button"
          title="Volver a ajustes"
        >
          <i className="fi fi-rr-arrow-left"></i>
        </button>
        <h2>Información de la Cuenta</h2>
      </div>

      <div className="account-info-body">
        <div className="info-section">
          <h3 className="info-section-title">Datos Personales</h3>
          <div className="info-item">
            <span className="info-label">Nombre</span>
            <span className="info-value">{firstName}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Apellido</span>
            <span className="info-value">{lastName}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Correo</span>
            <span className="info-value">{email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Telefono</span>
            <span className="info-value">{phone}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Codigo</span>
            <span className="info-value">{referral_code}</span>
          </div>
        </div>
      </div>

      <div className="account-info-actions">
        <button className="delete-button" onClick={handleDeleteAccount}>
          <i className="fi fi-rr-trash"></i>
          Eliminar Cuenta
        </button>
      </div>
    </div>
  );
}
