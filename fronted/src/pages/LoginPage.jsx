import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style/UserLogin.css";
import { getUserByEmail } from "../service/User.api";
import { EyeIcon, EyeOffIcon } from "../global-components/EyeIcon";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Intentando iniciar sesión con:", { email, password });
    
    getUserByEmail(email)
      .then((response) => {
        const user = response.data[0];
        console.log(user);
        
        if (user && user.password === password) {
          console.log("Inicio de sesión exitoso para:", user);
          localStorage.setItem("userId", user.id);
          alert("Inicio de sesion exitoso");
          navigate("/home");
        } else {
          console.error("Error de inicio de sesión: Credenciales inválidas");
        }
      })
      .catch((error) => {
        alert("Hubo un error a la hora de iniciar sesion");
        console.error("Error al obtener el usuario:", error);
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