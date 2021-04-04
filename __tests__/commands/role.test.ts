import Role from '@/commands/role';

import { message as mockMessage, MockedMessage } from '../mocks/discord';

let sendMock: MockedMessage;
beforeEach(() => {
  sendMock = jest.fn();
  mockMessage.channel.send = sendMock;
});

describe('Role Command', () => {
  test('Error helper message on invalid format.', () => {
    Role.execute(['winning', '2012'], mockMessage);
    expect(sendMock).lastCalledWith(
      'Role command "winning" unknown. Use "role request [rolename]" to request a role, or "role help" for more information.'
    );
  });
});
