import glob from 'glob';
import config from '../config';
import CommandLoader, { ICommandClasses } from './commandLoader';
import Command from './iCommand';

export const COMMANDS_PATH_GLOB = './src/commands/*.ts';

// TODO: debateable whether we even need this wrapper class
/**
 * @class Commands
 */
export default class Commands {

  public readonly all: ICommandClasses;
  private commandFiles: string[];

  constructor() {
    this.commandFiles = glob.sync(COMMANDS_PATH_GLOB);
    this.all = CommandLoader.getCommandClasses(this.commandFiles);
  }

  get names() {
    return Object.keys(this.all);
  }

  public get(commandName: string): Command {
    return this.all[commandName];
  }

  public longestName() {
    // Find the longest synopsis
    return this.names.reduce((max, commandName) => {
      commandName = `${config.messagePrefix}${commandName}`;
      if (commandName.length + 1 > max) {
        max = commandName.length + 1;
      }
      return max;
    }, 0);
  }

}
