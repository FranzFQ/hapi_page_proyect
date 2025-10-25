import "../../style/transfer/RecentTransfer.css"

const RecentTransfer = ({ title = "TRANSFERENCIAS RECIENTES", transfers = [] }) => {
  return (
    <div className="recent-box">
      <h2 className="recent-title">{title}</h2>
      {transfers.length === 0 ? (
        <p className="recent-empty">No hay transferencias</p>
      ) : (
        <ul className="recent-list">
          {transfers.map((transfer, index) => (
            <li key={index} className="recent-item">
              {transfer}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentTransfer;
