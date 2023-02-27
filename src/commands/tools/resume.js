const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resumes the current song"),
        async execute(interaction, client) {
        // Get the queue for the server
		const queue = client.player.getQueue(interaction.guildId)

        // Check if the queue is empty
		if (!queue)
        {
            await interaction.reply("No songs in the queue!");
            return;
        }

        // Pause the current song
		queue.setPaused(false);

        await interaction.reply("The music 🎶 has been resumed.")
	},
}