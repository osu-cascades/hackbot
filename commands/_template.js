const Command = require('../library/command');

/**
 * @class CommandName
 * @extends {Command}
 */

class CommandName extends Command {

  static get description() {
    return 'This is a description of my awesome command.';
  }

  static get arguments() {
    return {
      /**
       * requiredArg: true,
       * optionalArg: false,
       * _variable: true
       */
    };
  }

  static execute(args, msg) {
    // msg Class Info: https://discord.js.org/#/docs/main/stable/class/Message
    throw `Not Yet Implemented ${msg}`;
  }

}

module.exports = CommandName;
