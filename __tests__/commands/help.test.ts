import Help from '@/commands/help';
import Commands from '@/library/commands';
import { mockMessage, MockMessage } from '../mocks/discord';

// TODO: These should be in a factory/mock
const oneCommand = {
  name: 'one',
  description: 'I am number one.',
  execute: jest.fn()
};

const twoCommand = {
  name: 'two',
  description: 'Two is not just a number.',
  execute: jest.fn()
};

const blueFishCommand = {
  name: 'blueFish',
  description: 'Not a red fish.',
  execute: jest.fn()
};

const commands = new Commands({
  one: oneCommand,
  two: twoCommand,
  blueFish: blueFishCommand
});

let sendMock: MockMessage;
let authorSend: MockMessage;

beforeEach(() => {
  sendMock = jest.fn();
  authorSend = jest.fn();

  mockMessage.reply = sendMock;
  mockMessage.author.send = authorSend;
});

describe('Help Command', () => {
  describe('Execute', () => {
    beforeEach(() => {
      Help.execute([], mockMessage, { commands });
    });

    test('Lets you know to check your DMs', () => {
      expect(sendMock).lastCalledWith('sliding into your DMs...');
    });

    describe('DMs commands with prefix and descriptions', () => {
      let message: string;
      beforeEach(() => {
        message = authorSend.mock.calls[0][0];
      });

      test('Snarky', () => {
        const snark = "I am here to help! Well...mostly just make you chuckle " +
          "at this point, let's be honest.";
        expect(message).toContain(snark);
      });

      test('Command pretext header', () => {
        const pretext = "Here is a list of the commands that we've got right now:";
        expect(message).toContain(pretext);
      });

      test('Code block start', () => {
        expect(message).toContain('```\n');
      });

      test('Code block end', () => {
        const lines = message.split('\n');
        const lastLine = lines[lines.length - 1];
        expect(lastLine).toEqual('```');
      });

      test('it still looks the same', () => {
        expect(message).toMatchSnapshot();
      });

      describe('Commands', () => {
        test('one command', () => {
          expect(message).toContain('!one');
        });

        test('one description', () => {
          expect(message).toContain(oneCommand.description);
        });

        test('two command', () => {
          expect(message).toContain('!two');
        });

        test('two description', () => {
          expect(message).toContain(twoCommand.description);
        });

        test('blueFish command', () => {
          expect(message).toContain('!blueFish');
        });

        test('BlueFish description', () => {
          expect(message).toContain(blueFishCommand.description);
        });
      });
    });
  });
});
