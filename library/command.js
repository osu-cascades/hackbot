/**
 * Provides a data structure for commands to abide by.
 * 
 * @class Command
 */
class Command {
  constructor(name, description, callback, args = []) {
    this.name = name;
    this.description = description;
    this.callback = callback;
    this.args = args;
  }

  static argsErrorMessage() {
    return 'Arguments are missing.\nRefer to `!help` or ask an Administrator if this error occurs.';
  }
}

module.exports = Command;
