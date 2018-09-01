import config from '../config';
import Command from '../library/command';
import { version } from '../package.json';

/**
 * @class Version
 * @extends {Command}
 */

export default class Version extends Command {

  static get description() {
    return "Gets the bot's current running version from package.json";
  }

  static execute(args, msg) {
    const { channel } = msg;
    let nodeEnv = config.env;
    let runningEnv = nodeEnv ? `${nodeEnv} ` : '';
    return channel.sendMessage(`Hackbot ${runningEnv}is running v${version}`);
  }

}
