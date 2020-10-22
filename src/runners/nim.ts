import IRunner from '@/library/interfaces/iRunner';
import axios, { AxiosResponse } from 'axios';

let Nim: IRunner;
export default Nim = class {

    public static execute(code: string): Promise<{ success: boolean, output: string }> {
        return this.runCode(code)
            .then((response) => {
                // Credit to Bryce G. for this section
                const success = /\[SuccessX\]/.test(response.compileLog);
                const output = success ? response.log : (/Error:.+(?=\n)/.exec(response.compileLog) || [])[0];

                return {
                    success,
                    output: output || "Nim LanguageRunner encountered an internal error",
                };
            })
            .catch(() => {
                return {
                    success: false,
                    output: "Nim LanguageRunner encountered an internal error",
                };
            });
    }

    // Sends code to the nim playground for execution
    private static runCode(code: string): Promise<{ compileLog: string, log: string }> {
        const url = "https://play.nim-lang.org/compile";
        return axios.post(url, {
            code,
            compilationTarget: "c",
            outputFormat: "raw",
            version: "latest",
        }).then((response: AxiosResponse) => {
            return {
                compileLog: response.data.compileLog,
                log: response.data.log,
            };
        });
    }
};
