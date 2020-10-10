import Hacktoberfest from '@/commands/hacktoberfest';

import { message as mockMessage, MockedMessage } from '../mocks/discord';

let sendMock: MockedMessage;
beforeEach(() => {
  sendMock = jest.fn();
  mockMessage.channel.send = sendMock;
});

describe('Hacktoberfest command', () => {
  test('hacktoberfest', () => {
    Hacktoberfest.execute([], mockMessage);
    const sentMessage = sendMock.mock.calls[0][0];
    expect(sentMessage.includes('Hacktoberfest')).toEqual(true);
  });
});
