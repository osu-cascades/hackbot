import Languages from '@/library/languages';
import languageRunners from '../__mocks__/languageRunners';

describe('Languages', () => {
    let languages: Languages;

    beforeEach(() => {
        languages = new Languages(languageRunners);
    });

    test('.names returns language names', () => {
        const languageNames = ['testLang', 'hipRunner'];
        expect(languages.names).toEqual(languageNames);
    });

    test('Can fetch a command', () => {
        const testLang = languages.get('testLang');
        expect(testLang).toBe(languageRunners.testLang);
    });
})