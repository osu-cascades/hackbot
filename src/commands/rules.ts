import Command from '../library/command';
import { Message } from 'discord.js';

let Rules: Command;

export default Rules = class {

  static get description():string {
    return 'List the rules for the CTC Discord server.';
  }

  static execute(args: string[], msg: Message) {
    const { channel } = msg;
    return channel.send("Be nice and don't copy each other's homework!");
  }

}
