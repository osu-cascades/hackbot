const Command = require('../library/command');

/**
 * Displays a list of commands available
 * 
 * @class HelpCommand
 * @extends {Command}
 */

class HelpCommand extends Command {

  static help(args, msg, commands) {
    let helpMsg = 'I am here to help! Well...mostly just make you chuckle at this point, let\'s be honest.\n\n';
    helpMsg += 'Here is a list of the commands that we\'ve got right now:\n';
    helpMsg += '\`\`\`\n';

    // Find the longest synopsis
    let longest = 0;
    commands.map((info) => {
      let { command } = info;
      command = `${process.env.MESSAGE_PREFIX}${command}`;
      if (command.length > longest) {
        longest = command.length;
      }
    });

    // Add an extra space
    longest += 1;
    commands.map((info) => {
      let { command, description } = info;
      command = `${process.env.MESSAGE_PREFIX}${command}`;
      helpMsg += `${command}`;
      const spaces = longest - command.length;
      for (let i = 0; i < spaces; i++) {
        helpMsg += ' ';
      }
      helpMsg += '→ ';
      helpMsg += `${description}\n`;
    });
    helpMsg += '\`\`\`';

    msg.reply('sliding into your DMs...');
    msg.author.sendMessage(helpMsg);
  }

}

module.exports = HelpCommand;