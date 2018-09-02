import Command from '../library/command';

/** *
 * @class Say
 * @extends {Command}
 */

export default class Say extends Command {

  static get description() {
    return 'Echos back the string passed as arguments.';
  }

  static execute(args, msg) {
    const { channel } = msg;
    const saying = args.join(' ');
    return channel.send(saying);
  }

}
