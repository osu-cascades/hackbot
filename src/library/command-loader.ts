import path from 'path';
import camelCase from 'lodash.camelcase';
import Command from './command';

export type CommandClasses = { [key: string]: Command };

export default class CommandLoader {

  static _removeTemplateFile(files: string[]) {
    return files.filter(file => file != './src/commands/_template.ts');
  }
  static getCommandClasses(commandClassFiles: string[]): CommandClasses {
    /**
     * https://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder
     * Load all commands in the commands folder besides _template.js
     */
    let files = CommandLoader._removeTemplateFile(commandClassFiles);
    return files.reduce((prev: CommandClasses, file) => {
      let key = path.basename(file, path.extname(file));
      // Convert the kebab file names to camel case
      key = camelCase(key);

      let required = require(path.resolve(file));
      if (required.default) {
        prev[key] = required.default;
      }

      return prev;
    }, {});
  }
}
