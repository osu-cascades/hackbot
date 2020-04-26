import Say from '@/commands/say';
import { mockMessage, MockMessage } from '../mocks/discord';

let sendMock: MockMessage;
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
