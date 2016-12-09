const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");

bot.on("message", msg => {
	//If a command doesn't begin with the prefix, return
	if(!msg.content.startsWith(config.prefix)) return;
	//prevents bot-cepetion
	if(msg.author.bot) return;

	let command = msg.content.split(" ")[0];
	command = command.slice(config.prefix.length);

	let args = msg.content.split(" ").slice(1);

	if(command === "say"){
		msg.channel.sendMessage(args.join(" "));
	}

	if (command === "add"){
		let numArray = args.map(n=> parseInt(n));
		let total = numArray.reduce( (p, c) => p+c);
		msg.channel.sendMessage(total);
	}

	//!rules command explaining the rules
	if(command === "rules"){
		msg.channel.sendMessage("Be nice and don't copy each other's homework!");
	}

	//!xmas command
	if(command === "xmas"){
		msg.channel.sendMessage("https://giphy.com/gifs/foxhomeent-3o7TKLHb0PWRNnoVq0");
	}

	//!purge command deletes all messages in the channel it's called.
	if (command === "purge") {
		let boardRole = msg.guild.roles.find("name", "Board Member");
		if(msg.member.roles.has(boardRole.id)){
    		let messagecount = 100;
    		msg.channel.fetchMessages({limit: messagecount})
       		.then(messages => msg.channel.bulkDelete(messages));
       	} else {
       		return msg.reply("sorry m8, you're not authorized to use that command.");
       	}

       	if(!msg.guild.member(bot.user).hasPermission("KICK_MEMBERS")){
       		return msg.reply("sorry m8, I'm not authorized to use that command.");
       	}

	}
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
bot.login(config.token);