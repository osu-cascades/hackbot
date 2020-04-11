import { ICommandClasses } from './commandLoader';
import Command from './iCommand';

// TODO: debateable whether we even need this wrapper class
/**
 * @class Commands
 */
export default class Commands {
  public readonly all: ICommandClasses;

  constructor(commandClasses: ICommandClasses) {
    this.all = commandClasses;
  }

  get names() {
    return Object.keys(this.all);
  }

  public get(commandName: string): Command {
    return this.all[commandName];
  }

  public longestNameLength() {
    // Find the longest synopsis
    const longest = this.names.sort((a, b) => b.length - a.length)[0];
    return longest.length;
  }

}
