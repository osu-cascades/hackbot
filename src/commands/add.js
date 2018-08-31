const Command = require('../library/command');

/**
 * @class Add
 * @extends {Command}
 */

class Add extends Command {

  static get description() {
    return 'Adds together _integers_ passed as arguments.';
  }

  static execute(args, msg) {
    const { channel } = msg;
    if (args.length < 1) { return channel.send(this.argsErrorMessage); }
    const numArray = args.map(n => parseInt(n));
    const total = numArray.reduce((p, c) => p + c);
    return channel.send(total);
  }

}

module.exports = Add;
