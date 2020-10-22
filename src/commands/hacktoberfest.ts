import ICommand from '@/library/interfaces/iCommand';
import { Message } from 'discord.js';

// Hack for implementing with static properties/methods
let Hacktoberfest: ICommand;
export default Hacktoberfest = class {

  static get description(): string {
    return 'Lists information on how to participate in Hacktoberfest 2020';
  }

  public static execute(args: string[], msg: Message) {
    const content = "Hacktoberfest has officially begun! Find out more information at\nhttps://hacktoberfest.digitalocean.com\nand stay tuned for opportunities and workshops from tech club members.";
    return msg.channel.send(content);
  }

};
