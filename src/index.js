require('dotenv').config();
const { token } = process.env;
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
client.commands = new Collection();
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

client.player = new Player(client, {
  ytdlOptions: {
      quality: "highestaudio",
      highWaterMark: 1 << 25
  }
})

client.login(token);
