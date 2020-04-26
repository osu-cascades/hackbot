import { Client, Message } from "discord.js";
import Commands from "@/commands";

/**
 * An interface for all commands to extend, representing the API that all
 * subclasses should implement.
 *
 * @class Command
 */
export default interface ICommand {
  readonly name: string;
  readonly description: string;
  execute(args: string[], msg: Message, extra?: {
    client?: Client,
    commands?: Commands
  }): void;
}
