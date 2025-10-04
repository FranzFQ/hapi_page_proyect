import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import UserRegister from "./user-components/UserRegister"
import { EmailLoginPage } from "./pages/EmailLoginPage"
import { PasswordLoginPage } from "./pages/PasswordLoginPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/loginEmail" />} />
        <Route path="loginEmail" element={<EmailLoginPage />} />
        <Route path="loginPassword" element={<PasswordLoginPage />} />
        <Route path="register" element={<UserRegister />} />
      </Routes>
    </BrowserRouter>
  )
}
