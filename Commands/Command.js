const commandInformation = require('./commandInformation');
const superagent = require('superagent');
const request = require('request');
const config = require('../config.json');

class Command {
    constructor() {
        this.argsErrorMessage = "Arguments are missing. \n"
        this.argsErrorMessage += "Refer to `!help` or ask an Adminstrator if this error occurs"
    }

    help(args, msg) {
        var helpMsg = "I am here to help! Well...mostly just make you chuckle at this point, let's be honest.\n\n";
        helpMsg += "Here is a list of the commands that we've got right now:\n";
        helpMsg += "\`\`\`\n";

        // Find the longest synopsis
        var longest = 0;
        commandInformation.map((info) => {
          var { command } = info;
          command = `${config.prefix}${command}`
          if ( command.length > longest ) {
               longest = command.length;
            }
        })

        // Add an extra space
        longest = longest + 1;
        commandInformation.map((info) => {
            var { command, description } = info;
            command = `${config.prefix}${command}`
            helpMsg += command + " ";
            let spaces = longest - command.length;
            for ( var i = 0; i < spaces; i++ ) {
                helpMsg += " ";
            }
            helpMsg += "→ "
            helpMsg += description + "\n";
        })
        helpMsg += "\`\`\`"

        msg.reply("sliding into your DMs...");
        msg.author.sendMessage(helpMsg);
        return
    }

    lmgtfy(args, msg) {
      var { channel } = msg;
      if ( args.length < 1) { return channel.sendMessage(this.argsErrorMessage); }
      return channel.sendMessage('<http://lmgtfy.com/?q=' + args.join('+') + '>');
    }

    say(args, msg) {
      var { channel } = msg;
      if ( args.length < 1) { return channel.sendMessage(this.argsErrorMessage); }
          let saying = args.join(" ");
          return channel.sendMessage(saying);
    }

    search(args, msg) {
      const { key } = config;
      const { cx }  = config;
      var { channel } = msg;
      let url = `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&safe=off&q=${encodeURI(args)}`;

      superagent.get(url).end((err, res) => {
          if (err) return msg.reply("superagent error...");
          if (res.body.queries.request[0].totalResults === '0') return channel.sendMessage('`No results found.`');
          channel.sendMessage(res.body.items[0].link).catch(() => {
              return msg.reply("response error...");
        });
      });
    }

    add(args, msg) {
      var { channel } = msg;
      if ( args.length < 1) { return channel.sendMessage(this.argsErrorMessage); }
      let numArray = args.map(n => parseInt(n));
      let total = numArray.reduce((p, c) => p + c);
      return channel.sendMessage(total);
    }

    rules(args, msg) {
      var { channel } = msg;
      return channel.sendMessage("Be nice and don't copy each other's homework!");
    }

    xmas(args, msg) {
       var { channel } = msg;
       var randomImage = "https://giphy.com/gifs/foxhomeent-3o7TKLHb0PWRNnoVq0";
       channel.sendMessage(randomImage);
    }

    purge(args, msg) {
        var { guild } = msg;
        // Make sure the person doing the command is a Board Member
        let boardRole = guild.roles.find("name", "Board Member");
        if (msg.member.roles.has(boardRole.id)) {

          // Grab the channels info
          let chan = msg.channel;
          let chanName = chan.name;
          let chanType = chan.type;

          //Delete the channel
          chan.delete()
              .then()
              .catch(console.error);

          // Now re-create the channel with the same name and type
          guild.createChannel(chanName, chanType)
              .then(channel => console.log(`Created new channel ${channel}`))
              .catch(console.error);
      } else {
          return msg.reply("sorry m8, you're not authorized to use that command.");
      }
      if (!guild.member(bot.user).hasPermission("MANAGE_CHANNELS")) {
        return msg.reply("sorry m8, you're not authorized to use that command.");
      }
    }

    weather(args, msg) {
        var { channel } = msg;
        if ( args.length < 1) { return channel.sendMessage(this.argsErrorMessage); }
        var getWeather = (location) => {
            return new Promise((resolve, reject) => {
                let encodedLocation = encodeURIComponent(location);
                let url = `http://api.openweathermap.org/data/2.5/weather?q=${encodedLocation}
                           us&units=imperial&appid=${config.weatherKey}`;
                location.map((location) => {
                    let trimmedLocation = (location.trim());
                    let isInt = parseInt(trimmedLocation);

                    if (Number.isInteger(isInt)) {
                        return reject("Please provide a location");
                    }
                })
                request({
                    url: url,
                    json: true
                  }, function(error, response, body) {
                         if (error) {
                             reject('Unable to fetch weather.');
                         } else {
                             let temp = Math.floor(body.main.temp)
                             resolve(`It\'s ${temp} degrees in ${body.name}.`);
                         }
                  });

              })
        }
        getWeather(args)
            .then((currentWeather) => {
                channel.sendMessage(currentWeather);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    source(args, msg) {
        return msg.channel.sendMessage("My repo is located here: https://github.com/JWTappert/hackBot");
    }

    gitProfile(args, msg) {
        if ( args.length < 1) { return channel.sendMessage(this.argsErrorMessage); }
        var getGithubProfile = (userName) => {
                return new Promise((resolve, reject) => {
                    if (userName === undefined) {
                        return reject('Please enter a username.');
                    } else {
                        let url = `https://api.github.com/users/${userName}`;
                        let options = {
                            url: url,
                            headers: {
                                'User-Agent': 'request'
                            }
                        }
                        request(options, (error, response, body) => {
                            if (error) {
                                return reject(`error: ${error}`);
                            } else {
                                resolve(body);
                            }
                        })
                    }
                })
        }
        getGithubProfile(args)
            .then((profile) => {
                let parsedProfile = JSON.parse(profile);
                msg.channel.sendMessage(parsedProfile.html_url);
            })
            .catch((error) => {
                console.log(error);
            })
    }


}
module.exports = Command;
