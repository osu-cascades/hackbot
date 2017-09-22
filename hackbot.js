require('dotenv').config();
const Discord = require('discord.js');
const CommandParser = require('./library/command-parser');
const Commands = require('./library/commands');

const bot = new Discord.Client();
const cmdParser = new CommandParser(process.env.MESSAGE_PREFIX);
const commands = new Commands();

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
    let [commandName, args] = cmdParser.parse(msg);
    try {
      if(commands.has(commandName)) {
        commands.run(commandName, args, msg);
      }
    } catch( error ) {
      console.log(`Error on command: ${commandName} \n${error}`);
      return 'Sorry, I didn\'t get that.';
    }
  }
});

if (process.env.NODE_ENV === 'production') {
  bot.on('guildMemberAdd', (member) => {
    var { username } = member.user;
    console.log(`New User '${username}' has joined '${member.guild.name}'` );
    member.guild.defaultChannel.sendMessage(`'${username}' has joined this server`);
  });
}

bot.on('error', e => { console.error(e); });

bot.login(process.env.DISCORD_APP_TOKEN);
