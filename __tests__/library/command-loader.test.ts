import glob from 'glob';
import CommandLoader, { ICommandClasses } from '../../src/library/command-loader';

describe('CommandLoader', () => {
  let commandClasses: ICommandClasses;
  const expected = [ expect.stringMatching(/\.\/src\/commands\/\w*\.ts/) ];
  const files = glob.sync('./src/commands/**/*.ts');
  const templateFile = './src/commands/_template.ts';

  beforeEach(() => {
    commandClasses = CommandLoader.getCommandClasses(files);
  });

  describe('Return type should be an object', () => {
    test('it should return an object', () => {
      expect(commandClasses).toMatchObject({});
    });
  });

  describe('Class names match their file names', () => {
    test('they match their key name', () => {
      for (let commandName of Object.keys(commandClasses)) {
        const commandClass = commandClasses[commandName];
        // Capitalize first character
        commandName = commandName.replace(/^\w/, (char) => {
          return char.toUpperCase();
        });
        expect(commandName).toEqual(commandClass.name);
      }
    });
  });
});
