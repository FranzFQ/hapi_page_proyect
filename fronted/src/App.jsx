import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import UserHome from "./pages/UserHome.jsx";
import UserRegister from "./pages/UserRegister.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import UserPortfolio from "./pages/UserPortfolio.jsx";
import SettingsPage from './user-components/SettingsPage.jsx';
import SettingsMenu from './pages/SettingsMenu.jsx';
import AccountInfo from './pages/AccountInfo.jsx';
import EditUserProfile from './pages/EditUserProfile.jsx';
import ReferralSelection from './user-components/ReferralSelection.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import SessionTimeoutHandler from "./global-components/sessionTimeoutHandler.jsx";
// import BankingPage from "./pages/user-transfer/BankingPage.jsx";
// import DepositPage from "./pages/user-transfer/DepositPage.jsx";
// import WithdrawPage from "./pages/user-transfer/WithdrawPage.jsx";
// import TransferPage from "./pages/user-transfer/TransferPage.jsx";
// import AmountPage from "./pages/user-transfer/AmountPage.jsx";

export default function App() {
  
  return (
    <Router>
      <SessionTimeoutHandler/>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/home" element={<UserHome />} />  
        <Route path="/portfolio" element={<UserPortfolio />} />
        {/* <Route path="/banking" element={<BankingPage />} />
        <Route path="/banking/deposit" element={<DepositPage />} />
        <Route path="/banking/withdraw" element={<WithdrawPage />} />
        <Route path="/banking/transfer" element={<TransferPage />} />
        <Route path="/banking/:operation/amount" element={<AmountPage />}/>         */}
        
        <Route path="/settings" element={<SettingsPage />}>
          <Route index element={<SettingsMenu />} />
          <Route path="account" element={<AccountInfo />} />
          <Route path="edit-profile" element={<EditUserProfile />} />
          <Route path="Referral" element={<ReferralSelection />} />
        </Route>
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </Router>
  );
}
