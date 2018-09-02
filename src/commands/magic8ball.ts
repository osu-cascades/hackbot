import Command from '../library/command';
import { Message } from 'discord.js';

let Magic8Ball: Command;

export default Magic8Ball = class {

  public static get description():string {
    return 'Ask and you shall receive... a vague, randomly generated response.';
  }

  public static execute(args: string[], msg: Message) {
    const { channel } = msg;
    let response = [ 'It is certain',
      'It is decidedly so',
      'Without a doubt',
      'Yes definitely',
      'You may rely on it',
      'As I see it, yes',
      'Most likely',
      'Outlook good',
      'Yes',
      'Signs point to yes',
      'Reply hazy try again',
      'Ask again later',
      'Better not tell you now',
      'Cannot predict now',
      'Concentrate and ask again',
      'Don\'t count on it',
      'My reply is no',
      'My sources say no',
      'Outlook not so good',
      'Very doubtful' ];
    return channel.send(response[Math.floor(Math.random()*response.length)]);
  }

}
