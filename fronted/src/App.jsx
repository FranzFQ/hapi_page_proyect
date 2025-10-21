import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserHome from "./pages/UserHome.jsx";
import UserRegister from "./user-components/UserRegister.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EmailLoginPage from "./pages/EmailLoginPage.jsx";
import PasswordLoginPage from "./pages/PasswordLoginPage.jsx";
import ManageStocksPage from './pages/ManageStocksPage';
import AddStockPage from './pages/AddStockPage';
import EditStockPage from './pages/EditStockPage';
import StockDetailsPage from './pages/StockDetailsPage';
import UserTransferPage from "./pages/UserTransferPage.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserTransferPage />} />
        <Route path="/home" element={<UserHome />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/loginEmail" element={<EmailLoginPage />} />
        <Route path="/loginPassword" element={<PasswordLoginPage />} />

        <Route path="/transfer" element={<UserTransferPage />} />

        <Route path="/admin/stocks" element={<ManageStocksPage />} />
        <Route path="/admin/stocks/add" element={<AddStockPage />} />
        <Route path="/admin/stocks/edit/:stockId" element={<EditStockPage />} />
        <Route path="/admin/stocks/:stockId" element={<StockDetailsPage />} />
      </Routes>
    </Router>
  );
}