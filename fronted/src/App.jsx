import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserHome from "./pages/UserHome.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import UserRegister from "./pages/UserRegister.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> 
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/register" element={<UserRegister />} />
        <Route path="/home" element={<UserHome />} /> 
      </Routes>
    </Router>
  );
}