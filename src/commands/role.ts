import {GuildMember, Message} from 'discord.js';
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
    const command = args[0];
    const roleRequest = msg.guild.roles.find(r => r.name === args[1]); // Finds role based on input

    if (command === "request") {
      if (!roleRequest) { return channel.send("Please enter a valid role. Try !role help"); } // If role is null
      assignRoleHelper(roleRequest, msg.member, msg);
    } else if (command === "help") {
      getHelp(msg);
    }
    else {
      return channel.send("Role command unknown. Use 'role request [rolename]' to request a role.");
    }
  }

};

const assignRoleHelper = (role: any, author: GuildMember, msg: Message) => {
  // Constants for each possible role
  const freshman = msg.guild.roles.find(r => r.name === "Freshman");
  const sophomore = msg.guild.roles.find(r => r.name === "Sophomore");
  const junior = msg.guild.roles.find(r => r.name === "Junior");
  const senior = msg.guild.roles.find(r => r.name === "Senior");

  // Does the user already have this role?
  if (msg.member.roles.has(role.id)) {
    return msg.channel.send(`Request cancelled: user already has ${role}`);
  } else {
    // Remove all possible roles and ignore errors
    author.removeRole(freshman).catch();
    author.removeRole(sophomore).catch();
    author.removeRole(junior).catch();
    author.removeRole(senior).catch();
    // Add new role
    author.addRole(role).catch(console.error);
    return msg.channel.send(`Role ${role} added!`);
  }
};

const getHelp = (msg: Message) => {
  msg.reply('sliding into your DMs...').catch();
  return msg.author.send(`[ROLE HELP]: \n Automatically request a class standing role: \n
  Use command: *!role request role* \n
  Roles include: Freshman, Sophomore, Junior, Senior. These are case sensitive. \n
  Note: Requesting a role will remove you current role.`);
};
