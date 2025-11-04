import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "../style/UserHome.css";
import {
  getPortfolioByClientId,
  getPortfolioInvestmentByPortafolioId,
  getStockById,
} from "../service/User.api";

export default function PortfolioSection({ balance }) {
  const [activeTab, setActiveTab] = useState("portafolio");
  const [portfolio, setPortfolio] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [active, setActive] = useState(0)
  const [activeTotal, setActiveTotal] = useState(0.0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const clientId = localStorage.getItem("clientId");
    getPortfolioByClientId(clientId).then((response) => {
      const portfolioData = response.data[0];
      if (portfolioData) {
        getPortfolioInvestmentByPortafolioId(portfolioData.id).then(
          (response) => {
            const portfolioInvestment = response.data;
            if (portfolioInvestment) {
              const stocksName = [];
              const valid = []
              let total = 0;
              for (let p of portfolioInvestment) {
                if (p.is_active) {
                  total += parseFloat(p.purchase_price);
                  valid.push
                  stocksName.push(
                    getStockById(p.stock).then((response) => response.data.name)
                  );
                }
              }
              setPortfolio(portfolioInvestment);
              setActiveTotal(total);
              setTotal(total + balance);
              setActive(valid.length)
              Promise.all(stocksName).then((stockNames) => {
                setStocks(stockNames);
              });
            }
          }
        );
      }
    });
  }, []);

  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(activeTotal || 0);

  const dataPortafolio = [
    { name: "Activos", value: (activeTotal / total) * 100 },
    { name: "Dinero", value: (balance / total) * 100 },
  ];

  const dataActivos = [
    { name: "Activos confirmados", value: (active / portfolio.length) * 100},
    { name: "Activos pendientes", value: ((portfolio.length - active) / portfolio.length) * 100 },
  ];

  const COLORS_PORT = ["#2C93E8", "#2FA84F"];
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
      {activeTab === "portafolio" ? (
        <div className="portfolio-body">
          <div className="account-card">
            <h3 className="account-title">Mi cuenta</h3>
            <div className="account-details">
              <p>
                <strong>Total en activos:</strong>{" "}
                <span>{formattedBalance}</span>
              </p>
              <p>
                <strong>Total dinero:</strong> <span>${balance}</span>
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
              <li>Activos confirmados: {portfolio.length}</li>
              <li>Pendientes: {active}</li>
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
                    <Cell
                      key={`cell-activo-${index}`}
                      fill={COLORS_ACTIVOS[index]}
                    />
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
        {portfolio.length === 0 ? (
          <p className="history-placeholder">No hay movimientos recientes.</p>
        ) : (
          <div>
            {portfolio.map((stock, index) => (
              <p className="history-placeholder" key={index}>
                Fecha de compra: "{stock.purchased_at.split("T")[0]}" nombre: "{stocks[index]}" {" "}
                precio al que se compro: "{stock.purchase_price}"  cantidad: "{stock.quantity}"
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
