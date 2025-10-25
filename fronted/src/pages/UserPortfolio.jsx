import React from "react";
import Header from "../user-components/Header";
import Sidebar from "../user-components/Sidebar";
import PortfolioSection from "../user-components/PortfolioSection";
import "../style/UserGlobal.css";
import "../style/UserHome.css";

const UserPortfolio = () => {
  const userBalance = 1234.56;

  return (
    <div className="dashboard-container fade-in">
      <Header />
      <div className="main-content">
        <Sidebar />
        <main className="center-content">
          <PortfolioSection balance={userBalance} />
        </main>
      </div>
    </div>
  );
};

export default UserPortfolio;