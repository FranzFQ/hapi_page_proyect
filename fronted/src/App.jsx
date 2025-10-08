import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRegister from "./user-components/UserRegister.jsx";
import UserHome from "./pages/UserHome.jsx";
import EmailLoginPage from "./pages/EmailLoginPage.jsx";
import PasswordLoginPage from "./pages//PasswordLoginPage.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx";

export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<UserHome />} />
          <Route path="/home" element={<UserHome />} />
          <Route path="/loginEmail" element={<EmailLoginPage />} />
          <Route path="/loginPassword" element={<PasswordLoginPage />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
    </Router>
  );
}