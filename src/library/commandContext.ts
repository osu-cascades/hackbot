import { Client, Message } from "discord.js";
import Commands from "./commands";

export default class CommandContext {
  constructor(
    public args: string[],
    public msg: Message,
    public client: Client,
    public commands: Commands
  ) {}
}
