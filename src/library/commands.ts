import CommandLoader from './command-loader';
import glob from 'glob';

let instance;

/**
 * @class Commands
 */
export default class Commands {
  constructor(forceReload = false) {
    if (!instance || forceReload) {
      instance = this;
      this.commandFiles = glob.sync('./commands/**/*.js');
      this._all = CommandLoader.getCommandClasses(this.commandFiles);
    }
    return instance;
  }

  get all() {
    return this._all;
  }

  get names() {
    return Object.keys(this.all);
  }

  has(commandName) {
    return this.names.indexOf(commandName) > -1;
  }

  get(commandName) {
    return this.all[commandName];
  }

  run(commandName, args, msg, client) {
    this.get(commandName).execute(args, msg, client);
  }

}
