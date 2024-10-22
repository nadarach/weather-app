const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('.search-input');
const resultElement = document.querySelector('.result-section');
const errorMessage = document.querySelector("#error-message");


errorMessage.textContent = '';


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault(); //to prevent the page from automatically refreshing upon form submission
  
  resultElement.innerHTML = '<p class="loading">Loading...</p>';
  errorMessage.innerHTML = '';
  
  const location = searchInput.value;

  fetch(`/weather?address=${location}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        resultElement.innerHTML = '';
        errorMessage.textContent = `Some error occurred: ${data.error}`;

      } else {
        let { weatherDescription, isDay } = data.forecast;
        weatherDescription = weatherDescription.toLowerCase();

        let weatherIcon = ''
        if (weatherDescription.includes('rain')) {
          if (weatherDescription.includes('patchy') || weatherDescription.includes('light')) {
            weatherIcon = 'light-rain';
          } else {
            weatherIcon = "moderate-rain";
          }
        } else if (weatherDescription.includes('sunny') || weatherDescription.includes('clear')) {
          if (isDay === 'yes') {
            weatherIcon = "clear-day";
          } else {
            weatherIcon = 'clear-night';
          }
        } else if (weatherDescription.includes('haze')) {
          if (isDay === "yes") {
            weatherIcon = "haze-day";
          } else {
            weatherIcon = "haze-night";
          }
        } else if (weatherDescription.includes('mist')) {
          weatherIcon = 'mist';
        } else if (weatherDescription.includes('overcast')) {
          weatherIcon = 'overcast'
        } else if (weatherDescription.includes('snow')) {
          weatherIcon = 'snowy'
        } else {
          if (isDay === "yes") {
            weatherIcon = "partly-cloudy-day";
          } else {
            weatherIcon = "partly-cloudy-night";
          }
        }

        resultElement.innerHTML = `
          <div class="result">
            <div class="location">
              ${data.location}
            </div>
            <figure class="temperature">
              <img src="/img/weather-description/${weatherIcon}.png">
              <figcaption>
                <span class="main-temp">${data.forecast.temperature}°</span>
                <br>
                <span class="feels-like-temp">feels like ${data.forecast.feelsLike}°</span>
              </figcaption>
            </figure>
            <p class="weather-description">
              ${data.forecast.weatherDescription}
            </p>
          </div>
        `;
      }
    });
});

searchInput.addEventListener("click", () => {
   resultElement.innerHTML = "";
   errorMessage.innerHTML = "";   
});
