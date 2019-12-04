import { GuildMember, Message, Role as DiscordRole, Collection } from 'discord.js';
import ICommand from '../library/iCommand';

// Hack for implementing with static properties/methods
let Role: ICommand;
export default Role = class {

  /* istanbul ignore next */
  static get description(): string {
    return 'Assigns a role to the user on request.';
  }

  public static execute(args: string[], msg: Message) {
    const { channel } = msg;
    const commandName = args[0];

    const validCommands:Map<string, ()=>void> = new Map([
      ['request', () => { requestCommand(args, msg) }],
      ['help', () => { helpCommand(msg) }]
    ]);

    const command = validCommands.get(commandName);

    if (command) {
      command();
    }
    else {
      return channel.send(`Role command "${command}" unknown. Use "role request [rolename]" to request a role, or "role help" for more information.`);
    }
  }
};

const yearRoleNames = [
  'Freshman',
  'Sophomore',
  'Junior',
  'Senior'
];

const requestCommand = (args: string[], msg: Message) => {
  const { channel } = msg;
  const lowerCaseName = args[1].toLowerCase();
  const foundRole = msg.guild.roles.find(r => r.name.toLowerCase() === lowerCaseName);
  const validRole = yearRoleNames.includes(foundRole.name);

  if (!foundRole) {
    return channel.send("Please enter a valid role. Try !role help");
  } // If role is null
  if (!validRole) {
    const validRolesString = yearRoleNames.join(', ');
    return channel.send(`You do not have permission to add role: "${foundRole}".\n
    Please add one of the following: ${validRolesString}`)
  }

  assignRoleHelper(foundRole, msg.member, msg);
};

const helpCommand = (msg: Message) => {
  msg.reply('Sliding into your DMs...').catch();
  return msg.author.send(`[ROLE HELP]: \n
  Automatically request a class standing role: \n
  Use command: *!role request role* \n
  Roles include: Freshman, Sophomore, Junior, Senior. These are case sensitive. \n
  Note: Requesting a role will remove you current role.`);
};

const assignRoleHelper = (role: any, author: GuildMember, msg: Message) => {
  const userAlreadyHasRole = msg.member.roles.has(role.id);
  if (userAlreadyHasRole) {
    return msg.channel.send(`Request cancelled: user already has role: ${role.name}`);
  }

  const userYearRoles = msg.guild.roles.filter(role => yearRoleNames.includes(role.name));
  const removeRolePromises = removeRoles(userYearRoles, author);

  Promise.all(removeRolePromises).then(() => {
    return author.addRole(role).then(() => {
      return msg.channel.send(`Role ${role} added!`);
    });
  }).catch(console.error);
};

const removeRoles = (roles:Collection<String, DiscordRole>, user: GuildMember):Array<Promise<GuildMember>>  => {
  const removeRolePromises:Array<Promise<GuildMember>> = [];

  roles.forEach(role => {
    removeRolePromises.push(user.removeRole(role));
  });

  return removeRolePromises;
}