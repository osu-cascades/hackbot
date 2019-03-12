import Rules from '../../src/commands/rules';

import { message as mockMessage } from '../mocks/discord';

let sendMock: jest.Mock<any, any>;
beforeEach(() => {
  sendMock = jest.fn();
  mockMessage.channel.send = sendMock;
});

describe('Rules Command', () => {
  test('Be nice', () => {
    Rules.execute([], mockMessage);
    const sentMessage = sendMock.mock.calls[0][0];
    expect(sentMessage.startsWith('Be nice')).toEqual(true);
  });
});
