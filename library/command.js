/**
 * An interface for all commands to extend, representing the API that all
 * subclasses should implement.
 *
 * @class Command
 */
class Command {

  /**
   * Prevent instantiation.
   */
  constructor() {
    throw 'Do not instantiate a command. Rely on its static methods.'
  }

  /**
   * A description of the command. Subclasses should implement this property.
   */
  static get description() {
    throw `Subclass: ${this.name} does not implement description()`;
  }

  /**
   * Execute the command. Subclasses should implement this method.
   */
  static execute(args, msg) {
    let className = this.name;
    let directCallException = 'Cannot call execute() directly from the Command class';
    let implementingClassException = `Subclass: ${className} does not implement execute()`;
    throw className == 'Command' ? directCallException : implementingClassException;
  }

  /**
   * An inheritable error message for reporting a problem with command
   * arguments. Subclasses may override this with a more specific message.
   */
  static get argsErrorMessage() {
    return 'Arguments are missing.\nRefer to `!help` or ask an Administrator if this error occurs.';
  }

}

module.exports = Command;
