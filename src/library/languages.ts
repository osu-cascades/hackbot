import LanguageRunner from './interfaces/iRunner';
import { ILanguageRunners } from './languageLoader';
import glob from 'glob';
import LanguageLoader from './languageLoader';


export default class Languages {
    public readonly all: ILanguageRunners;

    constructor(languages?: ILanguageRunners) {
        this.all = languages || this.fetchLanguages();
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

    private fetchLanguages(): ILanguageRunners {
        const languagesPathGlob = './src/runners/*.ts';
        const languageRunnerFiles = glob.sync(languagesPathGlob);
        return LanguageLoader.getLanguageClasses(languageRunnerFiles);
    }

}


