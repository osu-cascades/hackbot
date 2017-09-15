const Command = require('../library/command');

/**
 * @class Rules
 * @extends {Command}
 */

class Rules extends Command {

  static get description() {
    return 'List the rules for the CTC Discord server.';
  }

  static execute(args, msg) {
    const { channel } = msg;
    return channel.sendMessage('Be nice and don\'t copy each other\'s homework!');
  }

}

module.exports = Rules;