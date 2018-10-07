import axios, { AxiosResponse } from 'axios';
import { Message } from 'discord.js';
import config from '../config';
import ICommand from '../library/iCommand';

let Search: ICommand;

export default Search = class {

  /* istanbul ignore next */
  static get description(): string {
    return 'Searches the web for the passed query and return the top result.';
  }

  public static execute(args: string[], msg: Message) {
    if (!config.googleApiKey || !config.googleSearchEngineId) {
      msg.reply('Setup Required: Configure Google API keys in the environment variables');
    }

    const { channel } = msg;
    const parameters = `key=${config.googleApiKey}&cx=${config.googleSearchEngineId}&safe=off&q=${encodeURI(args[0])}`;
    const url = `https://www.googleapis.com/customsearch/v1?${parameters}`;

    axios.get(url).then((response: AxiosResponse) => {
      console.log(response.data);
      if (response.data.queries.request[0].totalResults === '0') {
        channel.send('`No results found.`');
      }
      else {
        channel.send(response.data.items[0].link).catch(() => {
          console.log('response error...');
          // return msg.reply('Sorry, I had a problem getting a response from google.');
        });
      }
    }).catch((err: string) => {
      console.error(err);
      return msg.reply("I'm Sorry Dave, I'm afraid I can't do that...");
    });
  }

};
