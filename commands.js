/***
* Generic command object
***/
var Command = function(synopsis, description, exec){
  this.synopsis = synopsis;
  this.description = description;
  this.response = exec;
}
exports.Command = Command;

var argsErr = "[cannot compute, args missing]";

//Define commands
exports.commands = {
  "say" : new Command(
    "!say [args]",
    "echos back the string passed as arguments.",
    function( args, msg ){
      if( args.length < 1){return argsErr;}

      return args.join(" ");
    }
  ),

  "lmgtfy" : new Command(
    "!lmgtfy [args]",
    "When someone is being...lazy...?",
    function( args, msg ){
      if( args.length < 1){return argsErr;}

      return '<http://lmgtfy.com/?q=' + args.join('+') + '>';
    }
  ),
  
  "add" : new Command(
    "!add [args]",
    "adds together _integers_ passed as arguments.",
    function( args, msg ){
      if( args.length < 1){return argsErr;}

      let numArray = args.map(n=> parseInt(n));
      let total = numArray.reduce( (p, c) => p+c);
      return total;
    }
  ),
  
  "rules" : new Command(
    "!rules",
    "list the rules for the CTC Discord server.",
    function( args, msg ){
	    return "Be nice and don't copy each other's homework!";
    }
  ),
  
  "xmas" : new Command(
    "!xmas",
    "Merry Christmas, ya filthy animals.",
    function( args, msg ){
		  return "https://giphy.com/gifs/foxhomeent-3o7TKLHb0PWRNnoVq0";
    }
  ),
  
  "purge" : new Command(
    "!purge",
    "Purges the channel it is called within. Restricted to Board Members and Admins.",
    function( args, msg ){
      //Make sure the person doing the command is a Board Member
      let boardRole = msg.guild.roles.find("name", "Board Member");
      if(msg.member.roles.has(boardRole.id)){

        //Grab the channels info
        let chan = msg.channel;
        let chanName = chan.name;
        let chanType = chan.type;

        //Delete the channel
        chan.delete()
        .then()
        .catch(console.error); 
        
        //Now re-create the channel with the same name and type
        msg.guild.createChannel(chanName, chanType)
        .then(channel => console.log(`Created new channel ${channel}`))
        .catch(console.error);
      } else {
        return msg.reply("sorry m8, you're not authorized to use that command.");
      }
      if(!msg.guild.member(bot.user).hasPermission("MANAGE_CHANNELS")){
        return "sorry m8, I'm not authorized to use that command.";
      }
    }
  ),
}
