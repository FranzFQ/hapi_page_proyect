import { useState } from "react";
import "../style/UserLogin.css"

function PasswordLoginPage() {
  const [password, setPassword] = useState("");
  const email = localStorage.getItem("email");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos:", { email, password });

  };

  // arrow function que redirige a /home
  const gotoHome = () => {
    window.location.href = "/home";
  }

  return (
    <div className="wrapper-container">
      <div className="login-container">
        <h1>Ingresa la contraseña</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" onClick={gotoHome}>Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default PasswordLoginPage;
