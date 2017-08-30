const Command = require('./Command');

class CommandParser {
    constructor(prefix) {
        this.prefix = prefix;
        this.command = new Command();
    }

    parse(msg) {
        var { content } = msg;
        if (!content.startsWith(this.prefix)) {
            return;
        }
        // Gets command
        var cmd = content.split(" ")[0];
        // Gets command without prefix
        cmd = cmd.slice(this.prefix.length);
        // Gets the arguments passed after the command
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
