import GitProfile from '@/commands/gitProfile';
import axiosMock from '../__mocks__/axios';
import mockGithubProfile from '../mockData/githubProfile';
import { mockMessage, MockMessage } from '../mocks/discord';

jest.mock('axios');

let sendMock: MockMessage;
beforeEach(() => {
  jest.resetModules();
  sendMock = jest.fn();
  mockMessage.channel.send = sendMock;
});

describe('GitProfile Command', () => {
  beforeEach(() => {
    const resolvedData = Promise.resolve({data: mockGithubProfile});
    axiosMock.request.mockResolvedValueOnce(resolvedData);
  });
  test('No username specified', () => {
    GitProfile.execute([], mockMessage);
    expect(sendMock).lastCalledWith('Please enter a username.');
  });
  test('Responds with profile information', async () => {
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
    await GitProfile.execute(['ctsstc'], mockMessage);
    const sentMessage = sendMock.mock.calls[0][0];
    expect(sentMessage.startsWith(`[${mockGithubProfile.type}] with`));
  });
  test('Requests API using username', async () => {
    await GitProfile.execute(['ctsstc'], mockMessage);
    const requestOptions = axiosMock.request.mock.calls[0][0];
    expect(requestOptions.url).toContain('api.github.com/users/ctsstc');
  });
});
