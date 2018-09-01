interface executable {
  execute(args: string[], msg: string): void;
  readonly argsErrorMessage: string;
}

/**
 * An interface for all commands to extend, representing the API that all
 * subclasses should implement.
 *
 * @class Command
 */
export default interface Command {
  new(): executable
  readonly description: string;
}
