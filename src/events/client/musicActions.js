const {ButtonInteraction, EmbedBuilder, PermissionFlagsBits, Embed} = require("discord.js");

module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction) {
        const {guild, member, customId, channel, client} = interaction;
        const {ManageChannels, SendMessages} = PermissionFlagsBits;

        if(!interaction.isButton()) return;

        if(!["pause", "stop", "resume", "skip"].includes(customId)) return;

        /* TO DO: Make only user with permission or who request the song can use the buttons*/
        switch (customId) {
            case "resume":
            case "pause":
                let state;
                if (customId === 'pause') {
                    state = 'pause'
                } else {
                    state = i => i.customId === 'resume';
                }
                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setCustomId('pause').setLabel('Pause').setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder().setCustomId('skip').setLabel('Skip').setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder().setCustomId('stop').setLabel('Stop').setStyle(ButtonStyle.Secondary),
                    );

                collector.on('collect', async i => {
                    await i.update({ content: 'A button was clicked!', components: [] });
                });
                
                collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                     
            break;
            }
        
    }
}