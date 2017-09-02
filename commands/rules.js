const Command = require('../library/command');

/**
 * Copy this file as a template to create a new command.
 * Update references of CommandName and commandName 
 * in this file to something unique, ideally related 
 * to the command, or the command itself.
 * 
 * Replace this comment with a description of your command.
 * 
 * @class CommandName
 * @extends {Command}
 */

class RulesCommand extends Command {

  static rules(args, msg) {
    const { channel } = msg;
    return channel.sendMessage('Be nice and don\'t copy each other\'s homework!');
  }

}

module.exports = RulesCommand;