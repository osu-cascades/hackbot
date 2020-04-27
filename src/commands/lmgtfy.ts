import CommandContext from '@/library/commandContext';
import ICommand from '@/library/interfaces/iCommand';

let Lmgtfy: ICommand;

export default Lmgtfy = class {

  static get description(): string {
    return 'When someone is being...lazy...?';
  }

  public static execute({ args, msg }: CommandContext) {
    return msg.channel.send(`<http://lmgtfy.com/?q=${args.join('+')}>`);
  }

};
