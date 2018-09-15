import { Message } from 'discord.js';
import Command from '../library/command';

let Lmgtfy: Command;

export default Lmgtfy = class {

  static get description(): string {
    return 'When someone is being...lazy...?';
  }

  public static execute(args: string[], msg: Message) {
    const { channel } = msg;
    return channel.send(`<http://lmgtfy.com/?q=${args.join('+')}>`);
  }

};
