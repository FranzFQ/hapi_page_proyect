import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../style/UserLogin.css'; // Reutilizamos los mismos estilos

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Intentando iniciar sesión con:", { email, password });
    // Aquí iría la lógica para verificar las credenciales con el backend
    // Si la autenticación es exitosa:
    navigate('/home'); 
    // Si falla, un mensaje de error
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
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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