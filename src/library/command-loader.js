const path = require('path');
const camelCase = require('lodash.camelcase');

class CommandLoader {

  static _removeTemplateFile(files) {
    return files.filter(file => file != './commands/_template.js');
  }
  static getCommandClasses(commandClassFiles) {
    /**
     * https://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder
     * Load all commands in the commands folder besides _template.js
     */
    let files = CommandLoader._removeTemplateFile(commandClassFiles);
    return files.reduce((prev, file) => {
      let key = path.basename(file, path.extname(file));

      // Convert the kebab file names to camel case
      key = camelCase(key);
      prev[key] = require(path.resolve(file));
      return prev;
    }, {});
  }
}

module.exports = CommandLoader;
