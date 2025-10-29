import { useNavigate } from "react-router-dom";
import 'flag-icons/css/flag-icons.min.css';


const CountryCard = ({ country, operation }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/banking/${operation}/amount?country=${country.code}`);
  };

  return (
    <div className="country-card" onClick={handleClick}>
        <div className="country-flag">
            <span className={`fi fi-${country.code.toLowerCase()} flag`}></span>
            <p className="name">{country.name}</p>
        </div>
        <div className="country-arrow">
            &gt;
        </div>
    </div>
  );
};

export default CountryCard;
