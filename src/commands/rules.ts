import Command from '../library/command';

/**
 * @class Rules
 * @extends {Command}
 */

export default class Rules extends Command {

  static get description() {
    return 'List the rules for the CTC Discord server.';
  }

  static execute(args, msg) {
    const { channel } = msg;
    return channel.send('Be nice and don\'t copy each other\'s homework!');
  }

}
