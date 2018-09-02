import Command from '../library/command';

/**
 * @class Lmgtfy
 * @extends {Command}
 */

export default class Lmgtfy extends Command {

  static get description() {
    return 'When someone is being...lazy...?';
  }

  static execute(args, msg) {
    const { channel } = msg;
    return channel.send(`<http://lmgtfy.com/?q=${args.join('+')}>`);
  }

}
