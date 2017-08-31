// OH HAI
class CommandParser {

    constructor(prefix, command) {
        this.prefix = prefix;
        this.command = command;
    }

    parse(msg) {
        var { content } = msg;
        if (!content.startsWith(this.prefix)) {
            return;
        }
        // Get command
        var cmd = content.split(" ")[0];
        // Remove command prefix
        cmd = cmd.slice(this.prefix.length);
        // Parse the arguments passed after the command
        var args = content.split(" ").slice(1);
        return [cmd, args]
    }
}

module.exports = CommandParser;
