import CommandContext from '@/library/commandContext';
import ICommand from '@/library/interfaces/iCommand';

let Xmas: ICommand;

export default Xmas = class {

  /* istanbul ignore next */
  static get description(): string {
    return 'Merry Christmas, ya filthy animals.';
  }

  public static execute({ msg }: CommandContext) {
    const randomImage = 'https://giphy.com/gifs/foxhomeent-3o7TKLHb0PWRNnoVq0';
    msg.channel.send(randomImage);
  }

};
