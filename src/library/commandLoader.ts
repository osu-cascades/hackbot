import camelCase from 'lodash.camelcase';
import path from 'path';
import Command from './iCommand';

export interface ICommandClasses { [key: string]: Command; }

export default class CommandLoader {

  public static getCommandClasses(commandClassFiles: string[]): ICommandClasses {
    /**
     * https://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder
     * Load all commands in the commands folder besides _template.js
     */
    const files = CommandLoader.removeTemplateFile(commandClassFiles);
    return files.reduce((prev: ICommandClasses, file) => {
      let key = path.basename(file, path.extname(file));
      // Convert the kebab file names to camel case
      key = camelCase(key);

      const required = require(path.resolve(file));
      prev[key] = required.default;

      return prev;
    }, {});
  }

  private static removeTemplateFile(files: string[]) {
    return files.filter(file => file !== './src/commands/_template.ts');
  }
}
