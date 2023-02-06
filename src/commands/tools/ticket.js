const { Client, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, Embed } = require('discord.js')
const {openticket} = require("../../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Create a ticket message.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

        async execute(interaction) {
            const { guild } = interaction;
            const embed = new EmbedBuilder()
                .setDescription('Open a ticket in Mythic Kiwi 🔥')
            const button = new ActionRowBuilder().setComponents(
                new ButtonBuilder().setCustomId('member').setLabel('Report a member').setStyle(ButtonStyle.Primary).setEmoji('👤'),
                new ButtonBuilder().setCustomId('bug').setLabel('Report a bug').setStyle(ButtonStyle.Danger).setEmoji('🐞'),
                new ButtonBuilder().setCustomId('help').setLabel('Help').setStyle(ButtonStyle.Secondary).setEmoji('❓'),
                new ButtonBuilder().setCustomId('partnership').setLabel('Partnership').setStyle(ButtonStyle.Success).setEmoji('🤝')
            );

            await guild.channels.cache.get(openticket).send({
                embeds: ([embed]),
                components: [
                    button
                ]
            });

            interaction.reply({ content: "Ticket message has been sent", ephemeral: true});
        }
}