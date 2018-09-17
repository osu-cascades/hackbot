import Say from '../../src/commands/say';

import { message as mockMessage } from '../mocks/discord';

let sendMock;
beforeEach(() => {
  sendMock = jest.fn();
  mockMessage.channel.send = sendMock;
});

describe('Say Command', () => {
  test('Says what I say', () => {
    Say.execute(['parrot', 'this', 'back'], mockMessage);
    expect(sendMock).lastCalledWith('parrot this back');
  });
});
