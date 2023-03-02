
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nowplaying")
        .setDescription("Te avisa cuál canción está sonando ahora mismo"),

    async execute(interaction, client) {
        const queue = client.distube.getQueue(interaction.guild)
        if (!queue) return interaction.reply(`${client.emotes.error} | No existe una cola ahora mismo!`)
        const song = queue.songs[0]
        interaction.reply( { content:`${client.emotes.play} | I'm playing **\`${song.name}\`**, by ${song.user}`, ephemeral: true });
    }
}
