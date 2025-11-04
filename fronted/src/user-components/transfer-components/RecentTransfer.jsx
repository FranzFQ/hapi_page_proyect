import { useEffect, useState } from "react";
import "../../style/transfer/RecentTransfer.css"
import { getTransferByClientId } from "../../service/User.api";

const RecentTransfer = () => {
  const [transfers, setTransfers] = useState([])

  useEffect(() => {
    getTransfers()
  }, [])

  const getTransfers = (() => {
    const clientId = localStorage.getItem("clientId")
    getTransferByClientId(clientId).then((response) => {
      const transfersData = response.data
      if (transfersData){
        setTransfers(transfersData)
      }
    })
  })

  return (
    <div className="recent-box">
      <h2 className="recent-title">TRANSFERENCIAS RECIENTES</h2>
      {transfers.length === 0 ? (
        <p className="recent-empty">No hay transferencias</p>
      ) : (
        <ul className="recent-list">
          {transfers.map((transfer, index) => (
            <li key={index} className="recent-item">
              Fecha: {transfer.created_at.split('T')[0]} Cantidad: {transfer.amount}$ Tipo: {transfer.transfer_type}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentTransfer;
