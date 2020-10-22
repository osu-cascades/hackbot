import Nim from '@/runners/nim';
import axiosMock from '../__mocks__/axios';

jest.mock('axios');

test('valid code', async () => {
    const response = {
        data: {
            compileLog: "Hint: used config file '/playground/nim/config/nim.cfg' [Conf]\nHint: used config file '/playground/nim/config/config.nims' [Conf]\n....\nHint: gcc -c  -w -fmax-errors=3   -I/playground/nim/lib -I/usercode -o /usercode/nimcache/stdlib_io.nim.c.o /usercode/nimcache/stdlib_io.nim.c [Exec]\nHint: gcc -c  -w -fmax-errors=3   -I/playground/nim/lib -I/usercode -o /usercode/nimcache/stdlib_system.nim.c.o /usercode/nimcache/stdlib_system.nim.c [Exec]\nHint: gcc -c  -w -fmax-errors=3   -I/playground/nim/lib -I/usercode -o /usercode/nimcache/@min.nim.c.o /usercode/nimcache/@min.nim.c [Exec]\nHint:  [Link]\nHint: 22157 lines; 1.150s; 25.562MiB peakmem; Debug build; proj: /usercode/in.nim; out: /usercode/in [SuccessX]\n",
            log: "Hello world\n"
        }
    };
    const mockResponse = Promise.resolve(response);
    axiosMock.post.mockResolvedValueOnce(mockResponse);
    const result = await Nim.execute("code");
    expect(result).toEqual({ success: true, output: "Hello world\n" });
});

test('invalid code', async () => {
    const response = { data: { compileLog: "Hint: used config file '/playground/nim/config/nim.cfg' [Conf]\nHint: used config file '/playground/nim/config/config.nims' [Conf]\n....\n/usercode/in.nim(1, 1) Error: undeclared identifier: 'ejkfladso'\n", log: "\n" } };
    const errorResult = "Error: undeclared identifier: 'ejkfladso'";
    const mockResponse = Promise.resolve(response);
    axiosMock.post.mockResolvedValueOnce(mockResponse);
    const result = await Nim.execute("code");
    expect(result).toEqual({ success: false, output: errorResult });
});

test('invalid response', async () => {
    const response = { data: { error: "Server error" } };
    const errorResult = "Nim LanguageRunner encountered an internal error";
    const mockResponse = Promise.resolve(response);
    axiosMock.post.mockResolvedValueOnce(mockResponse);
    const result = await Nim.execute("code");
    expect(result).toEqual({ success: false, output: errorResult });
});
