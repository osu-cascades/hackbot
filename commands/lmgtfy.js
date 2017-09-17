const Command = require('../library/command');

/**
 * @class Lmgtfy
 * @extends {Command}
 */

class Lmgtfy extends Command {

  static get description() {
    return 'When someone is being...lazy...?';
  }

  static execute(args, msg) {
    const { channel } = msg;
    if (args.length < 1) { return channel.sendMessage(this.argsErrorMessage); }
    return channel.sendMessage(`<http://lmgtfy.com/?q=${args.join('+')}>`);
  }

}

module.exports = Lmgtfy;
