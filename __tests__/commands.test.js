const Commands = require('../library/commands');

describe('Commands', () => {
  let commands = new Commands();
  // TODO: These should surely be in their own mock file that can be reused.
  //  I'm just not sure of best practice yet in Jest.
  // Edit: it may be best that each command handle this in its own tests.
  let mockData = {
    args: ['hello', 'world'],
    msg: {}
  };

  context('All commands are valid and properly extend Command class', () => {
    
    // This is a gimme due to how JS works, but can be overridden
    test('Commands have a name', () => {
      commands.names.forEach((commandName) => {
        expect(typeof commands.get(commandName).name).toMatch('string');
      });
    });

    // "Interface" Implementation Validation
    test('Commands implement a description', () => {
      commands.names.forEach((commandName) => {
        expect(() => {
          commands.get(commandName).description;
        }).not.toThrow();
      });
    });

    test('Commands implement execute', () => {
      commands.names.forEach((commandName) => {
        // Todo, check that execute is implemented on the Command class and not just inherited
        //  I would prefer to go for a reflection'esk way instead of directly calling execute, 
        //  because that testing should be left up to the command's own tests to call itself.
      });
    });

  });

});