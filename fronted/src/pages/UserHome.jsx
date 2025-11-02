import React from "react";
import Header from "../user-components/Header";
import Sidebar from "../user-components/Sidebar";
import InvestmentSection from "../user-components/InvestmentSection";
import FavoritesSection from "../user-components/FavoritesSection";
import CategoriesSection from "../user-components/CategoriesSection";
import { useEffect, useState } from "react";
import {
  getClientByUserId,
  getReferralByUserId,
  getUserById,
  updateClient,
  updateReferral,
  updateUser,
} from "../service/User.api";
import { useNavigate } from "react-router-dom";
import "../style/UserGlobal.css";
import "../style/UserHome.css";
import UserExist from "../hooks/userExist";

const UserHome = () => {
  const [balance, setBalence] = useState(0);
  const [addedBalance, setAddedBalance] = useState(0);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const permition = UserExist();
    if (permition) {
      navigate("/");
      return;
    }
    const userId = localStorage.getItem("userId");
    localStorage.setItem("loginTime", Date.now().toString());

    getUserById(userId)
      .then((response) => {
        const userData = response.data;
        const userName = userData.first_name;
        setName(userName);
        const loginData = {
          last_login: new Date().toISOString(),
        };
        updateUser(userId, loginData);
        if (userData && userData.is_verified) {
          getClientByUserId(userId).then((response) => {
            const clientData = response.data[0];
            const currentBalance = parseFloat(clientData.balance_available);
            localStorage.setItem("clientId", clientData.id);
            setBalence(currentBalance);
            getReferralByUserId(userId)
              .then((response) => {
                const userReferral = response.data[0];
                if (userReferral.is_active) {
                  const bonus = parseFloat(userReferral.bonus_amount);
                  setAddedBalance(bonus);
                  const updateClientData = {
                    balance_available: currentBalance + bonus,
                  };

                  const referralData = {
                    is_active: false,
                  };
                  updateReferral(userReferral.id, referralData);
                  updateClient(clientData.id, updateClientData);

                  alert(
                    "Felicidades alguien ha usado tu codigo haz ganado 5 dolares"
                  );
                }
              })
              .catch(() => {
                return;
              });
          });
        } else {
          alert("Tu cuenta no esta verificada todavia");
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const userBalance = balance + addedBalance;

  return (
    <div className="dashboard-container fade-in">
      <Header />
      <div className="main-content">
        <Sidebar />
        <main className="center-content">
          <div className="top-section">
            <InvestmentSection balance={userBalance} userName={name} />
            <FavoritesSection />
          </div>
          <CategoriesSection />
        </main>
      </div>
    </div>
  );
};

export default UserHome;
