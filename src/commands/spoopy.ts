import { Message } from 'discord.js';
import ICommand from '../library/iCommand';

// Hack for implementing with static properties/methods
let Spoopy: ICommand;
export default Spoopy = class {

  /* istanbul ignore next */
  static get description(): string {
    return 'Puts the Spoop™ into 2019.';
  }

  public static execute(args: string[], msg: Message) {
    // msg Class Info: https://discord.js.org/#/docs/main/stable/class/Message
    const channel = msg.channel;
    const spoopyImage = 'https://external-preview.redd.it/2bR53T9TPQNqc2mdSsDSPgtJQVJe9bcRJHDOusXLi6E.jpg?auto=webp&s=83775d0d57933418ef5e18b39a4cd9556a10e8a8';
    channel.sendMessage(spoopyImage);
  }

};
