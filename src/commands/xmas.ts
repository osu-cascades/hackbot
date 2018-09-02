import Command from '../library/command';
import { Message } from 'discord.js';

let Xmas: Command;

export default Xmas = class {

  static get description():string {
    return 'Merry Christmas, ya filthy animals.';
  }

  static execute(args: string[], msg: Message) {
    const { channel } = msg;
    const randomImage = 'https://giphy.com/gifs/foxhomeent-3o7TKLHb0PWRNnoVq0';
    channel.send(randomImage);
  }

}
