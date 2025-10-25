import { useNavigate } from "react-router-dom";
import "../../style/transfer/OptionTransfer.css";

const TransferOption = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="option-box">
      <h3 className="option-title">TRANSFERIR DINERO</h3>
      <button
        className="option-btn"
        onClick={() => handleNavigation("/banking/transfer")}
      >
        TRANSFERIR A APP
      </button>

      <button
        className="option-btn"
        onClick={() => handleNavigation("/banking/deposit")}
      >
        TRANSFERIR A TU BANCO
      </button>

      <button
        className="option-btn"
        onClick={() => handleNavigation("/banking/withdraw")}
      >
        TRANSFERIR CRIPTOMONEDAS
      </button>

      <button
        className="option-btn"
        onClick={() => handleNavigation("/banking/transfer?type=portfolio")}
      >
        TRANSFERIR PORTAFOLIO
      </button>
    </div>
  );
};

export default TransferOption;
