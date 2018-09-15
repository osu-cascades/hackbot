import { Message } from 'discord.js';
import Command from '../library/command';

let Say: Command;

export default Say = class {

  public static get description(): string {
    return 'Echos back the string passed as arguments.';
  }

  public static execute(args: string[], msg: Message) {
    const { channel } = msg;
    const saying = args.join(' ');
    return channel.send(saying);
  }

};
