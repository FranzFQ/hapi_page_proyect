import { useState, useMemo, useEffect } from "react";
import "../../style/transfer/Amount.css";
import UserExist from "../../hooks/userExist";
import { getClientById, getClientByUserId } from "../../service/User.api";

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
  const [amount, setAmount] = useState("0.00");
  const [bankAccount, setBankAccount] = useState("");
  const [fee, setFee] = useState(0.15);
  const [balance, setBalence] = useState(0);
  const parsedAmount = parseFloat(amount) || 0;
  const total = useMemo(() => Math.max(parsedAmount * fee, 0), [parsedAmount]);
  const available = 0.0;

  useEffect(() => {
    const permition = UserExist();
    if (permition) {
      navigate("/");
      return;
    }
    const clientId = localStorage.getItem("clientId")
    getClientById(clientId).then((response) => {
      const clientData = response.data
      setBalence(clientData.balance_available)
    })
    const contry = localStorage.getItem("country");
    if (bankAccountDigits[contry]) {
      const bankCountry = bankAccountDigits[contry];
      setCountryName(bankCountry.name);
      setMax(bankCountry.max);
    }
  }, []);
  const handleWithdraw = () => {
    // aqui va ir la logi
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
