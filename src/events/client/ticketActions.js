const {ButtonInteraction, EmbedBuilder, PermissionFlagsBits, Embed} = require("discord.js");
const {createTranscript} = require("discord-html-transcripts");
const {transcripts} = require("../../../config.json");
const ticketSchema = require("../../Models/ticket");

module.exports = {
    name: "interactionCreate",

    async execute(interaction) {
        const {guild, member, customID, channel} = interaction;
        const {ManageChannels, SendMessages} = PermissionFlagsBits;

        if(!interaction.isButton()) return;

        if(!["close", "lock", "unlock"].includes(customID)) return;

        if(!guild.members.me.permissions.has(ManageChannels))
            return interaction.reply({content: "I don't have permissions for this.", ephemeral: true});

        const embed = new EmbedBuilder().setColor("Aqua");

        ticketSchema.findOne({ChannelID: channel.id}, async (err, data) =>{
            if (err) throw err;
            if (!data) return;

            const fetchedMember = await guild.members.cache.get(data.MemberID);
            switch (customID) {
                case "close":
                    if (data.closed == true)
                        return interaction.reply({ content: "Ticket is already getting closed!", ephemeral: true});
                    const transcript = await createTranscript(channel, {
                        limit: -1,
                        returnBuffer: false,
                        fileName: `${member.user.username}-ticket${data.Type}-${data.TickedID}.html`,
                    });
                    
                    await ticketSchema.updateOne({ ChannelID: channel.id},  {Closed: true});

                    const transcriptEmbed = new EmbedBuilder()
                        .setTitle(`Transcript Type: ${data.Type}\nID: ${data.TicketID}`)
                        .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true})})
                        .setTimestamp();
                    
                    const transcriptProcess = new EmbedBuilder()
                        .setTitle('Saving transcript...')
                        .setDescription("Ticket will be closed in 10 seconds, enable DM's for the ticket transcript")
                        .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true})})
                        .setTimestamp();
                    const res = await guild.channels.cache.get(transcripts).send({
                        embeds: [transcriptEmbed],
                        files: [transcript],
                    });
                    channel.send({ embeds: [transcriptProcess]});
                    
                    setTimeout(function()  {
                        member.send({
                            embeds: [transcriptEmbed.setDescription(`Access your ticket transcript: ${res.url}`)]
                        }).catch(() => channel.send('Couldn\'t send transcript to user DM'))
                        channel.delete();
                    }, 10000)
                    break;

                    case "lock":
                        if (!member.permissions.has(ManageChannels))
                            return interaction.reply({ content: "You don't have permissions to lock tickets.", ephemeral: true});
                        if (data.Locked == true)
                            return interaction.reply({ content: "Ticked is already locked.", ephemeral: true})
                        await ticketSchema.updateOne({ ChannelID: channel.id}, { Locked: true});
                        embed.setDescription("Ticket was locked succesfully.");

                        channel.permissionOverwrites.edit(fetchedMember, { SendMessages: false});

                        return interaction.reply({ embeds: [embed] });

                        break;
                    case "unlock":
                        if (!member.permissions.has(ManageChannels))
                            return interaction.reply({ content: "You don't have permissions to lock tickets.", ephemeral: true});
                        if (data.Locked == false)
                            return interaction.reply({ content: "Ticked is already unlocked.", ephemeral: true})

                        await ticketSchema.updateOne({ ChannelID: channel.id}, { Locked: false});
                        embed.setDescription("Ticket was unlocked succesfully.");

                        channel.permissionOverwrites.edit(fetchedMember, { SendMessages: true});

                        return interaction.reply({ embeds: [embed] });

            }
        })
    }
}