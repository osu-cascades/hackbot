import config from '@/config';
import CommandContext from '@/library/commandContext';
import ICommand from '@/library/interfaces/iCommand';
import { version } from '@root/package.json';

let Version: ICommand;

export default Version = class {

  /* istanbul ignore next */
  static get description(): string {
    return "Gets the bot's current running version from package.json";
  }

  public static execute({ msg }: CommandContext) {
    return msg.channel.send(`Hackbot ${config.env} is running v${version}`);
  }

};
