// src/user-components/UserRegister.jsx
import { useState } from "react"

export default function UserRegister() {
  const [form, setForm] = useState({
    country: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }
    console.log("Usuario creado:", form)
    alert("Usuario creado con éxito")
  }

  return (
    <div className="form-container fade-in">
      <h2 className="form-title">Crear Cuenta</h2>
      <p className="form-subtitle">
        Bienvenido, por favor llena los siguientes campos para registrarte
      </p>
      <form onSubmit={handleSubmit}>
        <label>País</label>
        <input
          type="text"
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="Ej: Guatemala"
          required
        />

        <label>Número Telefónico</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Ej: +502 12345678"
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="correo@ejemplo.com"
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label>Confirmar Contraseña</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-primary">
          Registrar
        </button>
      </form>
    </div>
  )
}