import LanguageRunner from './interfaces/iRunner';
import { ILanguageRunners } from './languageLoader';

export default class Commands {
    public readonly all: ILanguageRunners;

    constructor(languageRunners: ILanguageRunners) {
        this.all = languageRunners;
    }

    get names() {
        return Object.keys(this.all);
    }

    public get(languageName: string): LanguageRunner {
        return this.all[languageName];
    }

    public longestNameLength() {
        // Find the longest synopsis
        const longest = this.names.sort((a, b) => b.length - a.length)[0];
        return longest.length;
    }

}
