
class Command {
  constructor() {
    this.argsErrorMessage = 'Arguments are missing.\nRefer to `!help` or ask an Administrator if this error occurs.';
  }

  help(args, msg, commands) {
    let helpMsg = 'I am here to help! Well...mostly just make you chuckle at this point, let\'s be honest.\n\n';
    helpMsg += 'Here is a list of the commands that we\'ve got right now:\n';
    helpMsg += '\`\`\`\n';

    // Find the longest synopsis
    let longest = 0;
    commands.map((info) => {
      let { command } = info;
      command = `${process.env.MESSAGE_PREFIX}${command}`;
      if (command.length > longest) {
        longest = command.length;
      }
    });

    // Add an extra space
    longest += 1;
    commands.map((info) => {
      let { command, description } = info;
      command = `${process.env.MESSAGE_PREFIX}${command}`;
      helpMsg += `${command}`;
      const spaces = longest - command.length;
      for (let i = 0; i < spaces; i++) {
        helpMsg += ' ';
      }
      helpMsg += '→ ';
      helpMsg += `${description}\n`;
    });
    helpMsg += '\`\`\`';

    msg.reply('sliding into your DMs...');
    msg.author.sendMessage(helpMsg);
  }

  purge(args, msg) {
    const { guild } = msg;

    // Make sure the person doing the command is a Board Member
    const boardRole = guild.roles.find('name', 'Board Member');
    if (msg.member.roles.has(boardRole.id)) {
      // Grab the channels info
      const chan = msg.channel;
      const chanName = chan.name;
      const chanType = chan.type;

      // Delete the channel
      chan.delete()
        .then()
        .catch(console.error);

      // Now re-create the channel with the same name and type
      guild.createChannel(chanName, chanType)
        .then(channel => console.log(`Created new channel ${channel}`))
        .catch(console.error);
    } else {
      return msg.reply('sorry m8, you\'re not authorized to use that command.');
    }
    /* global bot */
    if (!guild.member(bot.user).hasPermission('MANAGE_CHANNELS')) {
      return msg.reply('sorry m8, you\'re not authorized to use that command.');
    }
  }

  rules(args, msg) {
    const { channel } = msg;
    return channel.sendMessage('Be nice and don\'t copy each other\'s homework!');
  }

  source(args, msg) {
    return msg.channel.sendMessage('Hack me at https://github.com/osu-cascades/hackbot');
  }
}

module.exports = Command;
