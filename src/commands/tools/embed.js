const { SlashCommandBuilder, Embed, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
// const { execute } = require('../../events/client/ready');
const convert = require('amrhextotext');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Returns an embed')
    .addStringOption( option =>
        option
        .setName("title")
        .setDescription("Embed title")
        .setRequired(true))
    .addStringOption( option =>
        option
        .setName('description')
        .setDescription("Embed description")
        .setRequired(true))
    .addStringOption( option =>
        option
        .setName('color')
        .setDescription("Embed color")
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    
    ,async execute(interaction, client) {
        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');
        const color = interaction.options.getString('color') ?? client.embedDefaultColor;
        const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color)
        .setTimestamp(Date.now())
        // .setURL(client.storeURL)
        .setFooter({
            iconURL: client.user.displayAvatarURL(),
            text: client.serverIP
        });
        
        /*await interaction.reply({
            embeds: [embed]
        });
        await interaction.deleteReply();
        */
       client.channels.cache.get('927614320228069386').send({embeds: [embed]});
       await interaction.reply({
            content: 'Embed sent successfully'
        });
    },
}