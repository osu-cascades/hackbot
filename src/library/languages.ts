import LanguageRunner from './interfaces/iRunner';
import { ILanguageRunners } from './languageLoader';
import glob from 'glob';
import LanguageLoader from './languageLoader';


export default class Languages {
    public readonly all: ILanguageRunners;

    constructor() {
        const languagesPathGlob = './src/runners/*.ts';
        const languageRunnerFiles = glob.sync(languagesPathGlob);
        const languageRunners = LanguageLoader.getLanguageClasses(languageRunnerFiles);
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


