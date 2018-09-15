import { Message } from 'discord.js';
import Command from '../library/command';

let Source: Command;

export default Source = class {

  static get description(): string {
    return "Retrieves the hackBot's github repository.";
  }

  public static execute(args: string[], msg: Message) {
    return msg.channel.send('Hack me at https://github.com/osu-cascades/hackbot');
  }

};
