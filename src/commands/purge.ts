import { Channel, Client, DMChannel, GroupDMChannel, Guild, Message, TextChannel } from 'discord.js';
import ICommand from '../library/iCommand';
import { botHasPermissions, memberIsBoardMember } from './helpers/permissions';

let Purge: ICommand;

export default Purge = class {

  /* istanbul ignore next */
  static get description(): string {
    return 'Purges the channel it is called within. Restricted to Board Members and Administrators.';
  }

  public static execute(args: string[], msg: Message, client: Client) {
    const { channel, guild, member, reply } = msg;

    if (!botHasPermissions(client, guild)) {
      return reply("Bot doesn't have manage channels permissions.");
    }

    if (!memberIsBoardMember(member, guild)) {
      return reply("Sorry m8, you're not authorized to use that command.");
    }

    this.recreateChannel(guild, channel);
  }

  private static recreateChannel(guild: Guild, channel: DMChannel | TextChannel | GroupDMChannel) {
    // Grab the channels info
    const channelName = this.channelName(channel);
    const channelType = this.channelType(channel);

    if (!channelName || channelType === 'dm' || channelType === 'group') {
      return;
    }

    // Delete the channel
    this.deleteChannel(channel);

    // Now re-create the channel with the same name and type
    this.createChannel(guild, channelName, channelType);
  }

  private static channelName(channel: DMChannel | TextChannel | GroupDMChannel) {
    if (channel instanceof DMChannel) {
      return false;
    }
    else {
      return channel.name;
    }
  }

  private static channelType(channel: Channel) {
    return channel.type || 'text';
  }

  private static deleteChannel(channel: Channel) {
    channel.delete()
    .then()
    .catch(console.error);
  }

  private static createChannel(guild: Guild, name: string, type: "category" | "text" | "voice") {
    guild.createChannel(name, type)
      .then(newName => console.log(`Created new channel ${newName}`))
      .catch(console.error);
  }

};
