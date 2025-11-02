import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/ReferralSelection.css";
import UserExist from "../hooks/userExist";
import {
  createReferral,
  getReferralByUserId,
  getUserByReferralCode,
} from "../service/User.api";

const ReferralSelection = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  useEffect(() => {
    const permition = UserExist();
    if (permition) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date().toISOString();
    const userId = localStorage.getItem("userId");
    getUserByReferralCode(code)
      .then((response) => {
        const userData = response.data[0];
        if (userData.id == userId) {
          alert("No puedes poner tu propio codigo");
          return;
        }

        getReferralByUserId(userData.id).then((response) => {
          const referral = response.data[0];
          if (referral && referral.user_send == userId) {
            alert("no se puede usar mas de una vez el codigo");
          } else {
            const referral_data = {
              code_used: code,
              bonus_amount: 5,
              created_at: now,
              processed_at: now,
              is_active: true,
              user_send: userId,
              user_recibe: userData.id,
            };

            createReferral(referral_data).then((response) => {
              alert("Codigo aceptado");
            });
          }
        });
      })
      .catch(() => {
        alert(`El codigo: ${code} no es valido`);
      });
  };

  return (
    <div className="language-selection-container">
      <div className="language-selection-header">
        <button
          onClick={() => navigate("/settings")}
          className="back-button"
          title="Volver a ajustes"
        >
          <i className="fi fi-rr-arrow-left"></i>
        </button>
        <h2>Ingresa el codigo de referencia</h2>
      </div>
      <p className="section-subtitle">
        Si no cuentas con un codio puede darle a cancelar
      </p>
      <form className="" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-input"
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
          }}
          placeholder="Pon el codigo aqui"
        />
        <div className="profile-form-actions">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => {
              navigate("/settings");
            }}
          >
            Cancelar
          </button>
          <button className="btn btn-primary" type="submit">
            Confirmar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReferralSelection;
