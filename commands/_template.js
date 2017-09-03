const Command = require('../library/command');
const Commands = require('../library/commands');

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

class CommandNameCommand extends Commands {

  /**
   *  Add the commands you would like to register here.
   * This includes a name, description, callback mapping, and optional arguments
   * 
   * @static
   * @returns 
   * @memberof CommandNameCommand
   */
  static commands() {
    return [
      new Command('commandName', 'Really cool description goes here', this.commandName),
      new Command('sum', 'Just an example with two commands and args',
        this.anotherRandomCommand, ['[Integer]', '[Another Integer]', '[...]'])
    ];
  }

  static commandName(args, msg) {
    // msg Class Info: https://discord.js.org/#/docs/main/stable/class/Message
    throw `Not Yet Implemented ${msg}`;
  }

  static anotherRandomCommand(args, msg) {
    throw `Not Yet Implemented ${msg}`;
  }

}

module.exports = CommandNameCommand;