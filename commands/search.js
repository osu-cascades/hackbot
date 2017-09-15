const Command = require('../library/command');
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
    const { key } = process.env.GOOGLE_API_KEY;
    const { cx } = process.env.GOOGLE_SEARCH_ENGINE_ID;
    const { channel } = msg;
    const url = `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&safe=off&q=${encodeURI(args)}`;

    superagent.get(url).end((err, res) => {
      if (err) {
        console.log('superagent error...');
        return msg.reply('Sorry, I don\'t seem to be able to do that...');
      }
      if (res.body.queries.request[0].totalResults === '0') { return channel.sendMessage('`No results found.`'); }
      channel.sendMessage(res.body.items[0].link).catch(() => {
        console.log('response error...');
        return msg.reply('Sorry, I had a problem getting a response from google.');
      });
    });
  }

}

module.exports = Search;