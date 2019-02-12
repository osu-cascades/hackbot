import Magic8Ball from '../../src/commands/magic8ball';
import { message as mockMessage, MockedMessage } from '../mocks/discord';

let sendMock: MockedMessage;
beforeEach(() => {
  sendMock = jest.fn();
  mockMessage.channel.send = sendMock;
});

describe('Magic8Ball Command', () => {
  test('Returns an answer from responses', () => {
    Magic8Ball.execute(['Will', 'this', 'work'], mockMessage);
    const sentMessage = sendMock.mock.calls[0][0];
    expect(Magic8Ball.responses.indexOf(sentMessage)).toBeGreaterThan(-1);
  });
});
