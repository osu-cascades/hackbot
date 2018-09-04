import CommandLoader, { CommandClasses } from './command-loader';
import glob from 'glob';
import Command from './command';
import { Message, Client } from 'discord.js';

/**
 * @class Commands
 */
export default class Commands {

  commandFiles: string[];
  private _all: CommandClasses;

  constructor() {
    this.commandFiles = glob.sync('./src/commands/**/*.ts');
    this._all = CommandLoader.getCommandClasses(this.commandFiles);
  }

  get all() {
    return this._all;
  }

  get names() {
    return Object.keys(this.all);
  }

  has(commandName: string) {
    return this.names.indexOf(commandName) > -1;
  }

  get(commandName: string): Command {
    return this.all[commandName];
  }

  run(commandName: string, args: string[], msg: Message, client: Client) {
    this.get(commandName).execute(args, msg, client);
  }

}
