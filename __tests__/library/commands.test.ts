import Commands from '../../src/library/commands';

describe('Commands', () => {
  let commands = new Commands();

  describe('All commands are valid and properly extend Command class', () => {
    const commandNames = commands.names;

    // This is a gimme due to how JS works, but can be overridden
    test('Commands have a name', () => {
      commandNames.forEach((commandName) => {
        expect(typeof commands.get(commandName).name).toMatch('string');
      });
    });

    // "Interface" Implementation Validation
    test('Commands implement a description', () => {
      commandNames.forEach((commandName) => {
        expect(() => {
          commands.get(commandName).description;
        }).not.toThrow();
      });
    });

    test('Commands implement execute', () => {
      commandNames.forEach((commandName) => {
        let command = commands.get(commandName);
        expect(Object.getOwnPropertyNames(command))
          .toEqual(expect.arrayContaining(['execute']));
      });
    });

    describe('Commands are implemented properly', () => {
      test('they have description, execute, and name properties', () => {
        let allCommands = commands.all;
        for (let commandName in allCommands) {
          let commandClass = allCommands[commandName];
          expect(Object.getOwnPropertyNames(commandClass))
            .toEqual(expect.arrayContaining(['description', 'execute', 'name']));
        }
      });
    });

  });

});
