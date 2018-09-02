import { Client } from 'discord.js';
import CommandParser from './library/command-parser';
import Commands from './library/commands';
import config from './config';

const bot = new Client();
const cmdParser = new CommandParser(config.messagePrefix);
const commands = new Commands();

bot.on('ready', () => {
  console.log(`Ready to serve in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
  console.log(`Servers: ${bot.guilds.map(g=>g.name).join(', ')}`);
});

bot.on('message', msg => {
  const parsedCommand = cmdParser.parse(msg);

  if (!parsedCommand) {
    return;
  }

  const { commandName, args } = parsedCommand;
  const { channel } = msg;

  try {
    if (args.length < 1) {
      return channel.send('Arguments are missing.\nRefer to `!help`');
    }
    else if(commands.has(commandName)) {
      return commands.run(commandName, args, msg);
    }
    else {
      return channel.send(`Command not found: ${commandName}`);
    }
  }
  catch( error ) {
    console.error(`Error on command: ${commandName} \n${error}`);
  }
});

if (config.env === 'production') {
  bot.on('guildMemberAdd', (member) => {
    var { username, id } = member.user;
    console.log(`New User '${username}' has joined '${member.guild.name}'`);

    const defaultChannel = member.guild.defaultChannel
      || member.guild.channels.find('name', config.defaultChannel);

    if (defaultChannel) {
      defaultChannel.send(`'${username}' has joined this server`);
      defaultChannel.send(`Welcome, <@${id}> !`);
    } else {
      console.warn('This server has no defaultChannel property. (It might be too new.) If you are running the bot locally, please specify the default channel in .env.');
    }
  });
}

bot.on('error', e => { console.error(e); });

bot.login(config.discordAppToken);
