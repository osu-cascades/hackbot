import config from '../config';

const Command = require('../library/command');
const axios = require('axios');

/**
 * @class Search
 * @extends {Command}
 */

class Search extends Command {

  static get description() {
    return 'Searches the web for the passed query and return the top result.';
  }

  static execute(args, msg) {
    const { channel } = msg;
    if (!config.googleApiKey || !config.googleSearchEngineId) {
      msg.reply('Setup Required: Configure Google API keys in the environment variables');
    }
    const url = `https://www.googleapis.com/customsearch/v1?key=${config.googleApiKey}&cx=${config.googleSearchEngineId}&safe=off&q=${encodeURI(args)}`;

    axios.get(url).then(response => {
      if (response.data.queries.request[0].totalResults === '0') { return channel.send('`No results found.`'); }
      channel.send(response.data.items[0].link).catch(() => {
        console.log('response error...');
        return msg.reply('Sorry, I had a problem getting a response from google.');
      });
    }).catch(err => {
      console.error(err);
      return msg.reply("I'm Sorry Dave, I'm afraid I can't do that...");
    });
  }

}

module.exports = Search;
