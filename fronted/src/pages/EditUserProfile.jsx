import React, { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../service/User.api";
import { EyeIcon, EyeOffIcon } from "../global-components/EyeIcon";
import "../style/EditUserProfile.css";
import UserExist from "../hooks/userExist";

export default function EditUserProfile() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Estados para controlar la visibilidad de las contraseñas
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const permition = UserExist();
    if (permition) {
      navigate("/");
      return;
    }
    const userId = localStorage.getItem("userId")
    getUserById(userId).then((response) => {
      const userData = response.data;
      if (userData) {
        setFirstName(userData.first_name);
        setLastName(userData.last_name);
        setEmail(userData.email);
        setPhone(userData.phone);
        setPassword(userData.password);
      }
    });
  }, []);

  const validateAndSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (newPassword !== confirmPassword) {
      alert("Las nuevas contraseñas no coinciden.");
      return;
    } else {
      setPassword(newPassword);

      const newUserData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        password: password,
        modified_at: new Date().toISOString(),
      };

      updateUser(userId, newUserData)
        .then((response) => {
          alert("Perfil actualizado con éxito.");
          navigate("/settings");
        })
        .catch((error) => {
          console.error("Error updating user profile:", error);
          alert("Hubo un error al actualizar el perfil.");
        });
    }
  };

  return (
    <div className="profile-form-wrapper">
      <div className="profile-form-header">
        <button
          type="button"
          onClick={() => navigate("/settings")}
          className="back-button"
          title="Volver a ajustes"
        >
          <i className="fi fi-rr-arrow-left"></i>
        </button>
        <h2>Gestionar Perfil</h2>
      </div>
      <form className="profile-form" onSubmit={validateAndSubmit} noValidate>
        <div className="profile-section">
          <h3 className="profile-section-title">Información Personal</h3>
          <p className="section-subtitle">
            Si no deseas cambiar de datos personale, deja los campos vacios.
          </p>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label" htmlFor="firstName">
                Nombre
              </label>
              <input
                id="firstName"
                name="firstName"
                className="form-input"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="lastName">
                Apellido
              </label>
              <input
                id="lastName"
                name="lastName"
                className="form-input"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="phone">
                Teléfono
              </label>
              <input
                id="phone"
                name="phone"
                className="form-input"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3 className="profile-section-title">Cambiar Contraseña</h3>
          <p className="section-subtitle">
            Si no deseas cambiar de contraseña, deja los campos vacios.
          </p>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label" htmlFor="currentPassword">
                Contraseña Actual
              </label>
              <div className="password-input-wrapper">
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  aria-label={
                    showCurrentPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                >
                  {showCurrentPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="newPassword">
                Nueva Contraseña
              </label>
              <div className="password-input-wrapper">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  aria-label={
                    showNewPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                >
                  {showNewPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">
                Confirmar Contraseña
              </label>
              <div className="password-input-wrapper">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/settings")}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}
