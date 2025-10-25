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
{/*Transfers*/}
import BankingPage from "./pages/user-transfer/BankingPage.jsx";
import DepositPage from "./pages/user-transfer/DepositPage.jsx";
import WithdrawPage from "./pages/user-transfer/WithdrawPage.jsx";
import TransferPage from "./pages/user-transfer/TransferPage.jsx";
import MethodsPage from "./pages/user-transfer/MethodsPage.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BankingPage />} />
        <Route path="/home" element={<UserHome />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/loginEmail" element={<EmailLoginPage />} />
        <Route path="/loginPassword" element={<PasswordLoginPage />} />

        <Route path="/banking" element={<BankingPage />} />
        <Route path="/banking/deposit" element={<DepositPage />} />
        <Route path="/banking/withdraw" element={<WithdrawPage />} />
        <Route path="/banking/transfer" element={<TransferPage />} />
        <Route path="/banking/:operation/methods" element={<MethodsPage />}/>

        <Route path="/admin/stocks" element={<ManageStocksPage />} />
        <Route path="/admin/stocks/add" element={<AddStockPage />} />
        <Route path="/admin/stocks/edit/:stockId" element={<EditStockPage />} />
        <Route path="/admin/stocks/:stockId" element={<StockDetailsPage />} />
      </Routes>
    </Router>
  );
}