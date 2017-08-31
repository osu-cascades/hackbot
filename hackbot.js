const Discord = require("discord.js");
const config = require("./config.json");
const CommandParser = require('./Commands/CommandParser');
const bot = new Discord.Client();

var cmdParser = new CommandParser(config.prefix);

// Prints ready message to console
bot.on("ready", () => {
    console.log(`Ready to serve in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
});

bot.on("message", msg => {
    response = cmdParser.parse(msg);
    if ( response !== "" && response !== undefined ) {
	      return response;
    } else {
        return;
    }
});

// Detects new users and sends them a little message.
bot.on("guildMemberAdd", (member) => {
    var { username } = member.user;
    console.log(`New User "${username}" has joined "${member.guild.name}"` );
    member.guild.defaultChannel.sendMessage(`"${username}" has joined this server`);
});

// Log any errors in the event the bot crashes
bot.on('error', e => { console.error(e); });

// Login creds
bot.login(config.token);
