import Lmgtfy from '../../src/commands/lmgtfy';
import { message as mockMessage, MockedMessage } from '../mocks/discord';

let sendMock: MockedMessage;
beforeEach(() => {
  sendMock = jest.fn();
  mockMessage.channel.send = sendMock;
});

describe('Lmgtfy Command', () => {
  test('Sends a link to LMGTFY', () => {
    Lmgtfy.execute(['pictures', 'of', 'cats'], mockMessage);
    expect(sendMock).lastCalledWith('<http://lmgtfy.com/?q=pictures+of+cats>');
  });
});
