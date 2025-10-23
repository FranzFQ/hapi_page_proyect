import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "../style/UserHome.css";

export default function PortfolioSection({ balance }) {
  const [activeTab, setActiveTab] = useState("portafolio");

  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(balance || 0);

  const dataPortafolio = [
    { name: "Activos", value: 70 },
    { name: "Pendientes", value: 20 },
    { name: "Dinero", value: 10 },
  ];

  const dataActivos = [
    { name: "Activos confirmados", value: 80 },
    { name: "Activos pendientes", value: 20 },
  ];

  const COLORS_PORT = ["#2C93E8", "#2FA84F", "#FFD700"];
  const COLORS_ACTIVOS = ["#2FA84F", "#FFD700"];

  return (
    <div className="portfolio-section dark-mode">
      {/* Encabezado */}
      <div className="portfolio-header">
        <h2 className="portfolio-title">NOMBRE</h2>
        <div className="portfolio-tabs">
          <span
            className={`tab ${activeTab === "portafolio" ? "active" : ""}`}
            onClick={() => setActiveTab("portafolio")}
          >
            Portafolio
          </span>
          <span
            className={`tab ${activeTab === "activos" ? "active" : ""}`}
            onClick={() => setActiveTab("activos")}
          >
            Activos
          </span>
        </div>
      </div>

      <hr className="portfolio-divider" />

      {/* Contenido dinámico */}
      {activeTab === "portafolio" ? (
        <div className="portfolio-body">
          <div className="account-card">
            <h3 className="account-title">Mi cuenta</h3>
            <div className="account-details">
              <p>
                <strong>Total en activos:</strong> <span>{formattedBalance}</span>
              </p>
              <p>
                <strong>Total dinero:</strong> <span>$0.00</span>
              </p>
              <p>
                <strong>Activos pendientes:</strong> <span>$0.00</span>
              </p>
            </div>
          </div>

          <div className="chart-card">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={dataPortafolio}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dataPortafolio.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS_PORT[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="portfolio-body">
          <div className="account-card">
            <h3 className="account-title">Activos</h3>
            <p>En esta sección puedes ver el estado actual de tus activos.</p>
            <ul className="activos-list">
              <li>Activos confirmados: 80%</li>
              <li>Pendientes: 20%</li>
            </ul>
          </div>

          <div className="chart-card">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={dataActivos}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dataActivos.map((entry, index) => (
                    <Cell key={`cell-activo-${index}`} fill={COLORS_ACTIVOS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <hr className="portfolio-divider" />

      <div className="portfolio-history">
        <h3 className="history-title">Historial</h3>
        <p className="history-placeholder">
          No hay movimientos recientes.
        </p>
      </div>
    </div>
  );
}
