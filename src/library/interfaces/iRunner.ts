/**
 * An interface for all code runners to extend, representing the API that all
 * subclasses should implement.
 *
 * @class Runner
 */

 export default interface IRunner {
     execute(code: string): Promise<{success: boolean, output: string}>;
 }