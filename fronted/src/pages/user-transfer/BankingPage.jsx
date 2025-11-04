import { use, useEffect, useState } from "react";
import BankingLayout from "../../user-components/layouts/BankingLayout.jsx";
import RecentTransfer from "../../user-components/transfer-components/RecentTransfer.jsx";
import TransferOption from "../../user-components/transfer-components/TransferOption.jsx";
import { useNavigate } from "react-router-dom";
import UserExist from "../../hooks/userExist.js";
import { getTransferByClientId } from "../../service/User.api.js";

const BankingPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const permition = UserExist();
    if (permition) {
      navigate("/");
      return;
    }
  }, []);

  return (
    <BankingLayout>
      <TransferOption />
      <RecentTransfer/>
    </BankingLayout>
  );
};

export default BankingPage;
