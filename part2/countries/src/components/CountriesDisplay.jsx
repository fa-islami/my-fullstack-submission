const CountriesDisplay = ({ countries, onShow }) => {
  if (!countries) return null;
  if (countries.length > 10) {
    // console.log(countries);
    return <p>Too many matches, specify another filter</p>;
  }
  if (countries.length === 1) {
    const country = countries[0];
    const languages = Object.values(country.languages);
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital : {country.capital[0]}</p>
        <p>Area : {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {languages.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
    );
  }

  return (
    <ul>
      {countries.map((c) => (
        <li>
          {c.name.common}{" "}
          <button onClick={() => onShow(c.name.common)}>Show</button>
        </li>
      ))}
    </ul>
  );
};

export default CountriesDisplay;
