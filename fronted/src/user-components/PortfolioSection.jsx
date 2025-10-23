import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "../style/UserHome.css";

export default function PortfolioSection({ balance }) {
  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(balance || 0);


  const data = [
    { name: "Activos", value: 70 },
    { name: "Pendientes", value: 20 },
    { name: "Dinero", value: 10 },
  ];

  const COLORS = ["#2C93E8", "#2FA84F", "#FFD700"];

  return (
    <div className="portfolio-container">
      <div className="portfolio-header">
        <h2 className="portfolio-title">NOMBRE</h2>
        <div className="portfolio-tabs">
          <span>PORTAFOLIO</span>
          <span>ACTIVOS</span>
        </div>
        <hr className="portfolio-divider" />
      </div>

      <div className="portfolio-content">
        <div className="account-info">
          <h3>MI CUENTA</h3>
          <p><strong>TOTAL EN ACTIVOS:</strong> <span>${formattedBalance}</span></p>
          <p><strong>TOTAL EN DINERO:</strong> <span>$0.00</span></p>
          <p><strong>ACTIVOS PENDIENTES:</strong> <span>$0.00</span></p>
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <hr className="portfolio-divider" />
      <div className="history-section">
        <h3>HISTORIAL</h3>
      </div>
    </div>
  );
}