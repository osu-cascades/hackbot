/***
* Generic command parser object
* Commands are stored in commands.js
***/

module.exports.CommandParser = function(prefix) {
  this.prefix = prefix; //command prefix e.g. "!"
  this.C = require('./commands.js'); //available commands
  //if(command === "help"){
  //  let response = "";
  //  msg.reply("sliding into your DMs...");
  //  response += "I am here to help! Well...mostly just make you chuckle at this point, let's be honest.\n\n";
  //  response += "Here is a list of the commands that we've got right now:\n";
  //  response += "\`\`\`";
  //  for(var i = 0, l = help.commands.length; i < l; i++){
  //    response += `${help.commands[i].command}  =>  ${help.commands[i].description}\n`;
  //  }
  //  response += "\`\`\`";
  //  return msg.author.sendMessage(response);
  //}

  /*define the "help" command*/
  this.C.commands.help = new this.C.Command (
    "!help",
    "Displays this message",
    function(args, msg) {
        msg.reply("sliding into your DMs...");
      msg.author.sendMessage(helpMsg);
      return;
    }
  );

  /*pretty print the help*/
  var helpMsg = "I am here to help! Well...mostly just make you chuckle at this point, let's be honest.\n\n";
  helpMsg += "Here is a list of the commands that we've got right now:\n";
    helpMsg += "\`\`\`\n";
  //find the longest synopsis
  var longest = 0;
  for(var cmd in this.C.commands) {
    if ( this.C.commands[cmd].synopsis.length > longest ) {
      longest = this.C.commands[cmd].synopsis.length;
    }
  }

  //add an extra space
  longest = longest + 1;
  for(var cmd in this.C.commands) {
    helpMsg += this.C.commands[cmd].synopsis + " ";
    let spaces = longest - this.C.commands[cmd].synopsis.length;
    for( var i = 0; i < spaces; i++ ) {
      helpMsg += " ";
    }
    helpMsg += "→ "
    helpMsg += this.C.commands[cmd].description + "\n";
  }
  helpMsg += "\`\`\`"

 /***
  * parsing method return a response string
  ***/
  this.parse = function(msg) {
    if ( !msg.content.startsWith( this.prefix ) ) {
        return;
    }

      var cmd = msg.content.split(" ")[0];
    cmd = cmd.slice(this.prefix.length);
    //gets the arguments passed after the command
    var args = msg.content.split(" ").slice(1);
    try {
      return this.C.commands[cmd].response( args, msg );
    }catch( ex ) {
      console.log("error on command: " + cmd + "\nException: " + ex );
      return "";
    }
  }
}
