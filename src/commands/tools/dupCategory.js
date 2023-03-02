const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('dupcategory')
    .setDescription('Duplica una categoría, conservando los permisos y creada con el nombre <nombre de la categoría>-copy')
    .addStringOption(option =>
        option
        .setName("categoria")
        .setDescription("Categoria a duplicar")
        .setRequired(true)),
    async execute(interaction, client) {
        const toDuplicate = interaction.options.getString('categoria');
        const toDuplicateCat = interaction.guild.channels.cache.find(channel =>  channel.type == ChannelType.GuildCategory && channel.name == toDuplicate)

        if(!toDuplicateCat) return interaction.reply(`${client.config.emoji.error} | La categoría ${toDuplicate} no existe`);
        toDuplicateCat.clone();

        await interaction.reply(`${client.config.emoji.success} | La categoría ${toDuplicate} se ha duplicado correctamente`);
    }
}