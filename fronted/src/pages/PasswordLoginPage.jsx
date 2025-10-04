import { useState } from "react";
import "../style/temp.css"

export function PasswordLoginPage() {
  const [password, setPassword] = useState("");
  const email = localStorage.getItem("email");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos:", { email, password });

  };

  return (
    <div className="password-container">
      <h1>Hola, {email}</h1>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
}