/**
 * Provides a data structure for commands to abide by.
 * 
 * @class Command
 */
class Command {

  // Interface
  static execute() {
    let className = this.name;//this.constructor.name;
    throw className == 'Command' ? 'Cannot call execute() directly from the Command class' : `${className} does not implement execute()`;
  }
}

module.exports = Command;
