import Format from '@/commands/format';

import { message as mockMessage, MockedMessage } from '../mocks/discord';

let sendMock: MockedMessage;
beforeEach(() => {
  sendMock = jest.fn();
  mockMessage.channel.send = sendMock;
});

describe('Format Command', () => {
  test('provides code formatting tip', () => {
    Format.execute([], mockMessage);
    expect(sendMock.mock.calls[0][0]).toContain(
      'To format code snippets on discord, use triple-backticks and a language name.\n' +
        'For example:\n' +
        '\\```dart\nvoid function(type argument) {\n\treturn values;\n}\n\\```\n' +
        'Becomes:\n' +
        '```dart\nvoid function(type argument) {\n  return values;\n}```'
    );
  });
});
