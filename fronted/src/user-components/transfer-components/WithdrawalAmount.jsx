import { useState, useMemo } from "react";
import "../../style/transfer/Amount.css";

const WithdrawalAmount = () => {
  const [amount, setAmount] = useState("10.00");
  const parsedAmount = parseFloat(amount) || 0;
  const fee = 4.99;
  const total = useMemo(() => Math.max(parsedAmount - fee, 0), [parsedAmount]);
  const available = 0.0;

  const handleContinue = () => {
    console.log("Monto ingresado:", parsedAmount.toFixed(2));
    console.log("Costo de retiro:", fee.toFixed(2));
    console.log("Total a recibir:", total.toFixed(2));
    console.log("Disponible para retirar:", available.toFixed(2));
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
          <span>Costo de retiro</span>
          <span>USD$ {fee.toFixed(2)}</span>
        </div>

        <div className="info-row total">
          <span>Total a recibir</span>
          <span>USD$ {total.toFixed(2)}</span>
        </div>

        <div className="info-row available">
          <span>Disponible para retirar</span>
          <span>${available.toFixed(2)}</span>
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

      <button className="do-btn" onClick={handleContinue}>
        Continuar
      </button>
    </div>
  );
};

export default WithdrawalAmount;
