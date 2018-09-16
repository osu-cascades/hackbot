import { Message } from 'discord.js';
import { version } from '../../package.json';
import config from '../config';
import ICommand from '../library/iCommand';

let Version: ICommand;

export default Version = class {

  static get description(): string {
    return "Gets the bot's current running version from package.json";
  }

  public static execute(args: string[], msg: Message) {
    const { channel } = msg;
    const runningEnv = config.env ? `${config.env} ` : '';
    return channel.sendMessage(`Hackbot ${runningEnv}is running v${version}`);
  }

};
