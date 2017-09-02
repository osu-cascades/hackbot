const AdministrationCommand = require('../commands/administration');
const CoreCommand = require('../commands/core');
const FunCommand = require('../commands/fun');
const UsefulCommand = require('../commands/useful');

/**
 * TODO: 
 * - Migrate the command, description, and execution into the command files.
 * - Auto load all commands in the command folder.
 */
let commands = [
  {
    command: 'add [Integers]',
    description: 'Adds together _integers_ passed as arguments.',
    execution: { add: (args, msg) => UsefulCommand.add(args, msg) },
  },
  {
    command: 'gitProfile [Username]',
    description: 'Retrieves any public github profile.',
    execution: { gitProfile: (args, msg) => UsefulCommand.gitProfile(args, msg) },
  },
  {
    command: 'help',
    description: 'Displays this message',
    execution: { help: (args, msg, commands) => CoreCommand.help(args, msg, commands) },
  },
  {
    command: 'lmgtfy [Search Term]',
    description: 'When someone is being...lazy...?',
    execution: { lmgtfy: (args, msg) => UsefulCommand.lmgtfy(args, msg) },
  },
  {
    command: 'magic8ball [Question]',
    description: 'Ask and you shall recieve... a vague, randomly generated response.',
    execution: { magic8ball: (args, msg) => FunCommand.magic8ball(args, msg) },
  },
  {
    command: 'purge',
    description: 'Purges the channel it is called within. Restricted to Board Members and Administrators.',
    execution: { purge: (args, msg) => AdministrationCommand.purge(args, msg) },
  },
  {
    command: 'rules',
    description: 'List the rules for the CTC Discord server.',
    execution: { rules: (args, msg) => CoreCommand.rules(args, msg) },
  },
  {
    command: 'say [Phrase]',
    description: 'Echos back the string passed as arguments.',
    execution: { say: (args, msg) => FunCommand.say(args, msg) },
  },
  {
    command: 'search [Search Term]',
    description: 'Searches the web for the passed query and return the top result.',
    execution: { search: (args, msg) => UsefulCommand.search(args, msg) },
  },
  {
    command: 'source',
    description: 'Retrieves the hackBot\'s github repository.',
    execution: { source: (args, msg) => CoreCommand.source(args, msg) },
  },
  {
    command: 'weather [Location]',
    description: 'Provide City and State, or City and Country to get current temperature.',
    execution: { weather: (args, msg) => UsefulCommand.weather(args, msg) },
  },
  {
    command: 'xmas',
    description: 'Merry Christmas, ya filthy animals.',
    execution: { xmas: (args, msg) => FunCommand.xmas(args, msg) },
  },
];

module.exports = commands;
