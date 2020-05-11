import { ILanguageRunners } from './languageLoader';
import LanguageRunner from './interfaces/iRunner';

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
