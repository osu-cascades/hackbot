import CommandLoader, { CommandClasses } from '../../src/library/command-loader';
import glob from 'glob';

describe('CommandLoader', () => {
  let commandClasses: CommandClasses;
  const expected = [ expect.stringMatching(/\.\/src\/commands\/\w*\.ts/) ];
  let files = glob.sync('./src/commands/**/*.ts');
  const templateFile = './src/commands/_template.ts';

  beforeEach(() => {
    commandClasses = CommandLoader.getCommandClasses(files);
  });

  describe('Gets all files from command directory', () => {
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

  describe('Return type should be an object', () => {
    test('it should return an object', () => {
      expect(commandClasses).toMatchObject({});
    });
  });

  describe('Class names match their file names', () => {
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
