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
        onClick={() => handleNavigation("/banking/deposit")}
      >
          DEPOSITAR A LA CUENTA  
      </button>

      <button
        className="option-btn"
        onClick={() => handleNavigation("/banking/withdraw")}
      >
          RETIRAR DE LA CUENTA  
      </button>
    </div>
  );
};

export default TransferOption;
