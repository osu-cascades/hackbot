import config from '../config';

const Command = require('../library/command');
const axios = require('axios');

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
    if (args.length < 1) { return channel.send(this.argsErrorMessage); }

    this.getWeather(args)
      .then((weather) => {
        const temp = Math.floor(weather.main.temp);
        return channel.send(`It's ${temp} degrees in ${weather.name}.`);
      })
      .catch(msg.reply);
  }

  static getWeather(location) {
    if (!config.openWeathermapKey) {
      return Promise.reject('Setup Required: Add OPEN_WEATHERMAP_KEY environment variable.');
    }

    const encodedLocation = encodeURIComponent(location);
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodedLocation}
                  us&units=imperial&appid=${config.openWeathermapKey}`;
    location.map((location) => {
      const trimmedLocation = (location.trim());
      const isInt = parseInt(trimmedLocation);

      if (Number.isInteger(isInt)) {
        return Promise.reject('Please provide a location');
      }
    });

    return axios.get(url).catch(err => console.error('Unable to fetch weather.'));
  }
}

module.exports = Weather;
