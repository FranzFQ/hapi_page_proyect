import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserHome from "./pages/UserHome.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import UserRegister from "./pages/UserRegister.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import UserPortfolio from "./pages/UserPortfolio.jsx";;
import SettingsPage from './user-components/SettingsPage.jsx';
import SettingsMenu from './pages/SettingsMenu.jsx';
import AccountInfo from './pages/AccountInfo.jsx';
import EditUserProfile from './pages/EditUserProfile.jsx';
import SecurityMethods from './pages/SecurityMethods.jsx';
import LanguageSelection from './user-components/LanguageSelection.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import BankingPage from "./pages/user-transfer/BankingPage.jsx";
import DepositPage from "./pages/user-transfer/DepositPage.jsx";
import WithdrawPage from "./pages/user-transfer/WithdrawPage.jsx";
import TransferPage from "./pages/user-transfer/TransferPage.jsx";
import AmountPage from "./pages/user-transfer/AmountPage.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/home" element={<UserHome />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/portfolio" element={<UserPortfolio />} />

        <Route path="/banking" element={<BankingPage />} />
        <Route path="/banking/deposit" element={<DepositPage />} />
        <Route path="/banking/withdraw" element={<WithdrawPage />} />
        <Route path="/banking/transfer" element={<TransferPage />} />
        <Route path="/banking/:operation/amount" element={<AmountPage />}/>        
        
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
