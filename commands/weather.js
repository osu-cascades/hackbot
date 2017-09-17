const Command = require('../library/command');
const request = require('request');

/**
 * @class Weather
 * @extends {Command}
 */

class Weather extends Command {

  static get description() {
    return 'Provide City and State, or City and Country to get current temperature.';
  }

  // TODO? could be refactored out into more method calls instead of this jumbo method
  static execute(args, msg) {
    const { channel } = msg;
    if (args.length < 1) { return channel.sendMessage(this.argsErrorMessage); }
    const getWeather = location => new Promise((resolve, reject) => {
      const encodedLocation = encodeURIComponent(location);
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodedLocation}
                   us&units=imperial&appid=${process.env.OPEN_WEATHERMAP_KEY}`;
      location.map((location) => {
        const trimmedLocation = (location.trim());
        const isInt = parseInt(trimmedLocation);

        if (Number.isInteger(isInt)) {
          return reject('Please provide a location');
        }
      });
      request({
        url,
        json: true,
      }, (error, response, body) => {
        if (error) {
          reject('Unable to fetch weather.');
        } else {
          const temp = Math.floor(body.main.temp);
          return resolve(`It's ${temp} degrees in ${body.name}.`);
        }
      });
    });
    getWeather(args)
      .then((currentWeather) => {
        return channel.sendMessage(currentWeather);
      })
      .catch((error) => {
        console.log(error);
      });
  }

}

module.exports = Weather;
