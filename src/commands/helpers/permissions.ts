import { Client, Guild, GuildMember } from "discord.js";

export function memberCanManageChannels(member: GuildMember) {
  return member.hasPermission('MANAGE_CHANNELS');
}

export function boardRole(guild: Guild) {
  return guild.roles.find(role => role.name === 'Board Member' || role.name === 'Admin')
}

export function botHasPermissions(client: Client, guild: Guild) {
  /* global bot */
  const { user } = client;
  const member = guild.member(user);
  return !memberCanManageChannels(member);
}

export function memberIsBoardMember(member: GuildMember, guild: Guild) {
  const boardRoleId = boardRole(guild).id;
  return member.roles.has(boardRoleId);
}
