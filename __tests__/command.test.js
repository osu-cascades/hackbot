import Command from '../library/command';

describe('Command', () => {

  describe('Instantiation', () => {
    test('should raise an exception', () => {
      expect(() => {
        new Command();
      }).toThrow();
    });
  });

  describe('description', () => {
    test('should raise an exception', () => {
      expect(() => {
        Command.description;
      }).toThrow();
    });
  });

  describe('execute', () => {
    test('should raise an exception', () => {
      expect(() => {
        Command.execute('fake', 'fake');
      }).toThrow();
    });
  });

});
