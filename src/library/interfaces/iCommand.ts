import CommandContext from "../commandContext";

/**
 * An interface for all commands to extend, representing the API that all
 * subclasses should implement.
 *
 * @class Command
 */
export default interface ICommand {
  readonly name: string;
  readonly description: string;
  execute(ctx: CommandContext): void;
}
