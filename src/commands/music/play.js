const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Reproduce una canción de YT, Spotify, Deezer, entre otros")
        .addStringOption(option =>
            option.setName("song").setDescription("Song to play").setRequired(true)
        ),
        async execute(interaction, client) {
            await interaction.deferReply({ ephemeral: true });
            // await interaction.reply("Working on it...🔍");
            const embed = new EmbedBuilder()
                // .setColor(client.color)
                .setTimestamp();
            if (!interaction.member.voice.channel) {
                embed.setDescription(`\`❌\` | Debes de estar en un canal de voz para usar este comando.`)
                return interaction.editReply({ embeds: [embed] });
            } 
            let song = interaction.options.getString("song")
            client.distube.play(interaction.member.voice.channel, song, {
                member: interaction.member,
                textChannel: interaction.channel,
                metadata: { interaction: interaction, channel: interaction.channel}
            })
            interaction.editReply(`${client.config.emoji.success} | Búsqueda encontrada!`);
        }
}