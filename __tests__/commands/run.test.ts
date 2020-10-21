import Run from '@/commands/run';
import { message as mockMessage, MockedMessage } from '../mocks/discord';

jest.mock('@/library/languages', () => {
    // Create a Language wrapper that forces our mocked instantiation
    // Might have been easier to just mock out LanguageLoader.getLanguageClasses ?
    //  but I like this crafty wrapper method
    return class {
        constructor() {
            const { default: RealLanguage } = jest.requireActual('@/library/languages');
            const { default: languageRunners } = jest.requireActual('../__mocks__/languageRunners');
            return new RealLanguage(languageRunners);
        }
    };
});

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
    expect(sendMock).lastCalledWith("Unknown language: invalidLanguage\nTry one of these: testLang, hipRunner");
});
