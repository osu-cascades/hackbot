import Run from '@/commands/run';
import { message as mockMessage, MockedMessage } from '../mocks/discord';

let sendMock: MockedMessage;
beforeEach(() => {
    sendMock = jest.fn();
    mockMessage.channel.send = sendMock;
    mockMessage.reply = sendMock;
});

test('Malformed message', () => {
    mockMessage.content = "Wow this is nowhere near the correct content";
    Run.execute([], mockMessage);
    expect(sendMock).lastCalledWith("Sorry, I ran into some problems understanding your message. Here is the error stopping me.\nError: Unable to extract code from Wow this is nowhere near the correct content");
});

test('Unknown language', () => {
    mockMessage.content = "```invalidLanguage\nblahblahblah```";
    Run.execute([], mockMessage);
    expect(sendMock).lastCalledWith("Unknown language: invalidLanguage")
});