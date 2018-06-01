const config = require('./config/config');
const Discord = require('discord.js');
const CommandParser = require('./library/command-parser');
const Commands = require('./library/commands');

const bot = new Discord.Client();
const cmdParser = new CommandParser(config.messagePrefix);
const commands = new Commands();

bot.on('ready', () => {
  console.log(`Ready to serve in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
  console.log(`Servers: ${bot.guilds.map(g=>g.name).join(', ')}`);
});

bot.on('message', msg => {
  if (
    !msg.content.startsWith(config.messagePrefix) ||
    msg.content.length <= config.messagePrefix.length
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

if (config.production) {
  bot.on('guildMemberAdd', (member) => {
    var { username, id } = member.user;
    console.log(`New User '${username}' has joined '${member.guild.name}'`);

    const defaultChannel = member.guild.defaultChannel
      || member.guild.channels.find('name', config.defaultChannel);

    if (defaultChannel) {
      defaultChannel.send(`'${username}' has joined this server`);
      defaultChannel.send(`Welcome, <@${id}> !`);
    } else {
      console.log('This server has no defaultChannel property. (It might be too new.) If you are running the bot locally, please specify the default channel in .env.');
    }
  });
}

bot.on('error', e => { console.error(e); });

bot.login(config.discordAppToken);
