const { SlashCommandBuilder, Embed, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('mcstatusserver')
    .setDescription('Returns status of a minecraft server')
    .addStringOption( option =>
        option
        .setName("ipadress")
        .setDescription("ip adress of the minecraft server")
        .setRequired(true))
    ,async execute(interaction, client) {
        const ipAdress = interaction.options.getString('ipadress');
        client.minecraftServerStatus(ipAdress, interaction.channel);
        await interaction.reply({
            content: 'Server founded!'
        });
    },
}