import Header from "../user-components/Header";
import Sidebar from "../user-components/Sidebar";
import PortfolioSection from "../user-components/PortfolioSection";
import { useEffect, useState } from "react";
import "../style/UserGlobal.css";
import "../style/UserHome.css";
import UserExist from "../hooks/userExist";
import { useNavigate } from "react-router-dom";
import { getClientById } from "../service/User.api";

const UserPortfolio = () => {
  const navigate = useNavigate();
  const [balance, setBalence] = useState(0);

  useEffect(() => {
    const permition = UserExist();
    if (permition) {
      navigate("/");
      return;
    }

    const clientId = localStorage.getItem("clientId");
    getClientById(clientId).then((response) => {
      const clientData = response.data
      setBalence(clientData.balance_available)
    });
  }, []);

  return (
    <div className="dashboard-container fade-in">
      <Header />
      <div className="main-content">
        <Sidebar />
        <main className="center-content">
          <PortfolioSection balance={balance} />
        </main>
      </div>
    </div>
  );
};

export default UserPortfolio;
