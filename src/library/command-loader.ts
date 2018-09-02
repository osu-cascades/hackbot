import path from 'path';
import camelCase from 'lodash.camelcase';

export default class CommandLoader {

  static _removeTemplateFile(files: string[]) {
    return files.filter(file => file != './commands/_template.js');
  }
  static getCommandClasses(commandClassFiles: string[]) {
    /**
     * https://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder
     * Load all commands in the commands folder besides _template.js
     */
    let files = CommandLoader._removeTemplateFile(commandClassFiles);
    return files.reduce((prev: {[index: string]: string}, file) => {
      let key = path.basename(file, path.extname(file));

      // Convert the kebab file names to camel case
      key = camelCase(key);
      prev[key] = require(path.resolve(file));
      return prev;
    }, {});
  }
}
