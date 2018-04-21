const CommandLoader = require('../library/command-loader');
const glob = require('glob');

describe('CommandLoader', () => {
  let commandClasses;
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
});
