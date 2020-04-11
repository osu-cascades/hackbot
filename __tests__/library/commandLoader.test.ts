import glob from 'glob';
import CommandLoader, { ICommandClasses } from '../../src/library/commandLoader';
import config from '../../src/config';

describe('CommandLoader', () => {
  let commandClasses: ICommandClasses;
  const files = glob.sync(config.commandsPathGlob);

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
