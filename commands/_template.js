const Command = require('../library/command');

/**
 * Copy this file as a template to create a new command.
 * Update references of CommandNameCommand and commandName 
 * in this file to something unique, ideally related 
 * to the command, or the command itself followed by Command.
 * ie: HelloCommand.
 * 
 * Replace this comment with a description of your command.
 * 
 * @class CommandName
 * @extends {Command}
 */

class CommandNameCommand extends Command {
  // Not currently used
  constructor(...args) {
    super(...args);
  }

  static commandName(args, msg) {
    // msg Class Info: https://discord.js.org/#/docs/main/stable/class/Message
    throw `Not Yet Implemented ${msg}`;
  }

}

module.exports = CommandNameCommand;