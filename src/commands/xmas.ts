import Command from '../library/command';

/**
 * @class Xmas
 * @extends {Command}
 */

export default class Xmas extends Command {

  static get description() {
    return 'Merry Christmas, ya filthy animals.';
  }

  static execute(args, msg) {
    const { channel } = msg;
    const randomImage = 'https://giphy.com/gifs/foxhomeent-3o7TKLHb0PWRNnoVq0';
    channel.send(randomImage);
  }

}
