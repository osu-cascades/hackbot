class CommandParser {
  /**
   * Discord users are expected to prefix bot commands with a single character,
   * such as '!cmd foo'. Throw an exception if the prefix is not a string, an
   * empty string, or a string that contains whitespace.
   */
  constructor(prefix) {
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
  parse(msg) {
    if (!(msg && 'content' in msg)) return;
    if (!String(msg.content).startsWith(this.prefix)) return;
    if (msg.content === this.prefix) return;
    const { content } = msg;

    // Get command
    let cmd = content.split(' ')[0];

    // Remove command prefix
    cmd = cmd.slice(this.prefix.length);

    // Parse the arguments passed after the command
    const args = content.split(' ').slice(1);
    return [cmd, args];
  }
}

module.exports = CommandParser;
