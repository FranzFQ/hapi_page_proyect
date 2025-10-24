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

import SettingsPage from './user-components/SettingsPage.jsx';
import SettingsMenu from './pages/SettingsMenu.jsx';
import AccountInfo from './pages/AccountInfo.jsx';
import EditUserProfile from './pages/EditUserProfile.jsx';
import SecurityMethods from './pages/SecurityMethods.jsx';
import LanguageSelection from './user-components/LanguageSelection.jsx';
import ReportsPage from './pages/ReportsPage.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/home" element={<UserHome />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/loginEmail" element={<EmailLoginPage />} />
        <Route path="/loginPassword" element={<PasswordLoginPage />} />
        <Route path="/admin/stocks" element={<ManageStocksPage />} />
        <Route path="/admin/stocks/add" element={<AddStockPage />} />
        <Route path="/admin/stocks/edit/:stockId" element={<EditStockPage />} />
        <Route path="/admin/stocks/:stockId" element={<StockDetailsPage />} />
        
        <Route path="/settings" element={<SettingsPage />}>
          <Route index element={<SettingsMenu />} />
          <Route path="account" element={<AccountInfo />} />
          <Route path="edit-profile" element={<EditUserProfile />} />
          <Route path="security" element={<SecurityMethods />} />
          <Route path="language" element={<LanguageSelection />} />
        </Route>
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </Router>
  );
}
