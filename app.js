const selectedCity = document.querySelector('#citySelector');
const searchButton = document.querySelector('#searchButton');
const loader = document.querySelector('#loader');
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
    temperatureDisplay.innerHTML = '';
    loader.style.display = 'block';
    const currentWeather = await weatherRequest(cityName);
    printTemperature(currentWeather);
  } catch (error) {
    console.log(error);
  }
}
async function printTemperature(currentWeather) {
  let temperature = currentWeather.current.temp_c;
  let giffSearch = '';
  temperature > 20 ? (giffSearch = 'warm') : (giffSearch = 'cold');
  let imgLoader = document.createElement('img');
  let giffUrl = await getGiffUrl(giffSearch);
  imgLoader.src = giffUrl;
  imgLoader.addEventListener('load', function () {
      loader.style.display = 'none';
      temperatureDisplay.append(
        `The Current temperature in ${currentWeather.location.name} is ${temperature} Degrees Celcius`
      );
      temperatureDisplay.append(imgLoader);
  });
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
