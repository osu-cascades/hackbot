const glob = require('glob');
const path = require('path');

class CommandLoader {

  constructor() {
    this.commandClasses = [];
    this.commandFiles = this.getCommandFiles();
    
    this.loadCommandClasses();
    console.log(`COMMANDS: ${this.collectCommands()}`);
  }

  getCommandFiles() {
    // All of the files in commands except _template.js
    return glob.sync('./commands/**/*.js').filter(file => file == './commands/core.js');
    //return glob.sync('./commands/**/*.js').filter(file => file != './commands/_template.js');
  }

  loadCommandClasses() {
    // https://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder
    // Load all commands in the commands folder besides _template.js
    // +(!(_template)|*)
    this.commandFiles.forEach(function(file) {
      let key = path.basename(file, path.extname(file));
      this.commandClasses[key] = require(path.resolve(file));
    }, this);
  }

  getCommands(commandClass) {
    return this.commandClasses[commandClass].commands();
  }

  collectCommands() {
    return Object.keys(this.commandClasses)
      .map(commands => this.getCommands(commands));
  }

}

module.exports = CommandLoader;
