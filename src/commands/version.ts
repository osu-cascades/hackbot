import config from '../config';

const Command = require('../library/command');
const { version } = require('../package.json');

/**
 * @class Version
 * @extends {Command}
 */

class Version extends Command {

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

module.exports = Version;
