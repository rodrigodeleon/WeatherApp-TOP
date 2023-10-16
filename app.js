const selectedCity = document.querySelector('#citySelector');
const searchButton = document.querySelector('#searchButton');
const temperatureDisplay = document.querySelector('#temperatureDisplay');

async function weatherRequest(cityName) {
  try {
    const apiRequest = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=da8bba5b27d6405f84b193317231410&q=${cityName}`,
      {
        mode: 'cors',
      }
    );
    const currentWeather = await apiRequest.json();
    return currentWeather;
  } catch (error) {
    console.log(error);
  }
}

searchButton.addEventListener('click', () => {
  showCurrentWeather(selectedCity.value);
});

async function showCurrentWeather(cityName) {
  try {
    const currentWeather = await weatherRequest(cityName);
    printTemperature(currentWeather);
  } catch (error) {
    console.log(error);
  }
}
async function printTemperature(currentWeather) {
  temperatureDisplay.innerHTML = '';
  let temperature = currentWeather.current.temp_c;
  temperatureDisplay.append(
    `The current temperature in ${currentWeather.location.name} is ${temperature} Degrees Celcius`
  );

  temperature > 20 ? (temperature = 'warm') : (temperature = 'cold');
  let imgLoader = document.createElement('img');
  let giffUrl = await getGiffUrl(temperature);
  imgLoader.src = giffUrl;
  temperatureDisplay.append(imgLoader);
}
async function getGiffUrl(searchWord) {
  try {
    const GiffResponse = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=YFXsGq81CZMy9iZvkrWUurW2bBxkFd0w&s=${searchWord}`,
      { mode: 'cors' }
    );
    const giffPromise = await GiffResponse.json();
    if (giffPromise.data.length === 0 && giffPromise.meta.status === 200)
      console.log(`Load Failed: Couldnt find Giff`);
    else {
      let a = await giffPromise.data.images.original.url;
      return a;
    }
  } catch (error) {
    console.log('something failed: ' + error);
  }
}
