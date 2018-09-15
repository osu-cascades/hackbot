import { Client, Message } from 'discord.js';
import glob from 'glob';
import Command from './command';
import CommandLoader, { ICommandClasses } from './command-loader';

/**
 * @class Commands
 */
export default class Commands {

  private commandFiles: string[];
  private readonly all: ICommandClasses;

  constructor() {
    this.commandFiles = glob.sync('./src/commands/**/*.ts');
    this.all = CommandLoader.getCommandClasses(this.commandFiles);
  }

  get names() {
    return Object.keys(this.all);
  }

  public has(commandName: string) {
    return this.names.indexOf(commandName) > -1;
  }

  public get(commandName: string): Command {
    return this.all[commandName];
  }

  public run(commandName: string, args: string[], msg: Message, client: Client) {
    this.get(commandName).execute(args, msg, client);
  }

}
