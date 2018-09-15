import { Message } from 'discord.js';
import Command from '../library/command';

let Rules: Command;

export default Rules = class {

  static get description(): string {
    return 'List the rules for the CTC Discord server.';
  }

  public static execute(args: string[], msg: Message) {
    const { channel } = msg;
    return channel.send("Be nice and don't copy each other's homework!");
  }

};
