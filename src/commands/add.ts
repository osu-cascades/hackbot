import Command from "../library/command";
import { Message } from "discord.js";

let Add: Command;

export default Add = class {

  public static get description():string {
    return 'Adds together _integers_ passed as arguments.';
  }

  public static execute(args: string[], msg: Message) {
    const { channel } = msg;
    const numArray = args.map(n => parseInt(n));
    const total = numArray.reduce((p, c) => p + c);
    return channel.send(total);
  }

}
