var Discord = require("discord.js");
var bot = new Discord.Client();

bot.on("message", msg => {
	//This is the prefix for all commands
	let prefix = "!";
	//If a command doesn't begin with the prefix, return
	if(!msg.content.startsWith(prefix)) return;
	//prevents bot-cepetion
	if(msg.author.bot) return;

	//!rules command explaining the rules
	if(msg.content.startsWith(prefix + "rules")){
		msg.channel.sendMessage("Be nice and don't copy each other's homework!")
	}

	//!purge command deletes all messages in the channel it's called.
	//if (message.content.startsWith(prefix + "purge")) {
    //	let messagecount = parseInt(params[0]);
    //	message.channel.fetchMessages({limit: messagecount})
    //    	.then(messages => message.channel.bulkDelete(messages));
	//}
});

//Detects new users and sends them a little message.
bot.on("guildMemberAdd", (member) => {
    console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
    member.guild.defaultChannel.sendMessage(`"${member.user.username}" has joined this server`);
});

bot.on("ready", () => {
    console.log(`Ready to serve in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
});

//log any errors in the event the bot crashes
bot.on('error', e => { console.error(e); });

//login creds
bot.login('Token');