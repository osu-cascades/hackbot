import Command from '../library/command';

/**
 * @class Source
 * @extends {Command}
 */

export default class Source extends Command {

  static get description() {
    return 'Retrieves the hackBot\'s github repository.';
  }

  static execute(args, msg) {
    return msg.channel.send('Hack me at https://github.com/osu-cascades/hackbot');
  }

}
