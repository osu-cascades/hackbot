const CommandLoader = require('./command-loader');
const glob = require('glob');

let instance;

/**
 * @class Commands
 */
class Commands {
  constructor(forceReload = false) {
    if (!instance || forceReload) {
      instance = this;
      this.commandLoader = new CommandLoader(glob.sync('./commands/**/*.js').filter(file => file != './commands/_template.js'));
      this._all = this.commandLoader.commandClasses;
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

  run(commandName, args, msg) {
    this.get(commandName).execute(args, msg);
  }

}

module.exports = Commands;
