import BankingLayout from "../../user-components/layouts/BankingLayout.jsx"
import RecentTransfer from "../../user-components/transfer-components/RecentTransfer.jsx"
import CountrySelector from "../../user-components/transfer-components/CountrySelector.jsx";

const countries = [
  { code: "GT", name: "Guatemala" },
  { code: "US", name: "United States" },
  { code: "MX", name: "Mexico" },
  { code: "CA", name: "Canada" },
  { code: "BR", name: "Brazil" },
  { code: "AR", name: "Argentina" },
  { code: "CO", name: "Colombia" },
  { code: "CL", name: "Chile" },
  { code: "PE", name: "Peru" },
  { code: "VE", name: "Venezuela" },
  { code: "UY", name: "Uruguay" },
  { code: "PA", name: "Panama" },
  { code: "CR", name: "Costa Rica" },
  { code: "HN", name: "Honduras" },
  { code: "NI", name: "Nicaragua" }
];


const WithdrawPage = () => {
  return (
    <BankingLayout>
      <CountrySelector countries={countries} operation="deposit" />
      <RecentTransfer />   
    </BankingLayout>
  );
}

export default WithdrawPage;