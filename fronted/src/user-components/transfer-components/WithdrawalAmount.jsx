import { useState, useMemo, useEffect } from "react";
import "../../style/transfer/Amount.css";
import UserExist from "../../hooks/userExist";
import {
  createTransfer,
  getClientById,
  updateClient,
} from "../../service/User.api";
import { useNavigate } from "react-router-dom";

const bankAccountDigits = {
  GT: { min: 10, max: 15, name: "Guatemala" },
  US: { min: 10, max: 12, name: "United States" },
  MX: { min: 18, max: 18, name: "Mexico" },
  CA: { min: 7, max: 12, name: "Canada" },
  BR: { min: 10, max: 13, name: "Brazil" },
  AR: { min: 22, max: 22, name: "Argentina" },
  CO: { min: 10, max: 11, name: "Colombia" },
  CL: { min: 8, max: 12, name: "Chile" },
  PE: { min: 13, max: 20, name: "Peru" },
  VE: { min: 20, max: 20, name: "Venezuela" },
  UY: { min: 13, max: 15, name: "Uruguay" },
  PA: { min: 10, max: 15, name: "Panama" },
  CR: { min: 10, max: 17, name: "Costa Rica" },
  HN: { min: 10, max: 15, name: "Honduras" },
  NI: { min: 10, max: 15, name: "Nicaragua" },
};

const WithdrawalAmount = () => {
  const [countryName, setCountryName] = useState("");
  const [max, setMax] = useState(10);
  const [amount, setAmount] = useState(0.0);
  const [bankAccount, setBankAccount] = useState("");
  const [balance, setBalence] = useState(0);
  const navigate = useNavigate()
  const fee = 0.1;
  const parsedAmount = parseFloat(amount).toFixed(2) || 0;
  const total = useMemo(
    () => Math.max(parsedAmount - parsedAmount * fee, 0),
    [parsedAmount]
  );

  useEffect(() => {
    const permition = UserExist();
    if (permition) {
      navigate("/");
      return;
    }
    const clientId = localStorage.getItem("clientId");
    getClientById(clientId).then((response) => {
      const clientData = response.data;
      const balanceClient = parseFloat(clientData.balance_available);
      setBalence(balanceClient);
    });
    const contry = localStorage.getItem("country");
    if (bankAccountDigits[contry]) {
      const bankCountry = bankAccountDigits[contry];
      setCountryName(bankCountry.name);
      setMax(bankCountry.max);
    }
  }, []);
  const handleWithdraw = () => {
    // aqui va ir la logica del retiro
    if (bankAccount.length !== max) {
      alert("La cuenta no es valida");
      return;
    }
    if (balance < parsedAmount) {
      alert("La catidad el mayor a la que tiene en su cuenta");
      return;
    }
    const clientId = localStorage.getItem("clientId");
    const now = new Date().toISOString();
    const discount = parsedAmount * fee;
    const transferData = {
      created_at: now,
      client: clientId,
      amount: parsedAmount,
      transfer_type: "Retiro",
      discountdiscount: Math.round(discount),
    };
    const total = (balance - parsedAmount).toFixed(2);
    const updateClientData = {
      balance_available: total,
    };

    updateClient(clientId, updateClientData);
    createTransfer(transferData)
    alert("Se ha realizado el retiro");
    navigate("/home")
  };

  return (
    <div className="amount-box">
      <h3 className="title">Monto de retiro</h3>
      <p className="subtitle">Airtm USD $</p>

      <div className="amount">
        <span className="symbol">$</span>
        <input
          type="number"
          value={amount}
          step="0.01"
          onChange={(e) => setAmount(e.target.value)}
          className="amount-input"
        />
      </div>

      <div className="info-box">
        <div className="info-row">
          <span>Cobro por retiro</span>
          <span>{fee * 100}%</span>
        </div>

        <div className="info-row total">
          <span>Total a recibir</span>
          <span>USD$ {total.toFixed(2)}</span>
        </div>

        <div className="info-row available">
          <span>Disponible para retirar</span>
          <span>${balance}</span>
        </div>
      </div>

      <div className="note">
        <p className="note-title">¡Lee esto antes!</p>
        <ul>
          <li>
            Solo se permiten retiros a cuentas del mismo titular de la cuenta en
            Hapi.
          </li>
          <li>
            El tipo de cambio (si aplica) es referencial y puede variar de
            acuerdo al mercado.
          </li>
          <li>
            Asegúrate de que la información de la cuenta de retiro sea correcta.
          </li>
        </ul>
      </div>
      <div className="note">
        <p className="recent-title">cuenta de banco de: {countryName}</p>
        <input
          className="form-input"
          type="text"
          value={bankAccount}
          maxLength={max}
          placeholder="ingrese su cuenta banco aqui"
          onChange={(e) => setBankAccount(e.target.value)}
        />
      </div>
      <button className="do-btn" onClick={handleWithdraw}>
        Retirar
      </button>
    </div>
  );
};

export default WithdrawalAmount;
