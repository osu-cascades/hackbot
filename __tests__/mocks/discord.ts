import { Client, Guild, Message, TextChannel } from 'discord.js';

jest.mock('discord.js');

export const client = new Client();
export const guild = new Guild(client, {});
export const textChannel = new TextChannel(guild, {});
export const message = new Message(textChannel, false as any, client);
export type MockedMessage = jest.MockInstance<Promise<Message|Message[]>> | any;

message.channel = textChannel;
