import axios from 'axios';
import GitProfile from '../../src/commands/gitProfile';
import mocked from '../helpers/mocked';
import mockGithubProfile from '../mockData/githubProfile';
import { message as mockMessage, MockedMessage } from '../mocks/discord';

jest.mock('axios');

let sendMock: MockedMessage;
beforeEach(() => {
  jest.resetModules();
  sendMock = jest.fn();
  mockMessage.channel.send = sendMock as any;
});

describe('GitProfile Command', () => {
  test('No username specified', () => {
    GitProfile.execute([], mockMessage);
    expect(sendMock).lastCalledWith('Please enter a username.');
  });
  test('Responds with profile information', async () => {
    mocked(axios.request).mockResolvedValue({data: mockGithubProfile});
    await GitProfile.execute(['ctsstc'], mockMessage);
    const sentMessage = sendMock.mock.calls[0][0];
    expect(sentMessage).toContain(`[${mockGithubProfile.type}]`);
    expect(sentMessage).toContain(mockGithubProfile.name);
    expect(sentMessage).toContain(mockGithubProfile.company);
    expect(sentMessage).toContain(mockGithubProfile.location);
    expect(sentMessage).toContain(`${mockGithubProfile.public_repos} public repos`);
    expect(sentMessage).toContain(`${mockGithubProfile.public_gists} public gists`);
    expect(sentMessage).toContain(`${mockGithubProfile.followers} followers`);
    expect(sentMessage).toContain(`following ${mockGithubProfile.following}`);
    const joinedRegex = new RegExp(`Joined .* ${mockGithubProfile.html_url}`);
    expect(joinedRegex.test(sentMessage)).toEqual(true);
  });
  test('Responds with default profile information', async () => {
    mockGithubProfile.name = null;
    mockGithubProfile.company = null;
    mockGithubProfile.location = null;
    mocked(axios.request).mockResolvedValue({data: mockGithubProfile});
    await GitProfile.execute(['ctsstc'], mockMessage);
    const sentMessage = sendMock.mock.calls[0][0];
    expect(sentMessage.startsWith(`[${mockGithubProfile.type}] with`));
  });
  test('Requests API using username', async () => {
    await GitProfile.execute(['ctsstc'], mockMessage);
    const requestOptions = mocked(axios.request).mock.calls[0][0];
    expect(requestOptions.url).toContain('api.github.com/users/ctsstc');
  });
});
