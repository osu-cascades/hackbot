import axios from 'axios';
import Search from '../../src/commands/search';
import config from '../../src/config';
import mocked from '../helpers/mocked';
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

describe('Search Command', async () => {
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
    mocked(axios.get).mockResolvedValue({ data: noResults });
    await Search.execute(['Nothing here'], mockMessage);
    expect(sendMock).lastCalledWith('`No results found.`');
  });
  test('With results', async () => {
    mocked(axios.get).mockResolvedValue({ data: results });
    await Search.execute(['dingusy'], mockMessage);
    expect(sendMock).lastCalledWith(results.items[0].link);
  });
});
