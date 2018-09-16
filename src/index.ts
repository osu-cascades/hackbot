import { Client } from 'discord.js';
import config from './config';
import CommandParser from './library/command-parser';
import Commands from './library/commands';

const bot = new Client();
const cmdParser = new CommandParser(config.messagePrefix);
const commands = new Commands();

bot.on('ready', () => {
  console.log(`Ready to serve in ${bot.channels.size} channels on ${bot.guilds.size} servers` +
    `, for a total of ${bot.users.size} users.`);
  console.log(`Servers: ${bot.guilds.map(g => g.name).join(', ')}`);
});

bot.on('message', msg => {
  const parsedCommand = cmdParser.parse(msg.content);

  if (!parsedCommand) {
    return;
  }

  const { commandName, args } = parsedCommand;
  const { channel } = msg;

  try {
    const command = commands.get(commandName);
    if (command) {
      return command.execute(args, msg, bot);
    }
    else {
      return channel.send(`Command not found: ${commandName}`);
    }
  }
  catch ( error ) {
    console.error(`Error on command: ${commandName} \n${error}`);
  }
});

if (config.env === 'production') {
  bot.on('guildMemberAdd', (member) => {
    const { username, id } = member.user;
    console.log(`New User '${username}' has joined '${member.guild.name}'`);

    const defaultChannel = member.guild.defaultChannel
      || member.guild.channels.find('name', config.defaultChannel);

    if (defaultChannel) {
      defaultChannel.send(`'${username}' has joined this server`);
      defaultChannel.send(`Welcome, <@${id}> !`);
    }
    else {
      console.warn('This server has no defaultChannel property. (It might be too new.) ' +
        'If you are running the bot locally, please specify the default channel in .env.');
    }
  });
}

bot.on('error', e => { console.error(e); });

bot.login(config.discordAppToken);
