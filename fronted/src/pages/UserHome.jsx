import React from "react";
import Header from "../user-components/Header";
import Sidebar from "../user-components/Sidebar";
import InvestmentSection from "../user-components/InvestmentSection";
import FavoritesSection from "../user-components/FavoritesSection";
import CategoriesSection from "../user-components/CategoriesSection";
import "../style/UserGlobal.css";
import "../style/UserHome.css";
import { useEffect, useState } from "react";

const UserHome = () => {
  const [balance, setBalence] = useState(0);

  useEffect(() => {
  async function fetchUsers() {
    const userId = localStorage.getItem("userId");
    console.log(userId)
  }
  fetchUsers();
}, []);

  const userBalance = balance;

  return (
    <div className="dashboard-container fade-in">
      <Header />
      <div className="main-content">
        <Sidebar />
        <main className="center-content">
          <div className="top-section">
            <InvestmentSection balance={userBalance} />
            <FavoritesSection />
          </div>
          <CategoriesSection />
        </main>
      </div>
    </div>
  );
};

export default UserHome;
