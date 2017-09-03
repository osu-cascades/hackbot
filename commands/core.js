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
 * @class CoreCommand
 * @extends {Command}
 */

class CoreCommand extends Commands {

  static commands() {
    return [
      new Command('help', 'Displays this message', this.help),
      new Command('rules', 'List the rules for the CTC Discord server.', this.rules),
      new Command('source', 'Retrieves the hackBot\'s github repository.', this.source)
    ];
  }

  static help(args, msg, commands) {
    let helpMsg = 'I am here to help! Well...mostly just make you chuckle at this point, let\'s be honest.\n\n';
    helpMsg += 'Here is a list of the commands that we\'ve got right now:\n';
    helpMsg += '```\n';

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
    helpMsg += '```';

    msg.reply('sliding into your DMs...');
    msg.author.sendMessage(helpMsg);
  }

  static rules(args, msg) {
    const { channel } = msg;
    return channel.sendMessage('Be nice and don\'t copy each other\'s homework!');
  }

  static source(args, msg) {
    return msg.channel.sendMessage('Hack me at https://github.com/osu-cascades/hackbot');
  }

}

module.exports = CoreCommand;