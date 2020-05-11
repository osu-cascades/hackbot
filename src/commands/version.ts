import config from '@/config';
import ICommand from '@/library/interfaces/iCommand';
import { version } from '@root/package.json';
import { Message } from 'discord.js';

let Version: ICommand;

export default Version = class {

  /* istanbul ignore next */
  static get description(): string {
    return "Gets the bot's current running version from package.json";
  }

  public static execute(args: string[], msg: Message) {
    return msg.channel.send(`Hackbot ${config.env} is running v${version}`);
  }

};
