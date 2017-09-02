const Command = require('../library/command');

/**
 * Displays a mesage to the github repo
 * 
 * @class SourceCommand
 * @extends {Command}
 */

class SourceCommand extends Command {

  source(args, msg) {
    return msg.channel.sendMessage('Hack me at https://github.com/osu-cascades/hackbot');
  }

}

module.exports = SourceCommand;