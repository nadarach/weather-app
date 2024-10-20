const request = require('postman-request');
const { geocodeKey } = require('../../config.js')

const geocode = (address, callback) => {
  const addressFormatted = encodeURIComponent(address);
  const url = `https://api.positionstack.com/v1/forward?access_key=${geocodeKey}&query=${addressFormatted}&limit=1`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location services.", undefined);

    } else if (body.error) {
      const errorQuery = body.error.context.query;
      callback(`(Error) ${errorQuery.type}: ${errorQuery.message}`, undefined);

    } else if (!body.data.length) {
      callback("Unable to find location. Try another search.", undefined);

    } else {
      const { longitude, latitude, label, name, region, country } = body.data[0];
      
      callback(undefined, {
        longitude,
        latitude,
        location: `${name},` + (region? ` ${region},` : '') + ` ${country}`,
      });
    }
  });
};


module.exports = geocode;