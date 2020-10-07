import Languages from '@/library/languages';
import IRunner from '@/library/interfaces/iRunner';
import { ILanguageRunners } from '@/library/languageLoader';

describe('Languages', () => {
    let mockLanguageRunner: IRunner;
    let languageRunners: ILanguageRunners;
    let languages: Languages;

    beforeEach(() => {
        mockLanguageRunner = {
            execute: jest.fn()
        };

        languageRunners = {
            testLang: mockLanguageRunner,
        };

        languages = new Languages(languageRunners);
    });

    test('.names returns language names', () => {
        const languageNames = ['testLang'];
        expect(languages.names).toEqual(languageNames);
    });

    test('Can fetch a command', () => {
        const testLang = languages.get('testLang');
        expect(testLang).toBe(mockLanguageRunner);
    });
})