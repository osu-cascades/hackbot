const CommandParser = require('./command-parser');

describe('CommandParser', () => {

  const messagePrefix = 'FAKE';
  var parser;

  beforeEach(() => {
    parser = new CommandParser(messagePrefix)
  });

  test('Is valid after instantiation', () => {
    expect(parser.prefix).toMatch(messagePrefix);
  });
  describe('Parsing messages', () => {
    context('When the message is undefined', () => {
      test('It returns undefined', () => {
        expect(parser.parse(undefined)).toBeUndefined();
      });
    });
    context('When the message is null', () => {
      test('It returns undefined', () => {
        expect(parser.parse(null)).toBeUndefined();
      });
    });
    context('When the message is not something with a content property', () => {
      test('It returns undefined', () => {
        expect(parser.parse({ fake: 'fake' })).toBeUndefined();
      });
    });
    context('When the message content is not a String', () => {
      test('It returns undefined', () => {
        expect(parser.parse({ content: null })).toBeUndefined();
        expect(parser.parse({ content: undefined })).toBeUndefined();
        expect(parser.parse({ content: 42 })).toBeUndefined();
      });
    });
    context('When the message content is not prefixed', () => {
      test('It returns undefined', () => {
        expect(parser.parse({ content: 'An ignorable message' })).toBeUndefined();
      });
    });
    context('When the message content is prefixed', () => {
      test('It returns a command and its arguments', () => {
        expect(parser.parse({ content: `${messagePrefix}cmd` })).toMatchObject(['cmd', []]);
      });
    });
  });
});
