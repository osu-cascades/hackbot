const CommandBase = require('../library/command-base');

describe('CommandBase', () => {

  const fakeKeyword = 'fake';
  const fakeDescription = 'A fake description of the command';
  var command;

  beforeEach(() => {
    command = new CommandBase(fakeKeyword, fakeDescription);
  });

  describe('Instantiation', () => {
    context('With a keyword and description', () => {
      test('it is valid', () => {
        expect(command.keyword).toMatch(fakeKeyword);
        expect(command.description).toMatch(fakeDescription);
      });
    });
    context('With an invalid keyword', () => {
      test('it throws an exception', () => {
        let invalidKeywords = [null, undefined, 42, '', '\n  \n\tg'];
        expect(() => {
          invalidKeywords.map(keyword => new CommandBase(keyword, fakeDescription));
        }).toThrow('Keyword must be a non-empty string');
      });
    });
    context('With an invalid description', () => {
      test('it throws an exception', () => {
        let invalidDescriptions = [null, undefined, 42, '', '\n  \n\tg'];
        expect(() => {
          invalidDescriptions.map(description => new CommandBase(fakeKeyword, description));
        }).toThrow('Description must be a non-empty string');
      });
    });
  });

});
