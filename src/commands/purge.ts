import { Client, DMChannel, GroupDMChannel, Guild, Message, TextChannel } from 'discord.js';
import ICommand from '../library/iCommand';

let Purge: ICommand;
type channelTypes = 'dm' | 'group' | 'text' | 'voice' | 'category' | 'text';

export default Purge = class {

  /* istanbul ignore next */
  static get description(): string {
    return 'Purges the channel it is called within. Restricted to Board Members and Administrators.';
  }

  public static execute(args: string[], msg: Message, bot: Client) {
    const { guild, channel } = msg;
    if (!this.canManageChannels(guild, bot)) { return this.cannotManageChannelReply(msg); }
    if (!this.userHasAccess(guild, msg)) { return this.unauthorizedReply(msg); }
    if (channel instanceof DMChannel || channel instanceof GroupDMChannel) {
      return this.invalidChannelType(msg);
    }

    const safeChannel: TextChannel = channel;
    return this.recreateChannel(guild, safeChannel, msg);
  }

  private static canManageChannels(guild: Guild, bot: Client) {
    return guild.member(bot.user).hasPermission('MANAGE_CHANNELS');
  }

  private static userHasAccess(guild: Guild, msg: Message) {
    const validRoles = ['Board Member', 'Admin'];
    const boardRole = guild.roles.find(role => validRoles.includes(role.name));
    return msg.member.roles.has(boardRole.id);
  }

  private static getChannelType(channel: TextChannel): channelTypes {
    return channel.type || 'text';
  }

  private static recreateChannel(guild: Guild, channel: TextChannel, msg: Message) {
    const chanName = channel.name;
    const channelType = this.getChannelType(channel);
    if (channelType === 'dm' || channelType === 'group') { return this.invalidChannelType(msg); }

    channel.delete()
      .then()
      .catch(console.error);

    return guild.createChannel(chanName, channelType)
      .then(newChannelName => console.log(`Created new channel ${newChannelName}`))
      .catch(console.error);
  }

  private static cannotManageChannelReply(msg: Message) {
    return msg.reply("Bot doesn't have manage channels permissions.");
  }

  private static unauthorizedReply(msg: Message) {
    return msg.reply("Sorry m8, you're not authorized to use that command.");
  }

  private static invalidChannelType(msg: Message) {
    return msg.reply("Invalid channel type.");
  }
};
