import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style/UserLogin.css"


function EmailLoginPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    localStorage.setItem("email", email);
    navigate("/loginPassword");
  };

  return (
    <div className="wrapper-container">
        <div className="login-container email-container">
        <h1>Ingresa tu correo</h1>
        <form onSubmit={handleNext}>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Siguiente</button>
        </form>
    
        <div className="create-account">
          <p>¿No tienes cuenta?</p>
          <Link to="/register">Crear cuenta</Link>
        </div>
      </div>
    </div>
  );
}

export default EmailLoginPage;
