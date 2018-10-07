
// Thanks @huafu - https://github.com/kulshekhar/ts-jest/issues/472
export default function mocked<T>(val: T): T extends (...args: any[]) => any ? jest.MockInstance<T> : jest.Mocked<T> {
  return val as any;
}
