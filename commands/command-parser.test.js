const CommandParser = require('./command-parser');

test('Is valid after instantiation', () => {
  const prefix = 'FAKE';
  const fakeCommandObject = 'Fake Command Object';
  const parser = new CommandParser(prefix, fakeCommandObject);
  expect(parser.prefix).toMatch(prefix);
  expect(parser.command).toBe(fakeCommandObject);
});
