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
  constructor(...args) {
    super(...args);
  }

  commandName(args, msg) {
    // msg Class Info: https://discord.js.org/#/docs/main/stable/class/Message
  }

}

module.exports = CommandNameCommand;