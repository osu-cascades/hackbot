import Add from '../../src/commands/add';
import { Message, TextChannel, Guild, Client } from 'discord.js';

jest.mock('discord.js');

const client = new Client();
const guild = new Guild(client, {});
const textChannel = new TextChannel(guild, {});
const message = new Message(textChannel, false, client);

let sendMock, mockMessage: Message;
beforeEach(() => {
  sendMock = jest.fn();
  // @ts-ignore
  mockMessage = { channel: { send: sendMock } };

  message.channel = textChannel;
  message.channel.send = sendMock;
  mockMessage = message;
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
