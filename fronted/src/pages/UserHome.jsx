import React from "react";
import Header from "../user-components/Header";
import Sidebar from "../user-components/Sidebar";
import InvestmentSection from "../user-components/InvestmentSection";
import FavoritesSection from "../user-components/FavoritesSection";
import CategoriesSection from "../user-components/CategoriesSection";
import { useEffect } from "react";

import "../style/UserGlobal.css";
import "../style/UserHome.css";
import { getAllUsers } from "../service/User.api";

const UserHome = () => {
  
  useEffect(() => {
  async function fetchUsers() {
    try {
      const response = await getAllUsers();
      console.log("All users:", response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
  fetchUsers();
}, []);

  const userBalance = 1234.56;

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
