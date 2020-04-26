import Xmas from '@/commands/xmas';
import { mockMessage, MockMessage } from '../mocks/discord'

let sendMock: MockMessage;
beforeEach(() => {
  sendMock = jest.fn();
  mockMessage.channel.send = sendMock;
});

describe('Rules Command', () => {
  test('Be nice', () => {
    Xmas.execute([], mockMessage);
    const sentMessage = sendMock.mock.calls[0][0];
    expect(sentMessage).toContain('giphy.com/gifs');
  });
});
