const request = require("postman-request");
const { forecastKey } = require("../../config.js");

forecast = (latitude, longitude, callback) => {
  const url = `https://api.weatherstack.com/current?access_key=${forecastKey}&query=${latitude},${longitude}`;

  //   request({ url, json: true }, (error, response) => {
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service.", undefined);

    } else if (body.error) {
      callback(
        `(Error) ${body.error.type}: ${body.error.info}`,
        undefined
      );

    } else {
      const dataCurrent = body.current;
      const dataLocation = body.location;
      
      callback(undefined, {
        /*location: `${dataLocation.name}, ${dataLocation.region}, ${dataLocation.country}`,*/
        isDay: dataCurrent.is_day,
        weatherDescription: dataCurrent.weather_descriptions[0],
        temperature: dataCurrent.temperature,
        feelsLike: dataCurrent.feelslike,
      });
    }
  });
};

module.exports = forecast;
