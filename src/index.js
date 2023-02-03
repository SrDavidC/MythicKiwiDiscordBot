require('dotenv').config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
  ],
});
client.commands = new Collection();
/**Default data**/

client.on('message', (message) => {
  console.log(message.content)
  if (message.author.bot) return;
  if (!(message.content.startsWith(client.commandPrefix))) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(command ==="pef"){
      message.channel.send(":yum: :yum:")
  }
});


client.commandArray = [];
client.embedDefaultColor = '#3EDDF6';
client.storeURL = `https://kiwiland.tebex.io/`;
client.serverIP = "MythicKiwi.net"
client.commandPrefix = "!";

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
client.login(token);
