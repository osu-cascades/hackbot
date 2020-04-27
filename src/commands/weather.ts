import config from '@/config';
import CommandContext from '@/library/commandContext';
import ICommand from '@/library/interfaces/iCommand';
import axios, { AxiosResponse } from 'axios';

let Weather: ICommand;

export default Weather = class {

  /* istanbul ignore next */
  static get description(): string {
    return 'Provide City and State, or City and Country to get current temperature.';
  }

  // TODO? could be refactored out into more method calls instead of this jumbo method
  public static execute({ args, msg }: CommandContext) {
    const { channel } = msg;

    this.getWeather(args)
      .then((weather) => {
        const temp = Math.floor(weather.main.temp);
        return channel.send(`It's ${temp} degrees in ${weather.name}.`);
      })
      .catch(() => msg.reply('Unable to fetch the weather.'));
  }

  private static getWeather(locationArgs: string[]): Promise<{main: {temp: number}, name: string}> {
    const location = locationArgs[0];
    if (!config.openWeathermapKey) {
      return Promise.reject('Setup Required: Add OPEN_WEATHERMAP_KEY environment variable.');
    }

    const encodedLocation = encodeURIComponent(location);
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodedLocation}
                  us&units=imperial&appid=${config.openWeathermapKey}`;

    const trimmedLocation = (location.trim());
    const isInt = parseInt(trimmedLocation);

    if (Number.isInteger(isInt)) {
      return Promise.reject('Please provide a location');
    }

    return axios.get(url).then((response: AxiosResponse) => {
      return {
        main: {temp: response.data.main.temp},
        name: response.data.name
      };
    });
  }
};
