const ExampleCommand = require('../library/example-command');

describe('ExampleCommand', () => {

  var command;

  beforeEach(() => {
    command = new ExampleCommand();
  });

  test('it has a valid keyword and description', () => {
    expect(typeof command.keyword).toMatch('string');
    expect(typeof command.description).toMatch('string');
  });

  describe('execute', () => {
    test('it exists', () => {
      expect(command.execute).toBeDefined();
    });
    test('it raises an exception when not passed an array', () => {
      let invalidArguments = [null, undefined, 42, '', 'fake'];
        expect(() => {
          invalidArguments.map(arg => command.execute(arg));
        }).toThrow('Arguments must be an array');
    });
  });

});
