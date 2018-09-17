import { Message } from 'discord.js';
import ICommand from '../library/iCommand';

let Rules: ICommand;

export default Rules = class {

  /* istanbul ignore next */
  static get description(): string {
    return 'List the rules for the CTC Discord server.';
  }

  public static execute(args: string[], msg: Message) {
    const { channel } = msg;
    return channel.send("Be nice and don't copy each other's homework!");
  }

};
