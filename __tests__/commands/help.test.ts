import Help from '../../src/commands/help';
import { message as mockMessage, MockedMessage } from '../mocks/discord';

const commands:{[key: string]: {[key: string]: string}} = {
  One: { description: 'I am number one.' },
  Two: { description: 'Two is not just a number.' },
  BlueFish: { description: 'Not a red fish.' }
};

jest.mock('../../src/library/commands', () => {
  return function() {
    return {
      longestName: jest.fn(() => 42),
      names: Object.keys(commands),
      get: jest.fn((name) => {
        return commands[name];
      })
    };
  }
});

let sendMock: MockedMessage;
let authorSend: MockedMessage;
beforeEach(() => {
  sendMock = jest.fn();
  mockMessage.reply = sendMock;
  authorSend = jest.fn();
  // @ts-ignore
  mockMessage.author = {
    send: authorSend
  }
});

describe('Help Command', () => {
  describe('Execute', () => {
    beforeEach(() => {
      Help.execute([], mockMessage);
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

      describe('Commands', () => {
        test('One command', () => {
          expect(message).toContain('!One');
        });
  
        test('One description', () => {
          expect(message).toContain(commands.One.description)
        });
  
        test('Two command', () => {
          expect(message).toContain('!Two');
        });
  
        test('Two description', () => {
          expect(message).toContain(commands.Two.description);
        });
  
        test('BlueFish command', () => {
          expect(message).toContain('!BlueFish');
        });
  
        test('BlueFish description', () => {
          expect(message).toContain(commands.BlueFish.description);
        });
      });
    });
  });
});
