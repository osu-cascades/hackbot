import Command from '../library/command';
import { Message } from 'discord.js';

let CommandName: Command;
export default CommandName = class {

  public static get description():string {
    return 'This is a description of my awesome command.';
  }

  public static execute(args: string[], msg: Message) {
    // msg Class Info: https://discord.js.org/#/docs/main/stable/class/Message
    throw `Not Yet Implemented ${msg}`;
  }

}
