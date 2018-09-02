import Command from '../library/command';
import axios from 'axios';
import { Message } from 'discord.js';

let GitProfile: Command;

export default GitProfile = class {

  public static get description():string {
    return 'Retrieves any public github profile.';
  }

  public static execute(args: string[], msg: Message) {
    const { channel } = msg;

    if (args === undefined) {
      const message = 'Please enter a username.';
      console.error(message)
      return channel.send(message);
    }
    else {
      this.getGithubProfile(args[0])
      .then((profile: string) => {
        const parsedProfile = JSON.parse(profile);
        return channel.send(parsedProfile.html_url);
      })
      .catch(console.error);
    }
  }

  static getGithubProfile(userName: string): Promise<string> {
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
