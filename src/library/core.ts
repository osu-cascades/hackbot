import glob from 'glob';
import { Client, GuildMember, Message, TextChannel } from 'discord.js';
import config from '../config';
import CommandLoader from './commandLoader';
import CommandParser from './commandParser';
import Commands from './commands';

const cmdParser = new CommandParser(config.messagePrefix);

const commandFiles = glob.sync(config.commandsPathGlob);
const commandClasses = CommandLoader.getCommandClasses(commandFiles);
const commands = new Commands(commandClasses);

export default class Core {

  constructor(public client: Client) { }

  public ready() {
    console.log(
      `Ready to serve in ${this.client.channels.size} channels on ${this.client.guilds.size} servers, ` +
      `for a total of ${this.client.users.size} users.\n` +
      `Servers: ${this.client.guilds.map(g => g.name).join(', ')}`
    );
  }

  public message(msg: Message) {
    const parsedCommand = cmdParser.parse(msg.content);

    if (!parsedCommand) {
      return;
    }

    const { commandName, args } = parsedCommand;
    const { channel } = msg;

    try {
      const command = commands.get(commandName);
      if (command) {
        return command.execute(args, msg, {
          client: this.client,
          commands
        });
      }
      else {
        return channel.send(`Command not found: ${commandName}`);
      }
    }
    catch (error) {
      console.error(`Error on command: ${commandName} \n${error}`);
    }
  }

  public guildMemberAdd(member: GuildMember) {
    const { username, id } = member.user;
    console.log(`New User '${username}' has joined '${member.guild.name}'`);

    const configChannel = config.welcomeChannel ? member.guild.channels.find('name', config.welcomeChannel) : undefined;
    const defaultChannel = configChannel || member.guild.defaultChannel;

    if (defaultChannel && defaultChannel instanceof TextChannel) {
      defaultChannel.send(`'${username}' has joined this server`);
      defaultChannel.send(`Welcome, <@${id}> !`);
    }
    else {
      console.warn('This server has no defaultChannel property. (It might be too new.) ' +
        'If you are running the bot locally, please specify the default channel in .env. ' +
        'Make sure the channel is a text channel.');
    }
  }
}
