import BankingLayout from "../../user-components/layouts/BankingLayout.jsx"
import RecentTransfer from "../../user-components/transfer-components/RecentTransfer.jsx"
import TransferOption from "../../user-components/transfer-components/TransferOption.jsx"

const BankingPage = () => {
  return (
    <BankingLayout>
      <TransferOption />
      <RecentTransfer />   
    </BankingLayout>
  );
}

export default BankingPage;