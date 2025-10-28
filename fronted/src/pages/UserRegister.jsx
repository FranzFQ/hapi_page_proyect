import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "../global-components/EyeIcon";
import { createClientProfile, registerUser } from "../service/User.api.js";
import { useNavigate, Link } from "react-router-dom";

import "../style/UserRegister.css";

export default function UserRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

const [form, setForm] = useState({
  password: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  used_referral_code: "",
});

const generateReferralCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
  e.preventDefault();
  
  const referralCode = generateReferralCode();
  const now = new Date().toISOString();
  
  const finalForm = {
    password: form.password,
    last_login: null,
    is_superuser: false,
    first_name: form.first_name,
    last_name: form.last_name,
    email: form.email,
    is_staff: false,
    is_active: true,
    date_joined: now,
    phone: form.phone,
    is_verified: false,
    type: "user",
    last_ip: "0.0.0.0",
    status: "active",
    referral_code: referralCode,
    used_referral_code: form.used_referral_code,
    created_at: now,
    modified_at: now,
  };

  console.log("Form submitted:", finalForm);
  
  registerUser(finalForm)
    .then((response) => {

      console.log("User registered successfully:", response.data);

      const userId = response.data.id;

      const profileData = {
        balance_available: 0.0,
        client_profilecol: 0.0,
        user_id: userId,
      }

      createClientProfile(profileData).then((response) => {
        profileId = response.data.id;
        console.log("Client profile created:", response.data);
      })

      alert("Registro exitoso. ¡Bienvenido!");

      localStorage.setItem("userId", userId);
      
      navigate("/home");

    })
    .catch((error) => {
      console.error("Error completo:", error);
      // Mostrar el error específico
      if (error.response?.data) {
        console.log("DETALLE DEL ERROR:", JSON.stringify(error.response.data, null, 2));
      }
      
      alert("Hubo un error al registrar. Ver consola.");
    });  

};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="user-register-container">
      <div className="user-register-form fade-in">
        <h2 className="form-title">Crear Cuenta</h2>
        <p className="form-subtitle">
          Bienvenido, por favor llena los siguientes campos para registrarte
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nombre</label>
            <input
              className="form-input"
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Apellido</label>
            <input
              className="form-input"
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              placeholder="Tu apellido"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Número Telefónico</label>
            <input
              className="form-input"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="12345678"
              maxLength={8}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <div className="password-input-wrapper">
              <input
                className="form-input"
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
                aria-label="Mostrar/Ocultar contraseña"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Código de Referencia (Opcional)
            </label>

            <input
              className="form-input"
              type="text"
              name="used_referral_code"
              value={form.used_referral_code}
              onChange={handleChange}
              placeholder="Ingresa un código de referencia"
              maxLength={8}
            />
            <small className="form-hint">
              ¿Tienes un código de referencia? Ingrésalo aquí
            </small>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
