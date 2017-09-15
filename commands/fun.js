const Command = require('../library/command');
const CommandPackage = require('../library/command-package');

/**
 * Collection of random fun commands
 *
 * @class FunCommand
 * @extends {Command}
 */
class FunCommand extends CommandPackage {

  static magic8ball(args, msg) {
    const { channel } = msg;
    if (args.length < 1) { return channel.sendMessage(this.argsErrorMessage()); }
    let response = [ 'It is certain',
      'It is decidedly so',
      'Without a doubt',
      'Yes definitely',
      'You may rely on it',
      'As I see it\, yes',
      'Most likely',
      'Outlook good',
      'Yes',
      'Signs point to yes',
      'Reply hazy try again',
      'Ask again later',
      'Better not tell you now',
      'Cannot predict now',
      'Concentrate and ask again',
      'Don\'t count on it',
      'My reply is no',
      'My sources say no',
      'Outlook not so good',
      'Very doubtful' ];
    return channel.sendMessage(response[Math.floor(Math.random()*response.length)]);
  }

  static say(args, msg) {
    const { channel } = msg;
    if (args.length < 1) { return channel.sendMessage(this.argsErrorMessage()); }
    const saying = args.join(' ');
    return channel.sendMessage(saying);
  }

  static xmas(args, msg) {
    const { channel } = msg;
    const randomImage = 'https://giphy.com/gifs/foxhomeent-3o7TKLHb0PWRNnoVq0';
    channel.sendMessage(randomImage);
  }
}

module.exports = FunCommand;
