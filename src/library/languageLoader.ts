import camelCase from 'lodash.camelcase';
import path from 'path';
import Runner from './interfaces/iRunner';

export interface ILanguageRunners { [key: string]: Runner; }

export default class LanguageLoader {
    public static getLanguageClasses(commandClassFiles: string[]): ILanguageRunners {
        /**
         * https://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder
         * Load all commands in the commands folder besides _template.js
         */
        const files = LanguageLoader.removeTemplateFile(commandClassFiles);
        return files.reduce((prev: ILanguageRunners, file) => {
            let key = path.basename(file, path.extname(file));
            // Convert the kebab file names to camel case
            key = camelCase(key);

            const required = require(path.resolve(file));
            prev[key] = required.default;

            return prev;
        }, {});
    }

    private static removeTemplateFile(files: string[]) {
        const commandTemplateFile = './src/runners/_template.ts';
        return files.filter(file => file !== commandTemplateFile);
    }
}
