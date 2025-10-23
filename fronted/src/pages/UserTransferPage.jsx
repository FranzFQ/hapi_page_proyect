import Header from '../user-components/Header';
import Sidebar from '../user-components/Sidebar';
import TransferOptionBox from '../user-components/transfer/TransferOptionBox';
import RecentTransferBox from '../user-components/transfer/RecentTransferBox';
import "../style/UserTransfer.css"


const UserTransferPage = () => {
  const example = [
    "GTM → Banco → $50",
    "CHN → Portafolio → $100",
    "USA → App → $20",
  ];

  return (
    <div className="dashboard-container fade-in">
      <Header />
      <div className="main-content">
        <Sidebar />
        <main className="center-content">
            <TransferOptionBox />
            <RecentTransferBox transfers={example}/>
        </main>
      </div>
    </div>
  );
}

export default UserTransferPage;