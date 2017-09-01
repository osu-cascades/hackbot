const CommandParser = require('./command-parser');

test('Is valid after instantiation', () => {
  const prefix = 'FAKE';
  const parser = new CommandParser(prefix);
  expect(parser.prefix).toMatch(prefix);
});
describe('Parsing messages', () => {
  context('When the message is undefined', () => {
    test('It returns undefined', () => {
      const parser = new CommandParser('FAKE');
      expect(parser.parse(undefined)).toBeUndefined();
    });
  });
  context('When the message is null', () => {
    test('It returns undefined', () => {
      const parser = new CommandParser('FAKE');
      expect(parser.parse(null)).toBeUndefined();
    });
  });
  context('When the message is not something with a content property', () => {
    test('It returns undefined', () => {
      const parser = new CommandParser('FAKE');
      expect(parser.parse({ fake: 'fake' })).toBeUndefined();
    });
  });
  context('When the message content is not prefixed', () => {
    test('It returns undefined', () => {
      const prefix = 'FAKE';
      const parser = new CommandParser(prefix);
      expect(parser.parse({ content: 'An ignorable message' })).toBeUndefined();
    });
  });
  context('When the message content is prefixed', () => {
    test('It returns a command and its arguments', () => {
      const prefix = 'FAKE';
      const parser = new CommandParser(prefix);
      expect(parser.parse({ content: `${prefix}cmd` })).toMatchObject(['cmd', []]);
    });
  });
});
