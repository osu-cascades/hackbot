import { Message } from 'discord.js';
import ICommand from '../library/iCommand';

let Lmgtfy: ICommand;

export default Lmgtfy = class {

  /* istanbul ignore next */
  static get description(): string {
    return 'When someone is being...lazy...?';
  }

  public static execute(args: string[], msg: Message) {
    const { channel } = msg;
    return channel.send(`<http://lmgtfy.com/?q=${args.join('+')}>`);
  }

};
