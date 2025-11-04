import { useParams } from "react-router-dom";
import BankingLayout from "../../user-components/layouts/BankingLayout.jsx"
import RecentTransfer from "../../user-components/transfer-components/RecentTransfer.jsx"
import WithdrawalAmount from "../../user-components/transfer-components/WithdrawalAmount.jsx";
import DepositAmount from "../../user-components/transfer-components/DepositAmount.jsx";

const AmountPage = () => {
    const { operation } = useParams();
    const renderAmountComponent = () => {
        switch (operation) {
            case "deposit":
                return <DepositAmount />;
            case "withdraw":
                return <WithdrawalAmount />;
            default:
                return <div>Operación no válida</div>;
        }
    };
    
    return (
    <BankingLayout>
        {renderAmountComponent()}
        <RecentTransfer />   
    </BankingLayout>
    );
}

export default AmountPage;