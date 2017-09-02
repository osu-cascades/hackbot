const superagent = require('superagent');
const request = require('request');
const Command = require('./command');

class UsefulCommand extends Command {
  constructor(...args) {
    super(...args);
  }

  add(args, msg) {
    const { channel } = msg;
    if (args.length < 1) { return channel.sendMessage(this.argsErrorMessage); }
    const numArray = args.map(n => parseInt(n));
    const total = numArray.reduce((p, c) => p + c);
    return channel.sendMessage(total);
  }

  gitProfile(args, msg) {
    const { channel } = msg;
    if (args.length < 1) { return channel.sendMessage(this.argsErrorMessage); }
    const getGithubProfile = userName => new Promise((resolve, reject) => {
      if (userName === undefined) {
        return reject('Please enter a username.');
      }
      const url = `https://api.github.com/users/${userName}`;
      const options = {
        url,
        headers: {
          'User-Agent': 'request',
        },
      };
      request(options, (error, response, body) => {
        if (error) {
          return reject(`error: ${error}`);
        }
        return resolve(body);
      });
    });
    getGithubProfile(args)
      .then((profile) => {
        const parsedProfile = JSON.parse(profile);
        return msg.channel.sendMessage(parsedProfile.html_url);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  lmgtfy(args, msg) {
    const { channel } = msg;
    if (args.length < 1) { return channel.sendMessage(this.argsErrorMessage); }
    return channel.sendMessage(`<http://lmgtfy.com/?q=${args.join('+')}>`);
  }

  search(args, msg) {
    const { key } = process.env.GOOGLE_API_KEY;
    const { cx } = process.env.GOOGLE_SEARCH_ENGINE_ID;
    const { channel } = msg;
    const url = `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&safe=off&q=${encodeURI(args)}`;

    superagent.get(url).end((err, res) => {
      if (err) {
        console.log('superagent error...');
        return msg.reply('Sorry, I don\'t seem to be able to do that...');
      }
      if (res.body.queries.request[0].totalResults === '0') { return channel.sendMessage('`No results found.`'); }
      channel.sendMessage(res.body.items[0].link).catch(() => {
        console.log('response error...');
        return msg.reply('Sorry, I had a problem getting a response from google.');
      });
    });
  }

  weather(args, msg) {
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
          return resolve(`It\'s ${temp} degrees in ${body.name}.`);
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

module.exports = UsefulCommand;
