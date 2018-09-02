import Command from '../library/command';
import { Message, DMChannel, Client } from 'discord.js';

let Purge: Command;

export default Purge = class {

  public static get description():string {
    return 'Purges the channel it is called within. Restricted to Board Members and Administrators.';
  }

  public static execute(args: string[], msg: Message, bot: Client) {
    const { guild } = msg;

    // Make sure the person doing the command is a Board Member
    const boardRole = guild.roles.find('name', 'Board Member');
    if (msg.member.roles.has(boardRole.id)) {
      const { channel } = msg;

      if (channel instanceof DMChannel) {
        return;
      }

      // Grab the channels info
      const chanName = channel.name;
      const chanType = channel.type || 'text';

      if (chanType == 'dm' || chanType == 'group') {
        return;
      }

      // Delete the channel
      channel.delete()
        .then()
        .catch(console.error);

      // Now re-create the channel with the same name and type
      guild.createChannel(chanName, chanType)
        .then(newChannelName => console.log(`Created new channel ${newChannelName}`))
        .catch(console.error);
    } else {
      return msg.reply('sorry m8, you\'re not authorized to use that command.');
    }
    /* global bot */
    if (!guild.member(bot.user).hasPermission('MANAGE_CHANNELS')) {
      return msg.reply('sorry m8, you\'re not authorized to use that command.');
    }
  }

}
