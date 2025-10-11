import { useState } from "react"
import "../style/UserRegister.css"

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
    <div className="user-register-container">
      <div className="user-register-form fade-in">
        <h2 className="form-title">Crear Cuenta</h2>
        <p className="form-subtitle">
          Bienvenido, por favor llena los siguientes campos para registrarte
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">País</label>
            <input
              className="form-input"
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Ej: Guatemala"
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
              placeholder="Ej: +502 12345678"
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
            <input
              className="form-input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Confirmar Contraseña</label>
            <input
              className="form-input"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Registrar
          </button>
        </form>
      </div>
    </div>
  )
}