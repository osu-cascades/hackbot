import config from '@/config';
import ICommand from '@/library/interfaces/iCommand';
import axios, { AxiosResponse } from 'axios';
import { Message } from 'discord.js';

let Search: ICommand;

export default Search = class {

  /* istanbul ignore next */
  static get description(): string {
    return 'Searches the web for the passed query and return the top result.';
  }

  public static execute(args: string[], msg: Message) {
    if (!config.googleApiKey || !config.googleSearchEngineId) {
      return msg.reply('Setup Required: Configure Google API keys in the environment variables');
    }

    const { channel } = msg;
    const parameters = `key=${config.googleApiKey}&cx=${config.googleSearchEngineId}&safe=off&q=${encodeURI(args[0])}`;
    const url = `https://www.googleapis.com/customsearch/v1?${parameters}`;

    return axios.get(url).then((response: AxiosResponse): Promise<Message|Message[]> => {
      const hasQueries = 'queries' in response.data;
      if (!hasQueries) {
        const jsonData = JSON.stringify(response.data);
        const errorMessage = `Malformed Google Search Response: ${jsonData}`;
        channel.send(errorMessage);
        return Promise.reject(errorMessage);
      }
      else if (response.data.queries.request[0].totalResults === 0) {
        return channel.send('`No results found.`');
      }
      else {
        return channel.send(response.data.items[0].link);
      }
    }).catch((err: string) => {
      console.error(err);
      return msg.reply("I'm Sorry Dave, I'm afraid I can't do that...");
    });
  }

};
