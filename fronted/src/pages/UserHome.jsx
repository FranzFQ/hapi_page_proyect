import React from 'react';
import Header from '../user-components/Header';
import Sidebar from '../user-components/Sidebar';
import InvestmentSection from '../user-components/InvestmentSection';
import FavoritesSection from '../user-components/FavoritesSection';
import CategoriesSection from '../user-components/CategoriesSection';

import '../style/UserGlobal.css';
import '../style/UserHome.css';

const UserHome = () => {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="main-content">
        {/* Sidebar */}
        <Sidebar />

        {/* Center Content */}
        <main className="center-content">
          <div className="top-section">
            <InvestmentSection />
            <FavoritesSection />
          </div>

          <CategoriesSection />
        </main>
      </div>
    </div>
  );
};

export default UserHome;
