import Xmas from '../../src/commands/xmas';
import { message as mockMessage } from '../mocks/discord';

let sendMock: jest.Mock<any, any>;
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
