import Rust from '@/runners/rust';
import axiosMock from '../__mocks__/axios';

jest.mock('axios');

test('valid code', async () => {
    const code = "testCode";
    let mockResponse = Promise.resolve({ data: { success: true, stdout: "test", stderr: "   Compiling playground v0.0.1 (/playground)\n    Finished dev [unoptimized + debuginfo] target(s) in 0.43s\n     Running `target/debug/playground`\n" } });
    axiosMock.post.mockResolvedValueOnce(mockResponse);
    let result = await Rust.execute(code);
    expect(result).toEqual({ success: true, output: "test" });
})

test('invalid code', async () => {
    const code = "testCode";
    const errorResult = "bad code";
    let mockResponse = Promise.resolve({ data: { success: false, stdout: "", stderr: errorResult } });
    axiosMock.post.mockResolvedValueOnce(mockResponse);
    let result = await Rust.execute(code);
    expect(result).toEqual({ success: false, output: errorResult });
})