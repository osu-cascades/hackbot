const CommandParser = require('./command-parser');

test('Is valid after instantiation', () => {
  const prefix = 'FAKE';
  const parser = new CommandParser(prefix);
  expect(parser.prefix).toMatch(prefix);
});
