# hackbot

|branch|build status|bots|
|---|---|---|
|master|[![Build Status](https://travis-ci.org/osu-cascades/hackbot.svg?branch=master)](https://travis-ci.org/osu-cascades/hackbot)| [![Greenkeeper badge](https://badges.greenkeeper.io/osu-cascades/hackbot.svg)](https://greenkeeper.io/) |
|staging|[![Build Status](https://travis-ci.org/osu-cascades/hackbot.svg?branch=staging)](https://travis-ci.org/osu-cascades/hackbot)|

A Discord bot for the Cascades Tech Club [Discord](http://discordapp.com) server. To add a command, see the [Commands](#commands) section below.

## Setup

To work on _hackbot_, you should:

1. Clone this repository: `git clone https://github.com/osu-cascades/hackbot.git`
2. Install the latest [node.js](https://nodejs.org).
3. Install the dependencies: `cd hackbot && npm install`
4. Log in to Discord, visit the Developer resources interface, and navigate to [the _My Apps_ screen](https://discordapp.com/developers/applications/me).
5. Add a new app and give it a name, eg. _hackbot-myname-dev_.
6. Click the _Create a Bot User_ button.
7. Notice the Client ID, reveal your app's Token, and record them both for later.
8. Visit [https://discordapp.com/oauth2/authorize?client_id=INSERT_CLIENT_ID_HERE&scope=bot&permissions=0](https://discordapp.com/oauth2/authorize?client_id=INSERT_CLIENT_ID_HERE&scope=bot&permissions=0), replacing the placeholder with your real Client ID.
9. Select the server that you want the bot to join.
10. Copy the hidden **.env-example** file to **.env**, and replace the placeholder values with your own.[1]
11. Run the bot from the command line: `npm start`
12. Hack...

[1] _The !search command requires a Google API key from the [Google API Console](https://console.developers.google.com) and the !weather command requires an API key from [OpenWeather.org](https://openweathermap.org/)_

## Suggested Workflow

In a nutshell, work in the [dev](https://github.com/osu-cascades/hackbot/tree/dev) branch and don't merge to [master](https://github.com/osu-cascades/hackbot/tree/master) unless:

1. You've communicated your changes to others and given folks a _little_ time to respond (or ideally, do a code review).
2. Your changes are innocuous.

In all cases, be sure to run the test suite to make sure all tests pass. _All tests should be passing before you merge dev to master_.

You should embrace testing. _hackbot_ uses the [Jest](https://facebook.github.io/jest/) test framework. Have two console panes open: one for running and watching the test suite, and the other for everything else you need to do. You can run the test suite once with `npm test`. Once you get tired of running `npm test` manually, use the watcher by running `npm run test:watch`. It is sweet and people will think you are a super hacker. Look at `__tests__/commands/add.test.ts` for an example of how to test commands and their channel messages. If you use VSCode for your IDE there's a Jest extension that will run a watcher and give you inline updates on your tests, as well as a few other awesome features!

Please refer to [airbnb's style guide](https://github.com/airbnb/javascript) while coding.

For now try to keep the linter happy. You can see any lint issues by running `npm run lint`. Some issues can be auto-fixed with `npm run lint:fix`

## Commands

To enable hackbot to respond to a new command, all you need to do is:

1. Copy the existing *src/commands/_template.js* to a new, well-named js file in the _commands_ directory: `cp src/commands/_template.ts src/commands/foo.ts`.
2. In your new js file, replace occurrences of `CommandName` with your actual command name. Ensure that this js file contains a class definition that extends `Command` and implements the static `description` and `execute` methods. See _add.js_ or _say.js_ for some simple examples.

## Deploying

Hackbot is hosted on [Heroku](https://heroku.com) as two _worker_-based applications:

* osu-hackbot
* osu-hackbot-staging

Once you're happy with your new _hackbot_ feature running on your development environment, deploy it to staging so that the bot stays running and other people
can try it out. This bot is always named _hackbot-staging_. Once you're happy, you can deploy it to production; this bot is always named _hackbot_.

1. Get a [Heroku](https://heroku.com) account.
2. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).
3. Become a collaborator on the staging and production apps (ask others how).
4. Add the remotes for staging and production: `heroku git:remote -a osu-hackbot -r production && heroku git:remote -a osu-hackbot-staging -r staging`
5. Deploy to staging: `git push staging` or `git push staging dev:master` or `git push staging feature-branch-name:master`.
6. Deploy to production: `git push production`.

## References

* [Creating a Discord bot and getting a token](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)
* [Tutorial: Creating a Simple Discord Bot](https://medium.com/@renesansz/tutorial-creating-a-simple-discord-bot-9465a2764dc0)
* [Video Series: Creating a Discord bot with Discord.js!](https://youtu.be/rVfjZrqoQ7o)
* [Deploying a Bot on Heroku](http://shiffman.net/a2z/bot-heroku/)
* [discord.js Documentation](https://discord.js.org)

___
©2018 All rights reserved.

Thanks to our [contributors](https://github.com/osu-cascades/hackbot/graphs/contributors)!
