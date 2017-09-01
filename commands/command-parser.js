class CommandParser {
  constructor(prefix) {
    this.prefix = prefix;
  }

  // Extract a Discord Message object's content String into two components: the
  // bot command and an array of the command arguments. For example,
  // `{ content: '!multiply 2 4' }` becomes `[ 'multiply', ['2', '4']]`.
  // Returns `undefined` in all invalid cases.
  parse(msg) {
    if (!(msg && 'content' in msg)) return;
    const { content } = msg;
    if (!content.startsWith(this.prefix)) {
      return;
    }

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
