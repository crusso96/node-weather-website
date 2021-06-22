const request = require('request');


const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=c2e716428ddebfe00f406ee7eb0b57c8&query='+ latitude + ',' + longitude +'&units=f';

  request({ url, json: true }, (error, { body }) => {
    if(error) {
      callback('Unable to connect to location services.', undefined);
    } else if(body.error) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out.");
    }
  })
}

module.exports = forecast;