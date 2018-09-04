import CommandParser from '../src/library/command-parser';
import context from 'jest-plugin-context';
import { Message, Channel, Client, TextChannel, Guild } from 'discord.js';

describe('CommandParser', () => {
  const messagePrefix = 'FAKE';
  let parser: CommandParser;

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
        const thrown = 'Prefix must be a non-empty string';
        expect(() => new CommandParser('')).toThrow(thrown);
        expect(() => new CommandParser('\n  \n\tg')).toThrow(thrown);
      });
    });
  });

  describe('Parsing messages', () => {

    context('When the message content is not prefixed', () => {
      test('it returns undefined', () => {
        expect(parser.parse('An ignorable message')).toEqual(false);
      });
    });
    context('When the message content is prefixed', () => {
      context('and the content has many space-separated words', () => {
        test('it returns a command and the words as an array of arguments', () => {
          let expectedObject = {
            commandName: 'cmd',
            args: ['fee', 'fi', 'fo', 'funk']
          }
          expect(parser.parse(`${messagePrefix}cmd fee fi fo funk`)).toMatchObject(expectedObject);
        });
      });
      context('and the content has no additional words', () => {
        test('it returns a command and an empty arguments array', () => {
          let expectedObject = {
            commandName: 'cmd',
            args: []
          }
          expect(parser.parse(`${messagePrefix}cmd`)).toMatchObject(expectedObject);
        });
      });
      context('but the message content only contains the prefix', () => {
        test('it returns undefined', () => {
          expect(parser.parse(messagePrefix)).toEqual(false);
        });
      });
    });
  });
});
