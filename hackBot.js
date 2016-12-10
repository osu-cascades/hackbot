const Discord = require("discord.js");
const config = require("./config.json");
const superagent = require('superagent');
const cheerio = require('cheerio');
const bot = new Discord.Client();


//prints ready message to console
bot.on("ready", () => {
    console.log(`Ready to serve in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
});

const help = //a running list of all commands
{
	"commands": [
		{"command": "help", "description": "list all commands."},
		{"command": "say", "description": "echos back the string passed as arguments."},
		{"command": "add", "description": "adds together _integers_ passed as arguments."},
		{"command": "rules", "description": "list the rules for the CTC Discord server."},
		{"command": "xmas", "description": "Merry Christmas, ya filthy animals."},
		{"command": "purge", "description": "Purges the channel it is called within. Restricted to Board Members and Admins."},
		{"command": "search", "description": "searches Google's custom search API and sends back the top response."}
	]
};

bot.on("message", msg => {
	//If a command doesn't begin with the prefix, return
	if(!msg.content.startsWith(config.prefix)) return;
	//prevents bot-cepetion
	if(msg.author.bot) return;

	//sptrips off the prefix and stores the command
	let command = msg.content.split(" ")[0];
	command = command.slice(config.prefix.length);
	//gets the arguments passed after the command
	let args = msg.content.split(" ").slice(1);

	//!help command that DMs the user that called it with a list of all the commands
	if(command === "help"){
		msg.reply("sliding into your DMs...");
		for(var i = 0, l = help.commands.length; i < l; i++){
			return msg.author.sendMessage(`${help.commands[i].command} - ${help.commands[i].description}`);
		}
	}

	//!say command echos back the string passed to it
	if(command === "say"){
		return msg.channel.sendMessage(args.join(" "));
	}

	//!add command adds together the integer values passed to it
	if (command === "add"){
		let numArray = args.map(n=> parseInt(n));
		let total = numArray.reduce( (p, c) => p+c);
		return msg.channel.sendMessage(total);
	}

	//!rules command explaining the rules
	if(command === "rules"){
		return msg.channel.sendMessage("Be nice and don't copy each other's homework!");
	}

	//!xmas command
	if(command === "xmas"){
		return msg.channel.sendMessage("https://giphy.com/gifs/foxhomeent-3o7TKLHb0PWRNnoVq0");
	}

	//!purge command deletes all messages in the channel it's called.
	if(command === "purge") {
		let boardRole = msg.guild.roles.find("name", "Board Member");
		if(msg.member.roles.has(boardRole.id)){
        	let chan = msg.channel;
        	let chanName = chan.name;
        	let chanType = chan.type;

        	chan.delete()
          		.then()
          		.catch(console.error); 

        	msg.guild.createChannel(chanName, chanType)
          		.then(channel => console.log(`Created new channel ${channel}`))
          		.catch(console.error);
       	} else {
       		return msg.reply("sorry m8, you're not authorized to use that command.");
       	}

       	if(!msg.guild.member(bot.user).hasPermission("MANAGE_CHANNELS")){
       		return msg.reply("sorry m8, I'm not authorized to use that command.");
       	}
	}

	//!search command searches Google's custom search API and sends back the top response
	if(command === "search"){
		const key = config.key;
		const cx = config.cx;
		let url = `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&safe=off&q=${encodeURI(args)}`;
		
		superagent.get(url).end((err, res) => {
			if(err) return msg.reply("superagent error...");
			if(res.body.queries.request[0].totalResults === '0') return msg.channel.sendMessage('`No results found.`');
			msg.channel.sendMessage(res.body.items[0].link).catch(() => {
				return msg.reply("response error...");
			});
		});
	}

});

//Detects new users and sends them a little message.
bot.on("guildMemberAdd", (member) => {
    console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
    member.guild.defaultChannel.sendMessage(`"${member.user.username}" has joined this server`);
});

//log any errors in the event the bot crashes
bot.on('error', e => { console.error(e); });

//login creds
bot.login(config.token);
