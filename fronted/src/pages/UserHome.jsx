import React from "react";
import Header from "../user-components/Header";
import Sidebar from "../user-components/Sidebar";
import InvestmentSection from "../user-components/InvestmentSection";
import FavoritesSection from "../user-components/FavoritesSection";
import CategoriesSection from "../user-components/CategoriesSection";
import { useEffect, useState } from "react";
import {
  createClientProfile,
  getClientByUserId,
  getReferralByUserId,
  getUserById,
  updateReferral,
} from "../service/User.api";
import { useNavigate } from "react-router-dom";
import "../style/UserGlobal.css";
import "../style/UserHome.css";
import UserExist from "../hooks/userExist";

const UserHome = () => {
  const [balance, setBalence] = useState(0);
  const [addedBalance, setAddedBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const permition = UserExist();
    if (permition) {
      navigate("/");
      return;
    }

    async function fetchUsers() {
      const userId = localStorage.getItem("userId");
      localStorage.setItem("loginTime", Date.now().toString());

      getUserById(userId)
        .then((response) => {
          const userData = response.data;
          if (userData && userData.is_verified) {
            getClientByUserId(userId).then((response) => {
              const clientData = response.data;

              getReferralByUserId(userId).then((response) => {
                const userReferral = response.data[0]
                if (userReferral.is_active){
                  setAddedBalance(userBalance.bonus_amount)
                  const data = {
                    is_active: false,
                  }
                  updateReferral(userReferral.id, data)
                  alert("Felicidades alguien ha usado tu codigo")
                }
              }).catch(() => {
                return
              })

              if (clientData) {
                setBalence(clientData.balance_available);
              } else {
                const profileData = {
                  balance_available: 0.0,
                  client_profilecol: 0.0,
                  user: userId,
                };

                createClientProfile(profileData).then((response) => {
                  console.log("Client profile created:", response.data);
                  setBalence(0.0);
                });
              }
            });
          } else {
            alert("Tu cuenta no esta verificada todavia");
            navigate("/login");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
    fetchUsers();
  }, []);

  const userBalance = balance + addedBalance;

  return (
    <div className="dashboard-container fade-in">
      <Header />
      <div className="main-content">
        <Sidebar />
        <main className="center-content">
          <div className="top-section">
            <InvestmentSection balance={userBalance} />
            <FavoritesSection />
          </div>
          <CategoriesSection />
        </main>
      </div>
    </div>
  );
};

export default UserHome;
