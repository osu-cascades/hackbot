import CommandLoader from '../src/library/command-loader';
import glob from 'glob';
import context from 'jest-plugin-context';

describe('CommandLoader', () => {
  let commandClasses: {[key: string]: {name: string}};
  const expected = [ expect.stringMatching(/\.\/commands\/\w*\.js/) ];
  let files = glob.sync('./commands/**/*.js');
  const templateFile = './commands/_template.js';

  beforeEach(() => {
    commandClasses = CommandLoader.getCommandClasses(files);
  });

  context('Gets all files from command directory', () => {
    let commandFiles = CommandLoader._removeTemplateFile(files);
    test('it should return an array of command classes', () => {
      expect(commandFiles)
        .toEqual(expect.arrayContaining(expected));
    });
    test('it should have a template file', () => {
      expect(files)
        .toEqual(expect.arrayContaining([templateFile]));
    });
    test('it should filter the template file', () => {
      expect(commandFiles)
        .not.toEqual(expect.arrayContaining([templateFile]));
    });
  });

  context('Return type should be an object', () => {
    test('it should return an object', () => {
      expect(commandClasses).toMatchObject({});
    });
  });

  context('Class names match their file names', () => {
    test('they match their key name', () => {
      for (let commandName in commandClasses) {
        let commandClass = commandClasses[commandName];
        // Capitalize first character
        commandName = commandName.replace(/^\w/, (char) => {
          return char.toUpperCase();
        });
        expect(commandName).toEqual(commandClass.name);
      }
    });
  });
});
