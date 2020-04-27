import CommandContext from '@/library/commandContext';
import ICommand from '@/library/interfaces/iCommand';
import axios from 'axios';
import moment from 'moment';
import IGithubProfile from './interfaces/iGithubProfile';

let GitProfile: ICommand;

export default GitProfile = class {

  /* istanbul ignore next */
  static get description(): string {
    return 'Retrieves any public github profile.';
  }

  public static execute({ args, msg }: CommandContext) {
    const { channel } = msg;

    if (args.length === 0) {
      const message = 'Please enter a username.';
      return channel.send(message);
    }
    else {
      return this.getGithubProfile(args[0])
      .then((profile: IGithubProfile) => {
        const joinedDate =  moment(profile.created_at).fromNow() + ' ' + moment(profile.created_at).calendar();
        const name = profile.name || '';
        const company = profile.company ? ` at ${profile.company}` : '';
        const location = profile.location ? ` hacking in ${profile.location}` : '';
        let firstLine = `${name}${company}${location}`;
        if (firstLine !== '') {
          firstLine += '\n';
        }
        return channel.send(`[${profile.type}] ${firstLine}` +
          `with ${profile.public_repos} public repos, ${profile.public_gists} public gists, ` +
          `${profile.followers} followers, and following ${profile.following}` +
          `\nJoined ${joinedDate} ${profile.html_url}`);
      })
      .catch(console.error);
    }
  }

  private static getGithubProfile(userName: string): Promise<IGithubProfile> {
    const options = {
      url: `https://api.github.com/users/${userName}`,
      headers: {
        'User-Agent': 'request'
      }
    };

    return axios.request(options).then(response => {
      return response.data;
    });
  }

};
