const path = require('path');
const glob = require('glob');
const camelCase = require('lodash.camelcase');

class CommandLoader {
  constructor(commandClassFiles) {
    this.commandClasses = {};
    this.commandClassFiles = commandClassFiles;
    this.loadCommandClasses();
  }

  getCommandFiles() {
    return this.commandClassFiles;
  }

  loadCommandClasses() {
    /**
     * https://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder
     * Load all commands in the commands folder besides _template.js
     */
    this.getCommandFiles().forEach(function(file) {
      let key = path.basename(file, path.extname(file));

      // Convert the kebab file names to camel case
      key = camelCase(key);
      this.commandClasses[key] = require(path.resolve(file));
    }, this);
    return this.commandClasses;
  }
}

module.exports = CommandLoader;
