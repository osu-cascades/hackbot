import { Message } from 'discord.js';
import config from '@/config';
import Commands from '@/library/commands';
import ICommand from '@/library/interfaces/iCommand';

let Help: ICommand;

export default Help = class {

  /* istanbul ignore next */
  static get description(): string {
    return 'Displays this message';
  }

  public static execute(
    args: string[],
    msg: Message,
    { commands }: { commands: Commands }
  ) {
    const helpMsg = "I am here to help! Well...mostly just make you chuckle at this point, let's be honest.\n\n" +
      "Here is a list of the commands that we've got right now:\n" +
      '```\n' +
      this.commandsAndDescriptions(commands) +
      '```';

    msg.reply('sliding into your DMs...');
    msg.author.send(helpMsg);
  }

  private static commandsAndDescriptions(commands: Commands) {
    const prefixLength = config.messagePrefix.length;
    const longest = commands.longestNameLength() + prefixLength;

    return commands.names.reduce((message, commandName) => {
      const command = commands.get(commandName);
      const commandPrefixLength = commandName.length + prefixLength;
      const amountOfSpaces = longest - commandPrefixLength;
      return message += `${config.messagePrefix}${commandName}` +
      // TODO: needs args implemented here after they're part of the magic
        ' '.repeat(amountOfSpaces) +
        `  → ${command.description}\n`;
    }, '');
  }
};
