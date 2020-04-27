import CommandContext from '@/library/commandContext';
import ICommand from '@/library/interfaces/iCommand';

let Source: ICommand;

export default Source = class {

  /* istanbul ignore next */
  static get description(): string {
    return "Retrieves the hackBot's github repository.";
  }

  public static execute({ msg }: CommandContext) {
    return msg.channel.send('Hack me at https://github.com/osu-cascades/hackbot');
  }

};
