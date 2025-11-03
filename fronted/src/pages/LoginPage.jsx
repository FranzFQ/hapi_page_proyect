import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style/UserLogin.css";
import { EyeIcon, EyeOffIcon } from "../global-components/EyeIcon";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:8000/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Credenciales inválidas');
      }
    })
    .then(data => {
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("clientId", data.clientId);
      alert("Inicio de sesión exitoso");
      navigate("/home");
    })
    .catch((error) => {
      alert("Hubo un error al iniciar sesión: " + error.message);
      console.error("Error al hacer login:", error);
    });
  };

  return (
    <div className="wrapper-container">
      <div className="login-container">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          <button type="submit">Ingresar</button>
        </form>
        
        <div className="create-account">
          <p>¿No tienes cuenta?</p>
          <Link to="/register">Crear cuenta</Link>
        </div>
      </div>
    </div>
  );
}