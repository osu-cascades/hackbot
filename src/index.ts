import { Client } from 'discord.js';
import config from './config';
import Core from './library/core';

const client = new Client();
const core = new Core(client);

client.on('ready', () => core.ready);

client.on('message', core.message);

if (config.env === 'production') {
  client.on('guildMemberAdd', core.guildMemberAdd);
}

client.on('error', e => { console.error(e); });

client.login(config.discordAppToken);

export default client;
