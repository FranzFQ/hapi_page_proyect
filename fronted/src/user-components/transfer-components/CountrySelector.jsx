import CountryCard from "./CountryCard.jsx";
import "../../style/transfer/CountryBox.css"

const CountrySelector = ({ countries, operation }) => {
  return (
    <div className="country-selector-container">
        <h3 className="country-selector-title">ELIGE EL PAÍS DE TU CUENTA BANCARIA</h3>
        <div className="country-content">
            {countries.map((country) => (
            <CountryCard
            key={country.code}
            country={country}
            operation={operation}
            />
        ))}
        </div>
    </div>
  );
};

export default CountrySelector;
