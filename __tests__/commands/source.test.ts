import { message as mockMessage } from '../mocks/discord';
import Source from './../../src/commands/source';

let sendMock;
beforeEach(() => {
  sendMock = jest.fn();
  mockMessage.channel.send = sendMock;
});

describe('Source Command', () => {
  describe('Execute', () => {
    test('Notifies with github link', () => {
      Source.execute([], mockMessage);
      expect(sendMock.mock.calls[0][0]).toContain('github.com/osu-cascades/hackbot');
    });
  });
});
