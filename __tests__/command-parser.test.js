const CommandParser = require('../commands/command-parser');

describe('CommandParser', () => {
  const messagePrefix = 'FAKE';
  var parser;

  beforeEach(() => {
    parser = new CommandParser(messagePrefix);
  });

  describe('Instantiation', () => {
    context('With a valid prefix', () => {
      test('it is valid', () => {
        expect(parser.prefix).toMatch(messagePrefix);
      });
    });
    context('With an invalid prefix', () => {
      test('it throws an exception', () => {
        prefixes = [null, undefined, 42, '', '\n  \n\tg'];
        expect(() => {
          prefixes.map(prefix => new CommandParser(prefix));
        }).toThrow('Prefix must be a non-empty string');
      });
    });
  });

  describe('Parsing messages', () => {
    context('When the message is undefined', () => {
      test('it returns undefined', () => {
        expect(parser.parse(undefined)).toBeUndefined();
      });
    });
    context('When the message is null', () => {
      test('it returns undefined', () => {
        expect(parser.parse(null)).toBeUndefined();
      });
    });
    context('When the message is not something with a content property', () => {
      test('it returns undefined', () => {
        expect(parser.parse({ fake: 'fake' })).toBeUndefined();
      });
    });
    context('When the message content is not a String', () => {
      test('it returns undefined', () => {
        const msg = [{ content: null }, { content: undefined }, { content: 42 }];
        msg.map(msg => expect(parser.parse(msg)).toBeUndefined());
      });
    });
    context('When the message content is not prefixed', () => {
      test('it returns undefined', () => {
        expect(parser.parse({ content: 'An ignorable message' })).toBeUndefined();
      });
    });
    context('When the message content is prefixed', () => {
      context('and the content has many space-separated words', () => {
        test('it returns a command and the words as an array of arguments', () => {
          expect(parser.parse({ content: `${messagePrefix}cmd fee fi fo funk` })).toMatchObject(['cmd', ['fee', 'fi', 'fo', 'funk']]);
        });
      });
      context('and the content has no additional words', () => {
        test('it returns a command and an empty arguments array', () => {
          expect(parser.parse({ content: `${messagePrefix}cmd` })).toMatchObject(['cmd', []]);
        });
      });
      context('but the message content only contains the prefix', () => {
        test('it returns undefined', () => {
          expect(parser.parse({ content: 'FAKE' })).toBeUndefined();
        });
      });
    });
  });
});
