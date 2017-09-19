const CommandLoader = require('../library/command-loader');
const glob = require('glob');

describe('CommandLoader', () => {
  let commandLoader;
  beforeEach(() => {
    commandLoader = new CommandLoader(glob.sync('./commands/**/*.js').filter(file => file != './commands/_template.js'));
  });
  const expected = [ expect.stringMatching(/\.\/commands\/\w*\.js/) ];

  context('Gets all files from command directory', () => {
    test('it should return an array of command classes', () => {
      expect(commandLoader.getCommandFiles())
        .toEqual(expect.arrayContaining(expected));
    });
  });

  context('Return type should be an object', () => {
    test('it should return an object', () => {
      expect(commandLoader.loadCommandClasses()).toMatchObject({});
    });
  });
});
