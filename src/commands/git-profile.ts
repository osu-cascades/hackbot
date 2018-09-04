import Command from '../library/command';
import axios from 'axios';
import { Message } from 'discord.js';

let GitProfile: Command;

export default GitProfile = class {

  static get description():string {
    return 'Retrieves any public github profile.';
  }

  static execute(args: string[], msg: Message) {
    const { channel } = msg;

    if (args === undefined) {
      const message = 'Please enter a username.';
      console.error(message)
      return channel.send(message);
    }
    else {
      this.getGithubProfile(args[0])
      .then((profile: GitProfileResponse) => {
        return channel.send(profile.html_url);
      })
      .catch(console.error);
    }
  }

  private static getGithubProfile(userName: string): Promise<GitProfileResponse> {
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

export type GitProfileResponse = {
  login: string,
  id: number,
  node_id: string,
  avatar_url: string,
  gravatar_id: string,
  url: string,
  html_url: string,
  followers_url: string,
  following_url: string,
  gists_url: string,
  starred_url: string,
  subscriptions_url: string,
  organizations_url: string,
  repos_url: string,
  events_url: string,
  received_events_url: string,
  type: string,
  site_admin: boolean,
  name: string,
  company: string,
  blog: string,
  location: string,
  email: string|null,
  hireable: boolean,
  bio: string|null,
  public_repos: number,
  public_gists: number,
  followers: number,
  following: number,
  created_at: string,
  updated_at: string
}