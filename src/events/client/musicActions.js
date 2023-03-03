const { ButtonInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction) {
        const { guild, member, customId, channel, client } = interaction;
        const { ManageChannels, SendMessages } = PermissionFlagsBits;
        // console.log("yes1");
        if (!interaction.isButton()) return;

        if (!["PauseButton", "ResumeButton", "StopButton", "SkipButton"].includes(customId)) return;
        const PauseButton = new ButtonBuilder()
            .setCustomId('PauseButton')
            .setLabel('Pause')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('⏸️');
        const ResumeButton = new ButtonBuilder()
            .setCustomId('ResumeButton')
            .setLabel('Resume')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('▶️');
        const StopButton = new ButtonBuilder()
            .setCustomId('StopButton')
            .setLabel('Stop')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('⏹️');
        const SkipButton = new ButtonBuilder()
            .setCustomId('SkipButton')
            .setLabel('Skip')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('⏹️');

        //SkipButton, StopButton

        const Buttons = new ActionRowBuilder().addComponents(PauseButton, SkipButton, StopButton);
        const ResumeButtons = new ActionRowBuilder().addComponents(ResumeButton, SkipButton, StopButton);
        /* TO DO: Make only user with permission or who request the song can use the buttons*/
        switch (customId) {
            case "PauseButton":
                client.distube.pause(guild);
                // player.pause(true);
                const int = await interaction.deferUpdate({
                    fetchReply: true,
                });
                if (!int) return smt
                await int.edit({
                    components: [ResumeButtons],
                });
                if (int.deleted) {
                    interaction.channel.send()
                }
                break;
            case "ResumeButton":
                client.distube.resume(guild);
                const int_ = await interaction.deferUpdate({
                    fetchReply: true,
                });
                if (!int_) return smt
                await int_.edit({
                    components: [Buttons],
                });
                if (int_.deleted) {
                    interaction.channel.send()
                }
                break;
            case "SkipButton":
                if (client.distube.getQueue(guild).songs.length > 1) {
                    client.distube.skip(guild);
                    await interaction.reply({ embeds: [new EmbedBuilder().setDescription("<:SilverVerify:1080373622234943539>  | Canción actual saltada")], ephemeral: true });
                } else {
                    client.distube.stop(guild);
                    await interaction.channel.send({ embeds: [new EmbedBuilder().setDescription("<:SilverVerify:1080373622234943539>  | Canción actual saltada, no hay más canciones en la lista")] })
                }
                break;
            case "StopButton":
                client.distube.stop(guild);
                await interaction.channel.send({ embeds: [new EmbedBuilder().setDescription("<:SilverVerify:1080373622234943539>  | Lista de reproducción detenida")] })
                break;
        }
    }
}