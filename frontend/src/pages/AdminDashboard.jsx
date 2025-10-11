import React from 'react';
import Sidebar from '../admin-components/Sidebar.jsx';
import DashboardHeader from '../admin-components/DashboardHeader.jsx';
import StatCard from '../admin-components/StatCard.jsx';
import ActionsList from '../admin-components/ActionsList.jsx';
import AnalyticsChart from '../admin-components/AnalyticsChart.jsx';
import '../style/AdminDashboard.css';

export default function AdminDashboard() {
  const adminStats = {
    totalUsers: 132,
    pendingUsers: 15,
    dailyTransactions: 487,
  };

  const availableActions = [
    { id: 'act_01', name: 'Apple Inc.' },
    { id: 'act_02', name: 'Microsoft Corp.' },
    { id: 'act_03', name: 'Amazon.com, Inc.' },
    { id: 'act_04', name: 'NVIDIA Corp.' },
  ];

  return (
    <div className="admin-dashboard fade-in">
      <Sidebar />
      <main className="admin-main-content">
        <DashboardHeader />
        <div className="admin-scrollable-content">
          <div className="admin-stats-grid">
            <StatCard title="TOTAL DE USUARIOS" value={adminStats.totalUsers} />
            <StatCard title="USUARIOS PENDIENTES" value={adminStats.pendingUsers} />
            <StatCard title="TOTAL TRANSACCIONES/DIA" value={adminStats.dailyTransactions} />
          </div>
          <div className="admin-widgets-grid">
            <ActionsList actions={availableActions} />
            <AnalyticsChart />
          </div>
        </div>
      </main>
    </div>
  );
}