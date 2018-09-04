import { Message } from "discord.js";
import ParsedCommand from './parsedCommand';

export default class CommandParser {
  prefix: string;

  /**
   * Discord users are expected to prefix bot commands with a single character,
   * such as '!cmd foo'. Throw an exception if the prefix is not a string, an
   * empty string, or a string that contains whitespace.
   */
  constructor(prefix: string) {
    if (typeof prefix != 'string' || prefix.length === 0 || /\s/g.test(prefix))
      throw 'Prefix must be a non-empty string';
    this.prefix = prefix;
  }

  /**
   * Extract a Discord Message object's content String into two components: the
   * bot command and an array of the command arguments. For example,
   * `{ content: '!multiply 2 4' }` becomes `[ 'multiply', ['2', '4']]`.
   * Returns `undefined` in all invalid cases.
   */
  parse(message: string): ParsedCommand|false {
    if (!this.validContent(message)) {
      return false;
    }

    // Get command
    let cmd = message.split(' ')[0];

    // Remove command prefix
    cmd = cmd.slice(this.prefix.length);

    // Parse the arguments passed after the command
    const args = message.split(' ').slice(1);
    return new ParsedCommand(cmd, args);
  }

  validContent(content: string): boolean {
    return content.startsWith(this.prefix) &&
      content !== this.prefix;
  }
}
