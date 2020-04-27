import CommandContext from '@/library/commandContext';
import ICommand from '@/library/interfaces/iCommand';

// Hack for implementing with static properties/methods
let CommandName: ICommand;
export default CommandName = class {

  /* istanbul ignore next */
  static get description(): string {
    return 'This is a description of my awesome command.';
  }

  public static execute({ args, msg, client, commands }: CommandContext) {
    // msg Class Info: https://discord.js.org/#/docs/main/stable/class/Message
    throw new Error(`Not Yet Implemented ${msg}`);
  }

};
