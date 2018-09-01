import Command from '../library/command';

/**
 * @class Add
 * @extends {Command}
 */

var Add: Command;

export default Add = class Add {

  public static get description():string {
    return 'Adds together _integers_ passed as arguments.';
  }

  public static execute(args: string[], msg: string) {
    const { channel } = msg;
    if (args.length < 1) { return channel.send(this.argsErrorMessage); }
    const numArray = args.map(n => parseInt(n));
    const total = numArray.reduce((p, c) => p + c);
    return channel.send(total);
  }

}
