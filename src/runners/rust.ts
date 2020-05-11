import IRunner from '@/library/interfaces/iRunner';
import axios, { AxiosResponse } from 'axios';

let Rust: IRunner;
export default Rust = class {
    public static execute(code: string): Promise<{ success: boolean, output: string }> {
        return this.runCode(code)
            .then((response) => {
                if (response.success) {
                    return { success: true, output: response.stdout };
                } else {
                    return { success: false, output: response.stderr };
                }
            })
            .catch(error => {
                return { success: false, output: "Rust LanguageRunner encountered an internal error" };
            });
    }

    // Sends code to the rust playground for execution
    private static runCode(code: string): Promise<{ success: boolean, stdout: string, stderr: string }> {
        const url = "https://play.rust-lang.org/execute";
        return axios.post(url, {
            channel: "stable",
            code,
            crateType: "bin",
            edition: "2018",
            mode: "debug",
            tests: false
        }).then((response: AxiosResponse) => {
            return {
                success: response.data.success,
                stdout: response.data.stdout,
                stderr: response.data.stderr
            };
        });
    }
};
