import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [value, setValue] = useState("");
  const [expandedCountry, setExpandedCountry] = useState(null);

  const filtered = countries?.filter((country) => {
    return country?.name?.common.toLowerCase().includes(value.toLowerCase());
  });

  useEffect(() => {
    if (value !== "") {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then((response) => {
          setCountries(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [value]);

  const onSearch = (event) => {
    setValue(event.target.value);
  };

  const handleToggle = (cca3) => {
    setExpandedCountry(expandedCountry === cca3 ? null : cca3);
  };

  // const getWeather = (lat, long) => {
  //   const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  //   const url = `https://api.tomorrow.io/v4/weather/forecast?location=4${lat},${long}6&apikey=${API_KEY}`;
  //   console.log(url);

  //   axios
  //     .get(url)
  //     .then((response) => {
  //       console.log(response.data.timelines.daily[0].values.temperatureAvg);
  //     });
  // }

  return (
    <div>
      <form>
        find countries <input onChange={onSearch} value={value} />
      </form>
      <div>
        {filtered.length > 10 ? (
          filtered.length === 0 || value === "" ? null : (
            <p>Too many matches, specify another filter</p>
          )
        ) : (
          filtered.map((country) => (
            <div key={country.cca3}>
              {expandedCountry === country.cca3 || filtered.length === 1 ? (
                <>
                  <h1>{country.name.common}</h1>
                  <p>capital {country.capital[0]}</p>
                  <p>area {country.area}</p>
                  <h2>languages:</h2>
                  <ul>
                    {Object.keys(country.languages).map((key, index) => (
                      <li key={index}>{country.languages[key]}</li>
                    ))}
                  </ul>
                  <img src={country.flags.png} alt={country.flags.alt} />
                  {/* <h2>Weather on {country.capital[0]}</h2>
                  <p>temperature {getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])}</p>
                  <button onClick={() => getWeather(country.latlng[0], country.latlng[1])}>get weather</button> */}
                  {filtered.length > 1 && (
                    <button onClick={() => handleToggle(country.cca3)}>
                      {expandedCountry === country.cca3 ? "hide" : "show"}
                    </button>
                  )}
                </>
              ) : (
                <p>
                  {country.name.common}{" "}
                  <button onClick={() => handleToggle(country.cca3)}>
                    show
                  </button>
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
