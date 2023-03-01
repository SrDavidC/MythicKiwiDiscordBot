const fs = require("fs");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = (client) => {
    client.handleMusicEvents = async () => {
        
        const PauseButton = new ButtonBuilder()
        .setCustomId('PauseButton')
        .setLabel('Pause')
        .setStyle(ButtonStyle.Secondary)
        .setEmoji('⏸️');
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

        const Buttons = new ActionRowBuilder().addComponents(PauseButton, SkipButton, StopButton);
        
        const status = queue =>
            `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
            }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
        client.distube
            .on('playSong', (queue, song) => {
                const embed = new EmbedBuilder()
                    .setAuthor({ name: "🎶" + song.name, /*iconURL: 'https://thumbnail.imgbin.com/2/21/23/music-player-icon-music-icon-solid-media-elements-icon-4HSZxixr_t.jpg',*/ url: song.url })
                    .addFields(
                        { name: 'Duración', value: "```" + song.formattedDuration + "```"/* song.formattedDuration */, inline: true },
                        { name: 'Autor', value: "```" + song.uploader.name + "```" /*song.uploader*/, inline: true })
                    .setImage(song.thumbnail);
                song.metadata.interaction.editReply({
                    embeds: [embed],
                    components: [Buttons],
                })
            })
            .on('addSong', (queue, song) => {
                const embed = new EmbedBuilder()
                    .setDescription(` <:verified_white:1080337342058995722>  | Canción añadida: **${song.name}**`);
                song.metadata.interaction.editReply({ embeds: [embed] });
            })
            .on('finishSong', (queue, song) => {
                song.metadata.interaction.editReply({
                    components: [],
                })
            })
            .on('addList', (queue, playlist) => {
                const embed = new EmbedBuilder()
                    .setDescription(` <:verified_white:1080337342058995722>  | Playlist añadida: **${playlist.name}**`);
                song.metadata.interaction.editReply({ embeds: [embed] });
            })
            // .on('error', (channel, e) => {
                //if (channel) channel.send(`${client.emotes.error} | An error encountered: ${e.toString().slice(0, 1974)}`)
             //*   else console.error(e)
           // })
            // .on('empty', channel => channel.send('Voice channel is empty! Leaving the channel...'))
            .on('searchNoResult', (message, query) =>
                message.channel.send(`${client.emotes.error} | No result found for \`${query}\`!`)
            )
            // .on('finish', queue => queue.textChannel.send('Finished!'))
    }
}