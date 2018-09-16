import { Message } from 'discord.js';
import ICommand from '../library/iCommand';

let Source: ICommand;

export default Source = class {

  static get description(): string {
    return "Retrieves the hackBot's github repository.";
  }

  public static execute(args: string[], msg: Message) {
    return msg.channel.send('Hack me at https://github.com/osu-cascades/hackbot');
  }

};
