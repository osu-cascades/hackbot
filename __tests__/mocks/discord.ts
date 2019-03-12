import { Client, Guild, Message, TextChannel } from 'discord.js';

jest.mock('discord.js');

export const client = new Client();
export const guild = new Guild(client, {});
export const textChannel = new TextChannel(guild, {});
export const message = new Message(textChannel, {}, client);

message.channel = textChannel;
