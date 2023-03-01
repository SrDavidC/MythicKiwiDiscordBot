const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skips the current song"),

        async execute(interaction, client) {

        // Get the queue for the server
		const queue = client.player.getQueue(interaction.guildId)

        // If there is no queue, return
		if (!queue)
        {
            await interaction.reply("There are no songs in the queue");
            return;
        }

        // const currentSong = queue.current

        // Skip the current song
		//queue.skip();
        client.player.skip(interaction.guildId);
        

        // Return an embed to the user saying the song has been skipped
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`A song has been skipped!`)
                    // .setThumbnail(currentSong.thumbnail)
            ]
        })
	},
}