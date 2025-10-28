import { useState, useMemo } from "react";
import "../../style/transfer/Amount.css";

const DepositAmount = () => {
  const [amount, setAmount] = useState("250.00");
  const parsedAmount = parseFloat(amount) || 0;
  const fee = 2.99;
  const total = useMemo(() => parsedAmount + fee, [parsedAmount]);
  
  const handleTransfer = () => {
    console.log("Monto ingresado:", parsedAmount.toFixed(2));
    console.log("Costo de envío:", fee.toFixed(2));
    console.log("Total a pagar:", total.toFixed(2));
  };

  return (
    <div className="amount-box">
        <h3 className="title">Monto de depósito</h3>
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
                <span>Costo de envío</span>
                <span>USD$ {fee.toFixed(2)}</span>
            </div>

            <div className="info-row total">
                <span>Total a pagar</span>
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

        <button className="do-btn" onClick={handleTransfer}>
            Transferir
        </button>
    </div>
  );
};

export default DepositAmount;
