import CommandContext from '@/library/commandContext';
import ICommand from '@/library/interfaces/iCommand';

// Hack for implementing with static properties/methods
let Format: ICommand;
export default Format = class {
  /* istanbul ignore next */
  static get description(): string {
    return 'Helps users format code blocks.';
  }

  public static execute({ msg }: CommandContext) {
    msg.channel.send(
      'To format code snippets on discord, use triple-backticks and a language name.\n' +
        'For example:\n' +
        '\\```dart\nvoid function(type argument) {\n\treturn values;\n}\n\\```\n' +
        'Becomes:\n' +
        '```dart\nvoid function(type argument) {\n  return values;\n}```'
    );
  }
};
