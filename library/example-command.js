/**
 * An example command class implementation, primarily for getting them all under
 * test.
 * Command classes should not extend this class, as JavaScript is duck-typed.
 *
 * @class ExampleCommand
 */
class ExampleCommand {

  constructor() {
    this.keyword = 'example';
    this.description = 'An example command description.'
  }

  execute(args) {
    if (args !== []) throw 'Arguments must be an array';

  }

}

module.exports = ExampleCommand;
