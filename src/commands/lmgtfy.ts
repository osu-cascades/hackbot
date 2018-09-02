import Command from '../library/command';

export default class Lmgtfy extends Command {

  static get description() {
    return 'When someone is being...lazy...?';
  }

  static execute(args, msg) {
    const { channel } = msg;
    return channel.send(`<http://lmgtfy.com/?q=${args.join('+')}>`);
  }

}
