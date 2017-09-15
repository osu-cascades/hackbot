const Command = require('../library/command');
const Commands = require('../library/commands');

/**
 * @class Help
 * @extends {Command}
 */

class Help extends Command {

  static get description() {
    return 'Displays this message';
  }

  static execute(args, msg) {
    let commands = new Commands();
    let allCommands = commands.all;

    let helpMsg = 'I am here to help! Well...mostly just make you chuckle at this point, let\'s be honest.\n\n';
    helpMsg += 'Here is a list of the commands that we\'ve got right now:\n';
    helpMsg += '```\n';

    // Find the longest synopsis
    // Considered moving this to the Commands class
    let longest = 0;
    commands.names.map((commandName) => {
      commandName = `${process.env.MESSAGE_PREFIX}${commandName}`;
      if (commandName.length > longest) {
        longest = commandName.length;
      }
    });

    // Add an extra space
    longest += 1;
    allCommands.map((command) => {
      command = `${process.env.MESSAGE_PREFIX}${command.name}`;
      helpMsg += `${command.name}`;
      const spaces = longest - command.name.length;
      for (let i = 0; i < spaces; i++) {
        helpMsg += ' ';
      }
      helpMsg += '→ ';
      helpMsg += `${command.description}\n`;
    });
    helpMsg += '```';

    msg.reply('sliding into your DMs...');
    msg.author.sendMessage(helpMsg);
  }

}

module.exports = Help;