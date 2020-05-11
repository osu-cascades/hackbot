import ICommand from '@/library/interfaces/iCommand';
import Languages from '@/library/languages';
import axios, { AxiosResponse } from 'axios';
import { Message } from 'discord.js';
import { parse } from 'querystring';

// Hack for implementing with static properties/methods
let CodeRunner: ICommand;
export default CodeRunner = class {

  /* istanbul ignore next */
  static get description(): string {
    return 'Executes provided code using a LanguageRunner';
  }

  public static execute(args: string[], msg: Message, extra: {
    languages: Languages
  }) {

    let parseResponse;

    try {
      parseResponse = this.parseCode(msg.content);
      if (!extra.languages.get(parseResponse.language)) {
        msg.channel.send(`Unknown language: ${parseResponse.language}`);
        return;
      }
    } catch {
      msg.channel.send("Sorry, I wasn't able to understand your formatting. Please try again.");
      return;
    }

    const codeRunnerResponse = extra.languages.get(parseResponse.language).execute(parseResponse.code);

    codeRunnerResponse.then(response => {
      if (response.success) {
        msg.channel.send("```" + response.output + "```");
      } else {
        msg.channel.send(
          "Unfortunately I was unable to run your code. Here is the error I received.\n```" +
          response.output +
          "```"
        );
      }
    });

  }

  // Tries to pull language and source code out of message
  private static parseCode(messageText: string): { language: string, code: string } {
    const codeRegex = /(```(.[^\n]*))(\n(.*))(```)/s;
    const match = codeRegex.exec(messageText);

    // Group 2 = language, group 4 = code
    if (match && match[2] && match[4]) {
      return { language: match[2], code: match[4] };
    } else {
      throw new Error(`Unable to extract code from ${messageText}`);
    }
  }

};
