import { useNavigate } from "react-router-dom";

const CountryCard = ({ country, operation }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/banking/${operation}/amount?country=${country.code}`);
  };

  return (
    <div className="country-card" onClick={handleClick}>
      <div className="country-flag">
        <img
          src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
          alt={`${country.name} flag`}
          className="flag-img"
        />
        <p className="name">{country.name}</p>
      </div>
      <div className="country-arrow">&gt;</div>
    </div>
  );
};

export default CountryCard;
