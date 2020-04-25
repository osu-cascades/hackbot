import Search from '../../src/commands/search';
import config from '../../src/config';
import axiosMock from '../__mocks__/axios';
import { message as mockMessage, MockedMessage } from '../mocks/discord';
import { noResults, results } from './../mockData/search';

jest.mock('axios');
jest.mock('../../src/config.ts');

let sendMock: MockedMessage;
beforeEach(() => {
  sendMock = jest.fn();
  mockMessage.channel.send = sendMock;
  mockMessage.reply = sendMock;
  config.googleApiKey = 'abc123';
  config.googleSearchEngineId = '12345678910:some-thing';
});

const setupRequiredMessage = 'Setup Required: Configure Google API keys in the environment variables';

describe('Search Command', () => {
  describe('Environment Variables', () => {
    test('Setup message when missing Google API Key ENV Var', async () => {
      config.googleApiKey = undefined;
      await Search.execute(['Missing Google API Key'], mockMessage);
      expect(sendMock).lastCalledWith(setupRequiredMessage);
    });
    test('Setup message when missing Google Search Engine ID ENV Var', async () => {
      config.googleSearchEngineId = undefined;
      await Search.execute(['Missing Google Search Engine ID'], mockMessage);
      expect(sendMock).lastCalledWith(setupRequiredMessage);
    });
  });
  test('With no results', async () => {
    const mockedData = Promise.resolve({ data: noResults });
    axiosMock.get.mockResolvedValueOnce(mockedData);
    await Search.execute(['Nothing here'], mockMessage);
    expect(sendMock).lastCalledWith('`No results found.`');
  });
  test('With results', async () => {
    const mockedData = Promise.resolve({ data: results });
    axiosMock.get.mockResolvedValueOnce(mockedData);
    await Search.execute(['dingusy'], mockMessage);
    expect(sendMock).lastCalledWith(results.items[0].link);
  });
  describe('Malformed Response', () => {
    let consoleErrorMock: jest.SpyInstance<void, any>;
    beforeEach(async () => {
      const mockedData = Promise.resolve({ data: {} });
      axiosMock.get.mockResolvedValueOnce(mockedData);
      consoleErrorMock = jest.spyOn(console, 'error')
        .mockImplementation(() => undefined); // Prevent it from spewing into the test results
      await Search.execute(['NOPE'], mockMessage);
    });
    afterEach(() => {
      consoleErrorMock.mockRestore();
    });
    test('Responds with error message', async () => {
      expect(sendMock).lastCalledWith("I'm Sorry Dave, I'm afraid I can't do that...");
    });
    test('Console logs an error', () => {
      const errorMessage = "Malformed Google Search Response: {}";
      expect(consoleErrorMock).lastCalledWith(errorMessage);
    });
  });
});
