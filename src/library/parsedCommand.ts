export default class ParsedCommand {
  public commandName: string;
  public args: string[];

  constructor(commandName: string, args: string[]) {
    this.commandName = commandName;
    this.args = args;
  }
}