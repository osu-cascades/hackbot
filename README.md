# hackbot

A Discord bot for the Cascades Tech Club [Discord](http://discordapp.com) server.

To work on hackbot, you should:

1. Clone this repository: `git clone https://github.com/osu-cascades/hackbot.git`
2. Install the latest [node.js](https://nodejs.org).
3. Install the dependencies: `npm install`
4. [Login to Discord and go to your Apps page](https://discordapp.com/developers/applications/me).
5. Add a new App, give it a name.
6. Click the 'Create a Bot User' button.
7. Save your Client ID and secret Token for later.
8. Open [this link](https://discordapp.com/oauth2/authorize?client_id=INSERT_CLIENT_ID_HERE&scope=bot&permissions=0) and replace the placeholder with your Client ID.
9. Select the server that you want the bot to join.
10. Rename the config-example.json file to config.json after you have replaced the keys with your own.*
11. Run the bot from the command line: `node hackbot.js`
12. Hack...

&ast; _the !weather command requires an API key from [OpenWeather.org](https://openweathermap.org/)_

## References

[Creating a Discord bot and getting a token](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)
[Tutorial: Creating a Simple Discord Bot](https://medium.com/@renesansz/tutorial-creating-a-simple-discord-bot-9465a2764dc0)

(c) 2017 [Justin Tappert](https://github.com/JWTappert), [Adam DuQuette](https://github.com/DukeOfEtiquette), [Steven Harding](https://github.com/Otis0620). All rights reserved.
