const Command = require('../library/command');
const request = require('request');

/**
 * @class GitProfile
 * @extends {Command}
 */

class GitProfile extends Command {

  static get description() {
    return 'Retrieves any public github profile.';
  }

  static execute(args, msg) {
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

}

module.exports = GitProfile;