import Header from "../user-components/Header";
import Sidebar from "../user-components/Sidebar";
import PortfolioSection from "../user-components/PortfolioSection";
import { useEffect } from "react";
import "../style/UserGlobal.css";
import "../style/UserHome.css";
import UserExist from "../hooks/userExist";
import { useNavigate } from "react-router-dom";

const UserPortfolio = () => {
  const navigate = useNavigate()
  const userBalance = 1234.56;

  useEffect(() => {
    const permition = UserExist();
    if (permition) {
      navigate("/");
      return;
    }
  }, []);

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
