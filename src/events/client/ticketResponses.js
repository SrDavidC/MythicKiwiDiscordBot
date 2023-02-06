const { ChannelType, ButtonInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits} = require('discord.js');
const ticketSchema = require("../../Models/ticket");
const { ticketParent, everyone} = require ("../../../config.json");

module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction) {
        // console.log('Hey im here');
        const { guild, member, customId, channel} = interaction;
        const { ViewChannel, SendMessages, ManageChannels, ReadMessageHistory } = PermissionFlagsBits;
        const ticketID = Math.floor(Math.random() * 9000) + 10000;

        if (!interaction.isButton()) return;
        console.log(customId);
        if (!["member", 'bug', 'help', 'partnership'].includes(customId)) return;
        if (!guild.members.me.permissions.has(ManageChannels))
            interaction.reply({ content: "I don't have permission for this.", ephemeral: true});

        try {
            await guild.channels.create({
                name: `${member.user.username}-ticket${ticketID}`,
                type: ChannelType.GuildText,
                parent: ticketParent,
                permissionOverwrites: [
                    {
                        id: everyone,
                        deny: [ViewChannel, SendMessages, ReadMessageHistory],
                    },
                    {
                        id: member.id,
                        allow: [ViewChannel, SendMessages, ReadMessageHistory],
                    },
                ],
            }).then(async (channel) => {
                
                const newTicketSchema = await ticketSchema.create({
                    GuildID: guild.id,
                    MemberID: member.id,
                    TicketID: ticketID,
                    ChannelID: channel.id,
                    Closed: false,
                    Locked: false,
                    Type: customId, 
                });
                
                const embed = new EmbedBuilder()
                    .setTitle(`${guild.name} - TicketIssue: ${customId}`)
                    .setDescription(`${guild.name}'s Staff will contact you shortly. Please describe your issue`)
                    .setFooter({ text: `${ticketID}`, iconURL: member.displayAvatarURL({ dynamic: true})})
                    .setTimestamp();
                
                const button = new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId('close').setLabel('Close ticket').setStyle(ButtonStyle.Primary).setEmoji('❌'),
                    new ButtonBuilder().setCustomId('lock').setLabel('Lock ticket').setStyle(ButtonStyle.Secondary).setEmoji('🔒'),
                    new ButtonBuilder().setCustomId('unlock').setLabel('Unlock ticket').setStyle(ButtonStyle.Success).setEmoji('🔓')
                );
                channel.send(`${member.user}`);
                channel.send({
                    embeds: ([embed]),
                    components: [
                        button
                    ]
                });

                interaction.reply({content: "Succesfully created a ticket. Check " + channel.toString(), ephemeral: true});
            })
        } catch (err) {
            return console.log(err);
        }
    }
}