const { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const ticketSchema = require("../../Models/ticket");
const fs = require('fs');

module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction) {
        // console.log('Hey im here');
        const { guild, member, customId, channel, client } = interaction;
        const { ViewChannel, SendMessages, ManageChannels, ReadMessageHistory } = PermissionFlagsBits;
        const ticketID = Math.floor(Math.random() * 9000) + 10000;

        if (!interaction.isButton()) return;
        // console.log(customId);
        if (!["ticket_button_1", 'ticket_button_2', 'ticket_button_3'].includes(customId)) return;
        if (!guild.members.me.permissions.has(ManageChannels))
            interaction.reply({ content: "No tengo permisos para crear canales (Permissions.ManageChannels).", ephemeral: true });
        try {
            const ticket = client.config.tickets;
            const buttonMapping = {
                "ticket_button_1": "ticket_button_1_parent",
                "ticket_button_2": "ticket_button_2_parent",
                "ticket_button_3": "ticket_button_3_parent",
            };
            const parentMapping = {
                "ticket_button_1": "ticket_button_1_id",
                "ticket_button_2": "ticket_button_2_id",
                "ticket_button_3": "ticket_button_3_id",
            };
            let ticketParents = ticket[buttonMapping[customId]];
            let id = parentMapping[customId];
            // Lee el archivo JSON
            let data = JSON.parse(fs.readFileSync("./tickets_id.json"));

            // Actualiza el valor del contador correspondiente al nombre de la propiedad 'propName'
            if (data[id] !== undefined) {
                data[id]++;
            }
            // Escribe el contenido actualizado en el archivo JSON
            fs.writeFileSync("./tickets_id.json", JSON.stringify(data));
            let paddedCount = data[id].toString().padStart(4, '0');
            let ticketName = `Ticket-${paddedCount}`;
            await guild.channels.create({
                name: ticketName,
                type: ChannelType.GuildText,
                parent: ticketParents,
                permissionOverwrites: [
                    {
                        id: guild.roles.everyone,
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
                    .setTitle(ticket.ticket_wait_title)
                    .setDescription(ticket.ticket_wait_message)
                    .setImage(ticket.ticket_wait_image)
                    .setFooter({ text: `${ticketID}`, iconURL: member.displayAvatarURL({ dynamic: true }) })
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

                interaction.reply({ content: "Succesfully created a ticket. Check " + channel.toString(), ephemeral: true });
            })
        } catch (err) {
            return console.log(err);
        }
    }
}