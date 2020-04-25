import {  Message } from 'discord.js';

jest.mock('discord.js');

// A snazzy Fixture™
export const mockMessage = {
  channel: {
    send: {}
  }
} as Message;

export type MockMessage = jest.MockInstance<Promise<Message|Message[]>, any> | any;
