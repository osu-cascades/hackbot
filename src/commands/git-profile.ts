import Command from '../library/command';
import axios from 'axios';

/**
 * @class GitProfile
 * @extends {Command}
 */

export default class GitProfile extends Command {

  static get description() {
    return 'Retrieves any public github profile.';
  }

  static execute(args, msg) {
    const { channel } = msg;
    if (args.length < 1) { return channel.send(this.argsErrorMessage); }

    if (args === undefined) {
      const message = 'Please enter a username.';
      console.error(message)
      return msg.channel.send(message);
    }
    else {
      this.getGithubProfile(args)
      .then((profile) => {
        const parsedProfile = JSON.parse(profile);
        return msg.channel.send(parsedProfile.html_url);
      })
      .catch(console.error);
    }
  }

  static getGithubProfile(userName) {
    const options = {
      url: `https://api.github.com/users/${userName}`,
      headers: {
        'User-Agent': 'request',
      },
    };

    return axios.request(options).then(response => {
      return response.data;
    });
  }

}
