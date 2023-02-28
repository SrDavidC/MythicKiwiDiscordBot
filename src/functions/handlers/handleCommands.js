const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { guild_ids } = require("../../../config.json");
const fs = require('fs');

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
      for (const folder of commandFolders) {
          const commandFiles = fs.readdirSync(`./src/commands/${folder}`)
            .filter((file)=> file.endsWith(".js"));

            const { commands, commandArray} = client;
            for (const file of commandFiles) {
              const command = require(`../../commands/${folder}/${file}`);
              commands.set(command.data.name, command);
              commandArray.push(command.data.toJSON());
              console.log(`Command: ${command.data.name} has been passed ` +
              "through the handler");
            }
        }
        const clientID = process.env.clientid;
        const rest = new REST({version: '9'}).setToken(process.env.token);
        for (const guildId of guild_ids) {
          try {
            console.log("Started refreshing application (/) commands for guild " + guildId);
            await rest.put(Routes.applicationGuildCommands(clientID, guildId), {
              body: client.commandArray,
            });

            console.log("Successfuly reloaded application (/) commands for guild " + guildId);
          } catch (error) {
            console.error(error);
          }
        }
      };
};

