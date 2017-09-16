const glob = require('glob');
const path = require('path');
const camelCase = require('lodash.camelcase');

class CommandLoader {
  constructor() {
    this.commandClasses = {};

    // All of the files in commands except _template.js
    this.getFiles = glob.sync('./commands/**/*.js').filter(file => file != './commands/_template.js');
    this.commandFiles = this.getCommandFiles(this.getFiles);
    this.loadCommandClasses();
  }

  getCommandFiles(commandFiles) {
    if (
      commandFiles === undefined ||
      commandFiles.length === 0
    ) {
      throw 'Command files could not be found';
    }
    return commandFiles;
  }

  loadCommandClasses() {
    // https://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder
    // Load all commands in the commands folder besides _template.js
    this.commandFiles.forEach(function(file) {
      let key = path.basename(file, path.extname(file));

      // Convert the kebab file names to camel case
      key = camelCase(key);
      this.commandClasses[key] = require(path.resolve(file));

    }, this);
  }
}

module.exports = CommandLoader;
