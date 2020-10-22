import ICommand from "@/library/interfaces/iCommand";
import { Message } from "discord.js";

let Add: ICommand;

export default Add = class {

  /* istanbul ignore next */
  static get description(): string {
    return 'Adds together _integers_ passed as arguments.';
  }

  public static execute(args: string[], msg: Message) {
    const { channel } = msg;
    const numArray = args.map(n => parseInt(n));
    const total = numArray.reduce((p, c) => p + c);
    return channel.send(total);
  }

};
