import CommandContext from '@/library/commandContext';
import ICommand from '@/library/interfaces/iCommand';

let Rules: ICommand;

export default Rules = class {

  /* istanbul ignore next */
  static get description(): string {
    return 'List the rules for the CTC Discord server.';
  }

  public static execute({ msg }: CommandContext) {
    return msg.channel.send("Be nice and don't copy each other's homework!");
  }

};
