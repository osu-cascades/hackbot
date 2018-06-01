require('dotenv').config();

const defaults = {
  defaultChannel: process.env.DEFAULT_CHANNEL,
  discordAppToken: process.env.DISCORD_APP_TOKEN,
  env: process.env.NODE_ENV || 'production',
  messagePrefix: process.env.MESSAGE_PREFIX,
  production: process.env.NODE_ENV === 'production'
};

const plugins = {
  googleApiKey: process.env.GOOGLE_API_KEY,
  googleSearchEngineId: process.env.GOOGLE_SEARCH_ENGINE_ID,
  openWeathermapKey: process.env.OPEN_WEATHERMAP_KEY
};

// defaults overwrite plugins
module.exports = Object.assign(plugins, defaults);