class CommandParser {
  constructor(prefix) {
    this.prefix = prefix;
  }

  parse(msg) {
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
