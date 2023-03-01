require('dotenv').config();
const { token } = process.env;
const { DisTube } = require('distube')
const { Client, Collection, GatewayIntentBits,  } = require('discord.js');
const fs = require('fs');
const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildVoiceStates
  ],
});
const { Player } = require('discord-player');
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')
client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ]
})
// "../../../config.json"
client.config = require("../config.json");
client.commands = new Collection();
client.emotes = client.config.emoji;
client.color = client.config.client_color
/**Default data**/

client.commandArray = [];
client.embedDefaultColor = '#3EDDF6';
client.storeURL = `https://kiwiland.tebex.io/`;
client.serverIP = "MythicKiwi.net"
client.commandPrefix = "!";
client.serverName = "MythicKiwi";

 /*Reading information*/ 
const functionFolders = fs.readdirSync('./src/functions');
for (const folder of functionFolders) {
  const functionFiles = fs.readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith('.js'));
    for (const file of functionFiles)
      require(`./functions/${folder}/${file}`)(client);
  }

client.handleEvents();
client.handleCommands();
client.handleMusicEvents();

client.player = new Player(client, {
  ytdlOptions: {
      quality: "highestaudio",
      highWaterMark: 1 << 25
  }
})

client.login(token);
