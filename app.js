const searchBar = document.querySelector('#searchBar');
const searchButton = document.querySelector('#searchButton');

async function weatherRequest(cityName) {
  const apiRequest = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=da8bba5b27d6405f84b193317231410&q=${cityName}`,
    {
      mode: 'cors',
    }
  );
  currentWeather = await apiRequest.json();
  console.log(currentWeather.current.temp_c);
  return currentWeather;
}

searchButton.addEventListener('click', () => {
  getTemperature(searchBar.value);
});

async function getTemperature(cityName) {
  const currentWeather = await weatherRequest(cityName);
  showCurrentTemperature(currentWeather);
}
async function showCurrentTemperature(currentWeather) {
  console.log(
    `The current temperature in ${currentWeather.location.name} is ${currentWeather.current.temp_c} Degrees Celcius`
  );
}
