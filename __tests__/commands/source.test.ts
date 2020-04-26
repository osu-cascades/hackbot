import { message as mockMessage, MockedMessage } from '../mocks/discord';
import Source from '@/commands/source';

let sendMock: MockedMessage;
beforeEach(() => {
  sendMock = jest.fn();
  mockMessage.channel.send = sendMock;
});

describe('Source Command', () => {
  describe('Execute', () => {
    test('Sends message with github link', () => {
      Source.execute([], mockMessage);
      expect(sendMock.mock.calls[0][0]).toContain('github.com/osu-cascades/hackbot');
    });
  });
});
