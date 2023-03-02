const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js')
const {openticket} = require("../../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Create a ticket message.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

        async execute(interaction) {
            const { guild, client } = interaction;
            const ticket= client.config.tickets;
            const embed = new EmbedBuilder()
                .setTitle(ticket.ticket_message_title)
                .setDescription(ticket.ticket_message)
                .setImage(ticket.ticket_message_image)
            const button = new ActionRowBuilder().setComponents(
                new ButtonBuilder().setCustomId('button_1').setLabel(ticket.ticket_button_1).setStyle(ButtonStyle.Primary).setEmoji(client.config.emoji.estimations),
                new ButtonBuilder().setCustomId('button_2').setLabel(ticket.ticket_button_2).setStyle(ButtonStyle.Primary).setEmoji(client.config.emoji.comissions),
                new ButtonBuilder().setCustomId('button_3').setLabel(ticket.ticket_button_3).setStyle(ButtonStyle.Success).setEmoji(client.config.emoji.buyPremadeContent)
                // new ButtonBuilder().setCustomId('partnership').setLabel('Partnership').setStyle(ButtonStyle.Success).setEmoji('🤝')
            );
                if (guild.channels.cache.get(openticket)) {

                } else {
                    interaction.reply({ content: "El canal para abrir tickets no existe. Revisa tu configuración", ephemeral: true});
                    console.log("Channel DOESNT exist");
                }
            await guild.channels.cache.get(openticket).send({
                embeds: ([embed]),
                components: [
                    button
                ]
            });
            interaction.reply({ content: "Ticket message has been sent", ephemeral: true});
        }
}