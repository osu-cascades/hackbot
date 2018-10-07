import { Message } from 'discord.js';
import config from '../config';
import Commands from '../library/commands';
import ICommand from '../library/iCommand';

let Help: ICommand;

export default Help = class {

  /* istanbul ignore next */
  static get description(): string {
    return 'Displays this message';
  }

  public static execute(args: string[], msg: Message) {
    const commands = new Commands();
    const longest = commands.longestName();

    let helpMsg = "I am here to help! Well...mostly just make you chuckle at this point, let's be honest.\n\n";
    helpMsg += "Here is a list of the commands that we've got right now:\n";
    helpMsg += '```\n';

    commands.names.map((commandName) => {
      const command = commands.get(commandName);
      const amountOfSpaces = longest - commandName.length;
      helpMsg += `${config.messagePrefix}${commandName}`;
      // TODO: needs args implemented here after they're part of the magic
      helpMsg += ' '.repeat(amountOfSpaces);
      helpMsg += `→ ${command.description}\n`;
    });

    helpMsg += '```';

    msg.reply('sliding into your DMs...');
    msg.author.send(helpMsg);
  }
};
