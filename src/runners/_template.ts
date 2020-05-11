import IRunner from '@/library/interfaces/iRunner';

let LanguageName: IRunner;
export default LanguageName = class {
    public static execute(code: string): Promise<{success: boolean, output: string}> {
        throw new Error(`LanguageRunner not yet implemented for ${this.name}`);
    }
}