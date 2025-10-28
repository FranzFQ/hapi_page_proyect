import { useState } from "react";
import "../../style/transfer/Amount.css";

const DepositAmount = () => {
  const [amount, setAmount] = useState("10.00");

  return (
    <div className="withdrawal-box">
      <h3 className="withdrawal-title">Monto de deposito</h3>
      <p className="withdrawal-subtitle">Airtm USD $</p>

      <div className="withdrawal-amount">
        <span className="symbol">$</span>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="amount-input"
        />
      </div>

      <div className="withdrawal-info">
        <div className="info-row">
          <span>Costo de retiro</span>
          <span>USD$ 4.99</span>
        </div>

        <div className="info-row total">
          <span>Total a recibir</span>
          <span>USD$ 5.01</span>
        </div>

        <div className="info-row available">
          <span>Disponible para retirar</span>
          <span>$0.00</span>
        </div>
      </div>

      <div className="withdrawal-note">
        <p className="note-title">¡Lee esto antes!</p>
        <ul>
          <li>Solo se permiten retiros a cuentas del mismo titular de la cuenta en Hapi.</li>
          <li>El tipo de cambio (si aplica) es referencial y puede variar de acuerdo al mercado.</li>
          <li>Asegúrate que la información de la cuenta de retiro sea correcta.</li>
        </ul>
      </div>

      <button
        className="withdrawal-btn"
        onClick={() => console.log("Monto ingresado:", amount)}
      >
        Continuar
      </button>
    </div>
  );
};

export default DepositAmount;
