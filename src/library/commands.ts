import glob from 'glob';
import Command from './command';
import CommandLoader, { ICommandClasses } from './command-loader';

// TODO: debateable whether we even need this wrapper class
/**
 * @class Commands
 */
export default class Commands {

  public readonly all: ICommandClasses;
  private commandFiles: string[];

  constructor() {
    this.commandFiles = glob.sync('./src/commands/**/*.ts');
    this.all = CommandLoader.getCommandClasses(this.commandFiles);
  }

  get names() {
    return Object.keys(this.all);
  }

  public get(commandName: string): Command {
    return this.all[commandName];
  }

}
