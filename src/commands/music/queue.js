
const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("shows first 5 songs in the queue"),

    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: false });
        // check if there are songs in the queue
        const queue = client.distube.getQueue(interaction.guild);
        if (!queue || !queue.playing) {
            await interaction.editReply(`${client.emotes.error} | No existe ninguna cola ahora mismo!`);
            return;
        }
        const npSong = queue.songs[0];
        const currentDuration = npSong.formattedDuration;
        const currentTitle = npSong.name > 20 ? npSong.title.substr(0, 20) + "..." : npSong.name;
        const npDuration = npSong.isLive ? "LIVE" : currentDuration;
        const npTitle = npSong.name ? currentTitle : "Unknown";
        const firstsSongs = queue.songs.length > 5 ? queue.songs.slice(0, 5) : queue.songs;

        const embed = new EmbedBuilder()
            .setAuthor({ name: `Queue List`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setColor(client.color)
            .setThumbnail(npSong.image)
            .setDescription(`**__Now Playing__**\n**[${npTitle}](${npSong.url})** • \`${npDuration}\` • ${npSong.member}`)
            .setFooter({
                text: `Total Queued • ${queue.songs.length} tracks`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp();
        // console.log(firstsSongs.length);
        if (firstsSongs.length) {
            embed.addFields([
                {
                    name: "__Up Next:__",
                    value: firstsSongs
                        .map(
                            (track, index) =>
                                `**${index + 1}. [${track.name
                                    ? track.name.length > 15
                                        ? track.name.substr(0, 15) + "..."
                                        : track.name
                                    : "Unknown"
                                }](${track.url})** • \`${track.isLive ? "LIVE" : track.formattedDuration}\` • ${track.member
                                }`
                        )
                        .join("\n"),
                },
            ]);
        } else {
            embed.addFields({ name: "__Up Next:__", value: "**Queue is empty!**" });
        }

        return interaction.editReply({ embeds: [embed] });
    },
}
