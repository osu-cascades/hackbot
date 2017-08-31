const Discord = require('discord.js');
const config = require('./config.json');
const CommandParser = require('./commands/command-parser');
const Command = require('./commands/command');

const bot = new Discord.Client();
const cmdParser = new CommandParser(config.prefix, new Command());

bot.on('ready', () => {
    console.log(`Ready to serve in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
});

bot.on('message', msg => {
    response = cmdParser.parse(msg);
    if ( response !== "" && response !== undefined ) {
         return response;
    } else {
        return;
    }
});

bot.on('guildMemberAdd', (member) => {
    var { username } = member.user;
    console.log(`New User "${username}" has joined "${member.guild.name}"` );
    member.guild.defaultChannel.sendMessage(`"${username}" has joined this server`);
});

bot.on('error', e => { console.error(e); });

bot.login(config.token);
