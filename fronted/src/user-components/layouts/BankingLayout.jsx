import Header from "../Header"
import Sidebar from "../Sidebar"
import "../../style/transfer/UserMainTransfer.css"

const BankingLayout = ({ children }) => {
    return (
        <div className="dashboard-container fade-in">
            <Header />
            <div className="main-content">
                <Sidebar />
                <main className="center-content-banking">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default BankingLayout;