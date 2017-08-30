const Discord = require("discord.js");
const config = require("./config.json");
const superagent = require('superagent');
//const cheerio = require('cheerio');
const Parser = require('./command-parser.js');
const bot = new Discord.Client();

cmdParser = new Parser.CommandParser( config.prefix );


//prints ready message to console
bot.on("ready", () => {
    console.log(`Ready to serve in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
});


bot.on("message", msg => {
  response = cmdParser.parse(msg);
  if ( response != "" && response != undefined ) {
    return msg.channel.sendMessage( response );
  } else {
      return;
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
