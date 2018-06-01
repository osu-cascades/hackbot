const Command = require('../library/command');
const config = require('../config/config');
const superagent = require('superagent');

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
    const url = `https://www.googleapis.com/customsearch/v1?key=${config.googleApiKey}&cx=${config.googleSearchEngineId}&safe=off&q=${encodeURI(args)}`;

    superagent.get(url).end((err, res) => {
      if (err) {
        console.log('superagent error...');
        return msg.reply('Sorry, I don\'t seem to be able to do that...');
      }
      if (res.body.queries.request[0].totalResults === '0') { return channel.send('`No results found.`'); }
      channel.send(res.body.items[0].link).catch(() => {
        console.log('response error...');
        return msg.reply('Sorry, I had a problem getting a response from google.');
      });
    });
  }

}

module.exports = Search;
