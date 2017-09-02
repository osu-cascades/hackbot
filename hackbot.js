require('dotenv').config();
const Discord = require('discord.js');
const CommandParser = require('./commands/command-parser');
const Command = require('./commands/command');

const bot = new Discord.Client();
const cmdParser = new CommandParser(process.env.MESSAGE_PREFIX);
const commandRunner = new Command();

bot.on('ready', () => {
  console.log(`Ready to serve in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
});

bot.on('message', msg => {
  if (
    !msg.content.startsWith(process.env.MESSAGE_PREFIX) ||
    msg.content.length <= process.env.MESSAGE_PREFIX.length
  ) {
    return;
  } else {
    let [command, args] = cmdParser.parse(msg);
    try {
      return commandRunner[command](args, msg);
    } catch( error ) {
      console.log(`Error on command: ${cmd} \n${error}` );
      return 'Sorry, I didn\'t get that.';
    }
  }
});

bot.on('guildMemberAdd', (member) => {
  var { username } = member.user;
  console.log(`New User '${username}' has joined '${member.guild.name}'` );
  member.guild.defaultChannel.sendMessage(`'${username}' has joined this server`);
});

bot.on('error', e => { console.error(e); });

bot.login(process.env.DISCORD_APP_TOKEN);
