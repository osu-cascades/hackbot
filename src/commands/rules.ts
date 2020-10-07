import ICommand from '@/library/interfaces/iCommand';
import { Message } from 'discord.js';

let Rules: ICommand;

export default Rules = class {

  /* istanbul ignore next */
  static get description(): string {
    return 'List the rules for the CTC Discord server.';
  }

  public static execute(args: string[], msg: Message) {
    return msg.channel.send("Be nice and don't copy each other's homework!");
  }

};
