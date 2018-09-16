import Commands from '../../src/library/commands';

// TODO: I feel like this class is too basic to test,
//  and ultimately a wrapper for other classes that have been tested
//  Might just remove it some day
describe('Commands', () => {
  const commands = new Commands();
  test('Has a command', () => {
    expect(Object.keys(commands.all).length).toBeGreaterThan(0);
    expect(commands.names.length).toBeGreaterThan(0);
  });
  test('Can fetch a command', () => {
    const first = commands.names[0];
    expect(commands.get(first)).not.toBeUndefined();
  });
});
