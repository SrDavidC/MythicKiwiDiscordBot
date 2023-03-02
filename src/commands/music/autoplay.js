
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("autoplay")
        .setDescription("Al acabar la lista, comienza a reproducirse música similar"),

    async execute(interaction, client) {
        const queue = client.distube.getQueue(interaction.guild);
        if (!queue) return interaction.reply(`${client.emotes.error} | No existe ninguna cola ahora mismo!`);
        const autoplay = queue.toggleAutoplay();
        interaction.reply(`${client.emotes.success} | AutoPlay: \`${autoplay ? 'On' : 'Off'}\``);
    }
}
