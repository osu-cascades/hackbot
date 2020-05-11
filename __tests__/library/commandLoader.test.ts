import CommandLoader, { ICommandClasses } from '@/library/commandLoader';
import glob from 'glob';

describe('CommandLoader', () => {
  let commandClasses: ICommandClasses;
  const commandsPathGlob = './src/commands/*.ts';
  const files = glob.sync(commandsPathGlob);

  beforeEach(() => {
    commandClasses = CommandLoader.getCommandClasses(files);
  });

  describe('Return type should be an object', () => {
    test('it should return an object', () => {
      expect(commandClasses).toMatchObject({});
    });
  });

  // More of an integration test against real commands
  describe('Class names match their file names', () => {
    test('they match their key name', () => {
      for (let commandName of Object.keys(commandClasses)) {
        const commandClass = commandClasses[commandName];
        // Capitalize first character
        commandName = commandName.replace(/^\w/, (char) => {
          return char.toUpperCase();
        });
        expect(commandClass).toBeDefined();
        expect(commandName).toEqual(commandClass.name);
      }
    });
  });
});
