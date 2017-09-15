/**
 * Provides an interface for commands to inherit
 * 
 * @class Command
 */
class Command {

  // Interface
  static get description() {
    throw `Subclass: ${this.name} does not implement description()`;
  }

  static execute() {
    let className = this.name;//this.constructor.name;
    let directCallException = 'Cannot call execute() directly from the Command class';
    let implementingClassException = `Subclass: ${className} does not implement execute()`;
    throw className == 'Command' ? directCallException : implementingClassException;
  }

  // Overridable
  static get argsErrorMessage() {
    return 'Arguments are missing.\nRefer to `!help` or ask an Administrator if this error occurs.';
  }
}

module.exports = Command;
