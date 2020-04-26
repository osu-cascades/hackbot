import ICommand from '@/library/iCommand';
import { Client, DMChannel, Message } from 'discord.js';

let Purge: ICommand;

export default Purge = class {

  /* istanbul ignore next */
  static get description(): string {
    return 'Purges the channel it is called within. Restricted to Board Members and Administrators.';
  }

  public static execute(
    args: string[],
    msg: Message,
    { client: bot }: { client: Client }
  ) {
    const { guild } = msg;

    /* global bot */
    if (!guild.member(bot.user).hasPermission('MANAGE_CHANNELS')) {
      return msg.reply("Bot doesn't have manage channels permissions.");
    }

    // Make sure the person doing the command is a Board Member
    const boardRole = guild.roles.find(role => role.name === 'Board Member' || role.name === 'Admin');
    if (msg.member.roles.has(boardRole.id)) {
      const { channel } = msg;

      if (channel instanceof DMChannel) {
        return;
      }

      // Grab the channels info
      const chanName = channel.name;
      const chanType = channel.type || 'text';

      if (chanType === 'dm' || chanType === 'group') {
        return;
      }

      // Delete the channel
      channel.delete()
        // @ts-ignore
        .then(console.log)
        .catch(console.error);

      // Now re-create the channel with the same name and type
      guild.createChannel(chanName, chanType)
        .then(newChannelName => console.log(`Created new channel ${newChannelName}`))
        .catch(console.error);
    } else {
      return msg.reply("Sorry m8, you're not authorized to use that command.");
    }
  }

};
