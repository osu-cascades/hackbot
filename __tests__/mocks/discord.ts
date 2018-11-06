import { Client, Guild, Message, TextChannel } from 'discord.js';
import { type } from 'os';

jest.mock('discord.js');

export const client = new Client();
export const guild = new Guild(client, {});
export const textChannel = new TextChannel(guild, {});
export const message = new Message(textChannel, false as any, client);
export type MockedMessage = jest.MockInstance<Promise<Message|Message[]>>;

message.channel = textChannel;
