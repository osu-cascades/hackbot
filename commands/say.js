const Command = require('../library/command');

/** *
 * @class Say
 * @extends {Command}
 */

class Say extends Command {

  static get description() {
    return 'Echos back the string passed as arguments.';
  }

  static execute(args, msg) {
    const { channel } = msg;
    if (args.length < 1) { return channel.sendMessage(this.argsErrorMessage); }
    const saying = args.join(' ');
    return channel.sendMessage(saying);
  }

}

module.exports = Say;
