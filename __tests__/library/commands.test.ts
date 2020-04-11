import Commands from '../../src/library/commands';
import ICommand from '../../src/library/iCommand';
import { ICommandClasses } from '../../src/library/commandLoader';

describe('Commands', () => {
  let mockHelloCommand: ICommand;
  let mockYetAnotherCommand: ICommand;
  let mockCommands: ICommandClasses;
  let commands: Commands;

  beforeEach(() => {
    // TODO: these should probably go into a factory/mock
    mockHelloCommand = {
      name: 'Hello',
      description: 'Hello World',
      execute: jest.fn()
    };
    mockYetAnotherCommand = {
      name: 'YAC',
      description: 'Yet Another Command!',
      execute: jest.fn()
    }
    mockCommands = {
      hello: mockHelloCommand,
      yac: mockYetAnotherCommand
    }
    commands = new Commands(mockCommands);
  });

  test('.names returns command names', () => {
    const commandNames = ['hello', 'yac']
    expect(commands.names).toEqual(commandNames);
  });

  test('Can fetch a command', () => {
    const helloCommand = commands.get('hello');
    expect(helloCommand).toBe(mockHelloCommand);
  });

  test('Finds the longest name', () => {
    expect(commands.longestNameLength()).toEqual(5);
  });
});
