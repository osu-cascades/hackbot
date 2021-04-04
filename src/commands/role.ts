import { GuildMember, Message, Role as DiscordRole, Collection } from 'discord.js';
import ICommand from '@/library/interfaces/iCommand';

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

    // Todo? Verify channel type to avoid DMs
    // Likely will break when updating to DiscordJS v12
    //  I think v12 has better typing
    if (!msg.guild) {
      return channel.send("Make sure you are running this in a channel that supports roles.");
    }

    const validCommands:Map<string, ()=>void> = new Map([
      ['request', () => { requestCommand(args, msg) }],
      ['help', () => { helpCommand(msg) }]
    ]);

    const command = validCommands.get(commandName);

    if (command) {
      return command();
    }
    else {
      return channel.send(`Role command "${commandName}" unknown. Use "role request [role name]" to request a role, or "role help" for more information.`);
    }
  }
};

const yearRoleNames = [
  'Freshman',
  'Sophomore',
  'Junior',
  'Senior'
];

const yearRoleNamesLowercase = yearRoleNames.map(name => name.toLocaleLowerCase());
const yearRoleNamesString = yearRoleNames.join(', ');

const requestCommand = (args: string[], msg: Message) => {
  const { channel } = msg;
  const requestedRole = args[1];
  const lowerCaseName = requestedRole.toLowerCase();

  const validRole = validateRole(lowerCaseName);
  if (!validRole) {
    return channel.send([`Role: "${lowerCaseName}" is invalid.`,
      `Please add one of the following: ${yearRoleNamesString}.`
    ].join("\n"));
  }

  const foundRole = findRole(lowerCaseName, msg);
  if (!foundRole) {
    return channel.send([
      `Could not find role: "${requestedRole}" on the server.`,
      `Please make sure the server administrator has added the following roles: ${yearRoleNamesString}`
    ].join("\n"));
  } // If role is null

  return assignRoleHelper(foundRole, msg.member, msg);
};

const helpCommand = (msg: Message) => {
  msg.reply('Sliding into your DMs...').catch();
  return msg.author.send([
    '**Role Command Help**:',
    'Automatically request a class standing role:',
    'Use command: `!role request role`',
    `Roles include: ${yearRoleNamesString}.`,
    '**Note**: Requesting a role will remove you current role.'
  ].join("\n"));
};

const validateRole = (roleName: string) => yearRoleNamesLowercase.includes(roleName);
const findRole = (roleName: string, msg: Message) => msg.guild.roles.find(r => r.name.toLowerCase() === roleName);
const userHasRole = (role: DiscordRole, msg: Message) => msg.member.roles.has(role.id);

const assignRoleHelper = (role: any, author: GuildMember, msg: Message): Promise<Message> => {
  const userAlreadyHasRole = userHasRole(role, msg);
  if (userAlreadyHasRole) {
    return msg.channel.send(`Request cancelled: user already has role: ${role.name}`);
  }

  const userYearRoles = author.roles.filter(role => yearRoleNames.includes(role.name));
  const removeRolePromise = author.removeRoles(userYearRoles);

  return removeRolePromise.then(() => {
    return author.addRole(role).then(() => {
      return msg.channel.send(`Role ${role} added!`);
    });
  }).catch((e) => {
    console.error(e);
    return msg.channel.send([
      'Seems Hackbot is not authorized to manage roles on this server or ran into an error.',
      'A server administrator will need to give **Permission** to Hackbot to **Manage Roles**.'
    ].join("\n"));
  });
};
