import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserHome from "./pages/UserHome.jsx";
import UserRegister from "./user-components/UserRegister.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import UserPortfolio from "./pages/UserPortfolio.jsx";
import EmailLoginPage from "./pages/EmailLoginPage.jsx";
import PasswordLoginPage from "./pages/PasswordLoginPage.jsx";
import ManageStocksPage from './pages/ManageStocksPage';
import AddStockPage from './pages/AddStockPage';
import EditStockPage from './pages/EditStockPage';
import StockDetailsPage from './pages/StockDetailsPage';

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
          <Route path="/portfolio" element={<UserPortfolio />} />
        </Routes>
    </Router>
  );
}