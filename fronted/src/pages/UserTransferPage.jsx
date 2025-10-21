import Header from '../user-components/Header';
import Sidebar from '../user-components/Sidebar';
import TransferOptionBox from '../user-components/transfer/TransferOptionBox';
import RecentTransferBox from '../user-components/transfer/RecentTransferBox';
import "../style/UserTransfer.css";


const UserTransferPage = () => {
  return (
    <div className="dashboard-container fade-in">
      <Header />
      <div className="main-content">
        <Sidebar />
        <main className="center-content">
            <TransferOptionBox />
            <RecentTransferBox />
        </main>
      </div>
    </div>
  );
}

export default UserTransferPage;