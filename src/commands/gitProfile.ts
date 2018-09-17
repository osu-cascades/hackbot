import axios from 'axios';
import { Message } from 'discord.js';
import moment from 'moment';
import ICommand from '../library/iCommand';

let GitProfile: ICommand;

export default GitProfile = class {

  /* istanbul ignore next */
  static get description(): string {
    return 'Retrieves any public github profile.';
  }

  public static execute(args: string[], msg: Message) {
    const { channel } = msg;

    if (args.length === 0) {
      const message = 'Please enter a username.';
      return channel.send(message);
    }
    else {
      this.getGithubProfile(args[0])
      .then((profile: IGitProfileResponse) => {
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

  private static getGithubProfile(userName: string): Promise<IGitProfileResponse> {
    const options = {
      url: `https://api.github.com/users/${userName}`,
      headers: {
        'User-Agent': 'request'
      },
    };

    return axios.request(options).then(response => {
      return response.data;
    });
  }

};

export interface IGitProfileResponse {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string|null;
  company: string|null;
  blog: string;
  location: string|null;
  email: string|null;
  hireable: boolean|null;
  bio: string|null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}
