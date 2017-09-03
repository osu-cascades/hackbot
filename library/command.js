/**
 * This is no longer doing anything as far as I know.
 * This should provide the structure that each commands should have.
 * The structure should be based off of the command-information.js
 * After this is implemented we will be able to remove command-information.js
 * 
 * @class Command
 */
class Command {
  constructor() {
    
  }

  static argsErrorMessage() {
    return 'Arguments are missing.\nRefer to `!help` or ask an Administrator if this error occurs.';
  }
}

module.exports = Command;
