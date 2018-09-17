import { Message } from 'discord.js';
import { version } from '../../package.json';
import config from '../config';
import ICommand from '../library/iCommand';

let Version: ICommand;

export default Version = class {

  /* istanbul ignore next */
  static get description(): string {
    return "Gets the bot's current running version from package.json";
  }

  public static execute(args: string[], msg: Message) {
    return msg.channel.sendMessage(`Hackbot ${config.env} is running v${version}`);
  }

};
