import { useEffect, useState } from "react";
import CountriesDisplay from "./components/CountriesDisplay";
import countryService from "./services/countryService";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countryService.getAll().then((res) => {
      setCountries(res.data);
    });
  }, []);

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
    setSelectedCountry(null);
  };

  const filteredCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(filterValue.toLowerCase()),
  );

  const countriesToShow = !filterValue ? null : filteredCountries;

  const handleShow = (countryName) => {
    const countryToShow = [
      countries.find((c) => c.name.common === countryName),
    ];

    // console.log(countryToShow);
    setSelectedCountry(countryToShow);
  };

  return (
    <div>
      find countries <input value={filterValue} onChange={handleFilterChange} />
      <CountriesDisplay
        countries={selectedCountry ? selectedCountry : countriesToShow}
        onShow={handleShow}
      />
    </div>
  );
};

export default App;
