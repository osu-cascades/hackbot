import CommandContext from '@/library/commandContext';
import ICommand from '@/library/interfaces/iCommand';

let Say: ICommand;

export default Say = class {

  /* istanbul ignore next */
  public static get description(): string {
    return 'Echos back the string passed as arguments.';
  }

  public static execute({ args, msg }: CommandContext) {
    const saying = args.join(' ');
    return msg.channel.send(saying);
  }

};
