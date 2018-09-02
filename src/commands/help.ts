import config from '../config';
import Command from '../library/command';
import Commands from '../library/commands';

export default class Help extends Command {

  static get description() {
    return 'Displays this message';
  }

  static execute(args, msg) {
    let commands = new Commands();

    let helpMsg = 'I am here to help! Well...mostly just make you chuckle at this point, let\'s be honest.\n\n';
    helpMsg += 'Here is a list of the commands that we\'ve got right now:\n';
    helpMsg += '```\n';

    // Find the longest synopsis
    // Considered moving this to the Commands class
    let longest = 0;
    commands.names.map((commandName) => {
      commandName = `${config.messagePrefix}${commandName}`;
      if (commandName.length > longest) {
        longest = commandName.length;
      }
    });

    // Add an extra space
    longest += 1;
    commands.names.map((commandName) => {
      let command = commands.get(commandName);
      helpMsg += `${config.messagePrefix}${commandName}`;
      // TODO: needs args implemented here after they're part of the magic
      const spaces = longest - commandName.length;
      for (let i = 0; i < spaces; i++) {
        helpMsg += ' ';
      }
      helpMsg += '→ ';
      helpMsg += `${command.description}\n`;
    });
    helpMsg += '```';

    msg.reply('sliding into your DMs...');
    msg.author.send(helpMsg);
  }

}
