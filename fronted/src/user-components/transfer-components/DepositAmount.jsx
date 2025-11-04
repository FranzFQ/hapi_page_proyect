import { useState, useMemo, useEffect } from "react";
import "../../style/transfer/Amount.css";
import { useNavigate, useParams } from "react-router-dom";
import UserExist from "../../hooks/userExist";
import {
  createTransfer,
  getClientById,
  updateClient,
} from "../../service/User.api";

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

const DepositAmount = () => {
  const [countryName, setCountryName] = useState("");
  const [max, setMax] = useState(10);
  const [amount, setAmount] = useState("0.00");
  const [bankAccount, setBankAccount] = useState("");
  const navigate = useNavigate();
  const fee = 0.1;
  const parsedAmount = parseFloat(amount) || 0;
  const total = useMemo(
    () => parsedAmount - parsedAmount * fee,
    [parsedAmount]
  );

  useEffect(() => {
    const permition = UserExist();
    if (permition) {
      navigate("/");
      return;
    }
    const contry = localStorage.getItem("country");
    if (bankAccountDigits[contry]) {
      const bankCountry = bankAccountDigits[contry];
      setCountryName(bankCountry.name);
      setMax(bankCountry.max);
    }
  }, []);

  const handleTransfer = () => {
    // aqui va la logica del deposito
    if (bankAccount.length !== max) {
      alert("La cuenta no es valida");
      return;
    }
    const clientId = localStorage.getItem("clientId");
    const now = new Date().toISOString();
    const discount = parsedAmount * fee;
    const new_amount = parsedAmount - parsedAmount * fee;
    const transferData = {
      created_at: now,
      client: clientId,
      amount: new_amount,
      transfer_type: "Deposito",
      discountdiscount: Math.round(discount),
    };
    getClientById(clientId).then((response) => {
      const clientData = response.data;
      if (clientData) {
        const balanceClient = parseFloat(clientData.balance_available);
        const total = (balanceClient + new_amount).toFixed(2);
        const updateClientData = {
          balance_available: total,
        };
        updateClient(clientId, updateClientData);
        createTransfer(transferData);
      }
    });

    alert("Transaccion exitosa");
    navigate("/home");
  };

  return (
    <div className="amount-box">
      <h3 className="title">Monto de depósito</h3>
      <p className="subtitle">Airtm USD $</p>
      <div className="amount">
        <span className="symbol">$</span>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="amount-input"
        />
      </div>

      <div className="info-box">
        <div className="info-row">
          <span>Cobro por deposito</span>
          <span>{fee * 100}%</span>
        </div>

        <div className="info-row total">
          <span>Deposito total</span>
          <span>USD$ {total.toFixed(2)}</span>
        </div>
      </div>

      <div className="note">
        <p className="note-title">Detalles del Depósito</p>
        <ul>
          <li>
            Los depósitos deben provenir de una cuenta bancaria a nombre del
            mismo titular de la cuenta en Hapi. Fondos enviados de terceros
            pueden perderse por completo.
          </li>
          <li>
            Depósitos antes de las 12 pm CT en días hábiles se validan y
            reflejan en un máximo de 3 horas. Después de ese horario, se
            procesan al siguiente día hábil.
          </li>
          <li>
            No se procesarán depósitos en efectivo, ni de usuarios menores de 18
            años.
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
      <button className="do-btn" onClick={handleTransfer}>
        Depositar
      </button>
    </div>
  );
};

export default DepositAmount;
