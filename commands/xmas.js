const Command = require('../library/command');

/**
 * @class Xmas
 * @extends {Command}
 */

class Xmas extends Command {

  static get description() {
    return 'Merry Christmas, ya filthy animals.';
  }

  static execute(args, msg) {
    const { channel } = msg;
    const randomImage = 'https://giphy.com/gifs/foxhomeent-3o7TKLHb0PWRNnoVq0';
    channel.send(randomImage);
  }

}

module.exports = Xmas;
