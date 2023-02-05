const minecraftServerStatus = require('minecraft-server-util');
const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
    client.minecraftServerStatus = async (serverIP, channel) => {
        minecraftServerStatus.status(serverIP).then((result => {
            // console.log(result);
            const embed = new EmbedBuilder()
                .setColor('#1F8B4C')
                .setTitle(serverIP)
                .setThumbnail(`https://api.mcstatus.io/v2/icon/${serverIP}`)
                .addFields(
                    { name: 'Status', value: 'Online' },
                    { name: 'Online Players', value: `${result.players.online}` },
                    { name: 'Max Players', value: `${result.players.max}` },
                    { name: 'Server IP', value: `${serverIP}` },
                    { name: 'MOTD', value: `${result.motd.rawv}` },
                    { name: 'Version', value: `${result.version.name}` }
                )
                .setTimestamp(Date.now())
                .setFooter({
                    iconURL: client.user.displayAvatarURL(),
                    text: `Status provided by ${client.serverName} Discord bot`
                });
            channel.send({ embeds: [embed] });
        }))
            .catch((error) => {
                console.log(`Error searching server ${serverIP}`);
                channel.send("Server not found. Maybe the server doesn't exists or is down");
                // throw error;
            })

    }
}
