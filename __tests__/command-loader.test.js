const CommandLoader = require('../library/command-loader');

describe('CommandLoader', () => {
  let commandLoader;
  beforeEach(() => {
    commandLoader = new CommandLoader();
  });
  const expected = [ expect.stringMatching(/\.\/commands\/\w*\.js/) ];

  context('Gets all files from command directory', () => {
    test('it should return an array of command files', () => {
      let fakeFiles = ['./commands/fake.js'];
      expect(commandLoader.getCommandFiles(fakeFiles))
        .toEqual(expect.arrayContaining(expected));
    });
  });

  context('Command directory empty or undefined', () => {
    test('it should throw an error if array is empty or undefined', () => {
      let fakeFiles = [[], undefined];
      expect(() =>
        fakeFiles.map(fakeFiles => commandLoader.getCommandFiles(fakeFiles)))
        .toThrow('Command files could not be found');
    });
  });

  context('commandClasses object has data', () => {
    test('it should be an object with length greater than zero', () => {
      expect(Object.keys(commandLoader.commandClasses).length).toBeGreaterThan(0);
    });
  });

  // TODO: check filenames match class names, maybe there's a way to check the export, or just call a `.name` on the class.

});
