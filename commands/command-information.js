var commandInformation = [
  {
      command: "help",
      description: "Displays this message"
  },
  {
      command: "say [Phrase]",
      description: "Echos back the string passed as arguments."
  },
  {
      command: "lmgtfy [Search Term]",
      description: "When someone is being...lazy...?"
  },
  {
      command: "search [Search Term]",
      description: "Searches the web for the passed query and return the top result."
  },
  {
      command: "add [Integers]",
      description: "Adds together _integers_ passed as arguments."
  },
  {
      command: "rules",
      description: "List the rules for the CTC Discord server.",
  },
  {
      command: "xmas",
      description: "Merry Christmas, ya filthy animals.",
  },
  {
      command: "purge",
      description: "Purges the channel it is called within. Restricted to Board Members and Administrators.",
  },
  {
      command: "weather [Location]",
      description: "Provide City and State, or City and Country to get current temperature.",
  },
  {
      command: "source",
      description: "Retrieves the hackBot's github repository.",
  },
  {
      command: "gitProfile [Username]",
      description: "Retrieves any public github profile.",
  }
]

module.exports = commandInformation;
