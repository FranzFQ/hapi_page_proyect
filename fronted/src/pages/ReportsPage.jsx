import React from 'react';
import Header from '../user-components/Header';
import Sidebar from '../user-components/Sidebar';
import ReportForm from '../user-components/ReportForm.jsx';
import '../style/UserGlobal.css';
import '../style/UserHome.css';
import '../style/SettingsPage.css';

export default function ReportsPage() {
  return (
    <div className="dashboard-container fade-in">
      <Header />
      <div className="main-content">
        <Sidebar />
        <main className="center-content">
          <div className="reports-page-wrapper">
            <ReportForm />
          </div>
        </main>
      </div>
    </div>
  );
}