import styles from "./CountriesList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on the city on map" />
    );
  const countries = Array.from(
    cities
      .reduce((uniqueCountriesMap, city) => {
        if (!uniqueCountriesMap.has(city.country)) {
          uniqueCountriesMap.set(city.country, {
            country: city.country,
            emoji: city.emoji,
          });
        }
        return uniqueCountriesMap;
      }, new Map())
      .values()
  );

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
export default CityList;
// const countries = cities.reduce((arr, city) => {
//   if (!arr.map((el) => el.county).includes(city.country))
//     return [...arr, { country: city.country, emoji: city.emoji }];
//   else return arr;
// }, []);
