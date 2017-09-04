/**
 * A temporary base class for commands to get them all under test.
 * Once the command-base.test is done, this class can be removed.
 * Command classes should not extend this class, as JavaScript is duck-typed.
 *
 * @class CommandBase
 */
class CommandBase {

  constructor(keyword, description) {

  }

  execute(args) {

  }

}

module.exports = CommandBase;
