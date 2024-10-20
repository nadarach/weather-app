const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  geocodeKey: process.env.POSITION_STACK_API_KEY,
  forecastKey: process.env.WEATHER_STACK_API_KEY,
};
