import Command from '../library/command';

/**
 * @class CommandName
 * @extends {Command}
 */

export default class CommandName extends Command {

  static get description() {
    return 'This is a description of my awesome command.';
  }

  static execute(args, msg) {
    // msg Class Info: https://discord.js.org/#/docs/main/stable/class/Message
    throw `Not Yet Implemented ${msg}`;
  }

}
