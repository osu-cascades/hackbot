require('dotenv').config();
const Discord = require('discord.js');
const CommandParser = require('./commands/command-parser');
const commands = require('./commands/command-information');

const bot = new Discord.Client();
const cmdParser = new CommandParser(process.env.MESSAGE_PREFIX);

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
      const singleCommandArray = commands.filter(cmd => cmd.execution[command]);
      if (command === 'help') {
        singleCommandArray.map(cmd => cmd.execution[command](args, msg, commands))
      } else {
        singleCommandArray.map(cmd => cmd.execution[command](args, msg))
      }
    } catch( error ) {
      console.log(`Error on command: ${command} \n${error}` );
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
