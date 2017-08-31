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
        try {
            this.command[cmd](args, msg);
        } catch( error ) {
            console.log(`Error on command: ${cmd} \n${error}` );
            return "";
        }
    }
}

module.exports = CommandParser;
