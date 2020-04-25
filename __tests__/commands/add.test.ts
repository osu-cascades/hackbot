import Add from '../../src/commands/add';
import { mockMessage, MockMessage } from '../mocks/discord';

let sendMock: MockMessage;
beforeEach(() => {
  sendMock = jest.fn();
  mockMessage.channel.send = sendMock;
});

describe('Add Command', () => {
  describe('Execute', () => {
    test('Adds two numbers', () => {
      Add.execute(['1', '2'], mockMessage);
      expect(sendMock).lastCalledWith(3);
    });
    test('Adds multiple numbers', () => {
      Add.execute(['1', '2', '3', '4'], mockMessage);
      expect(sendMock).lastCalledWith(10);
    });
    test('Adds negative numbers', () => {
      Add.execute(['-3', '2'], mockMessage);
      expect(sendMock).lastCalledWith(-1);
      Add.execute(['-3', '-5'], mockMessage);
      expect(sendMock).lastCalledWith(-8);
    });
  });
});
