const superagent = require('superagent');
const request = require('request');
const commandInformation = require('./command-information');

class Command {
  constructor() {
    this.argsErrorMessage = 'Arguments are missing.\n Refer to `!help` or ask an Administrator if this error occurs.';
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

  help(args, msg) {
    let helpMsg = 'I am here to help! Well...mostly just make you chuckle at this point, let\'s be honest.\n\n';
    helpMsg += 'Here is a list of the commands that we\'ve got right now:\n';
    helpMsg += '\`\`\`\n';

    // Find the longest synopsis
    let longest = 0;
    commandInformation.map((info) => {
      let { command } = info;
      command = `${process.env.MESSAGE_PREFIX}${command}`;
      if (command.length > longest) {
        longest = command.length;
      }
    });

    // Add an extra space
    longest += 1;
    commandInformation.map((info) => {
      let { command, description } = info;
      command = `${process.env.MESSAGE_PREFIX}${command}`;
      helpMsg += `${command} `;
      const spaces = longest - command.length;
      for (let i = 0; i < spaces; i++) {
        helpMsg += ' ';
      }
      helpMsg += '→ ';
      helpMsg += `${description}\n`;
    });
    helpMsg += '\`\`\`';

    msg.reply('sliding into your DMs...');
    msg.author.sendMessage(helpMsg);
  }

  lmgtfy(args, msg) {
    const { channel } = msg;
    if (args.length < 1) { return channel.sendMessage(this.argsErrorMessage); }
    return channel.sendMessage(`<http://lmgtfy.com/?q=${args.join('+')}>`);
  }

  purge(args, msg) {
    const { guild } = msg;

    // Make sure the person doing the command is a Board Member
    const boardRole = guild.roles.find('name', 'Board Member');
    if (msg.member.roles.has(boardRole.id)) {
      // Grab the channels info
      const chan = msg.channel;
      const chanName = chan.name;
      const chanType = chan.type;

      // Delete the channel
      chan.delete()
        .then()
        .catch(console.error);

      // Now re-create the channel with the same name and type
      guild.createChannel(chanName, chanType)
        .then(channel => console.log(`Created new channel ${channel}`))
        .catch(console.error);
    } else {
      return msg.reply('sorry m8, you\'re not authorized to use that command.');
    }
    if (!guild.member(bot.user).hasPermission('MANAGE_CHANNELS')) {
      return msg.reply('sorry m8, you\'re not authorized to use that command.');
    }
  }

  rules(args, msg) {
    const { channel } = msg;
    return channel.sendMessage('Be nice and don\'t copy each other\'s homework!');
  }

  say(args, msg) {
    const { channel } = msg;
    if (args.length < 1) { return channel.sendMessage(this.argsErrorMessage); }
    const saying = args.join(' ');
    return channel.sendMessage(saying);
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

  source(args, msg) {
    return msg.channel.sendMessage('Hack me at https://github.com/osu-cascades/hackbot');
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

  xmas(args, msg) {
    const { channel } = msg;
    const randomImage = 'https://giphy.com/gifs/foxhomeent-3o7TKLHb0PWRNnoVq0';
    channel.sendMessage(randomImage);
  }
}

module.exports = Command;
