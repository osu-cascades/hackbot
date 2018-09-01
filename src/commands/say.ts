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
    if (args.length < 1) { return channel.send(this.argsErrorMessage); }
    const saying = args.join(' ');
    return channel.send(saying);
  }

}
