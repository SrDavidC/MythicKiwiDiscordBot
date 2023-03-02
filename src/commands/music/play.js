const { SlashCommandBuilder } = require("@discordjs/builders");
const { Embed, EmbedBuilder } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Reproduce una canción de YT, Spotify, Deezer, entre otros")
        .addStringOption(option =>
            option.setName("song").setDescription("Song to play").setRequired(true)
        ),
        async execute(interaction, client) {
            await interaction.deferReply({ ephemeral: false });
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
                metadata: { interaction: interaction}
            })
            interaction.editReply("Enviadaa!");
        }
}

/*const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { QueryType } = require("discord-player")



module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("play a song from YouTube.")
		.addSubcommand(subcommand =>
			subcommand
				.setName("search")
				.setDescription("Searches for a song and plays it")
				.addStringOption(option =>
					option.setName("searchterms").setDescription("search keywords").setRequired(true)
				)
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("playlist")
				.setDescription("Plays a playlist from YT")
				.addStringOption(option => option.setName("url").setDescription("the playlist's url").setRequired(true))
		),
        async execute(interaction, client) {
        // Make sure the user is inside a voice channel
		if (!interaction.member.voice.channel) return interaction.reply("You need to be in a Voice Channel to play a song.");

        // Create a play queue for the server
        var queue;
        if( !(client.player.getQueue(interaction.guildId))) {
            queue = await client.player.createQueue(interaction.guild);
        } else {
            queue = await client.player.getQueue(interaction.guildId);
        }
		    

        // Wait until you are connected to the channel
		if (!queue.connection) await queue.connect(interaction.member.voice.channel)
        await interaction.reply("Working on it...🔍")
		let embed = new EmbedBuilder();

		if (interaction.options.getSubcommand() === "song") {
            let url = interaction.options.getString("url")
            
            // Search for the song using the discord-player
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })

            // finish if no tracks were found
            if (result.tracks.length === 0)
                return interaction.editReply("No results found...😔");

            // Add the track to the queue
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}`})

		}
        else if (interaction.options.getSubcommand() === "playlist") {

            // Search for the playlist using the discord-player
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            })

            if (result.tracks.length === 0)
                return interaction.editReply(`No playlists found with ${url} 😔`)
            
            // Add the tracks to the queue
            const playlist = result.playlist
            await queue.addTracks(result.tracks)
            embed
                .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`)
                // .setThumbnail(playlist.thumbnail)

		} 
        else if (interaction.options.getSubcommand() === "search") {

            // Search for the song using the discord-player
            let url = interaction.options.getString("searchterms")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })

            // finish if no tracks were found
            if (result.tracks.length === 0)
                return interaction.editReply("No results found...😔")
            
            // Add the track to the queue
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}`})
		}

        // Play the song
        if (!queue.playing) await queue.play()
        
        // Respond with the embed containing information about the player
        await interaction.channel.send({embeds: [ embed]});
        await interaction.editReply("Successful! 🥁")
        /*
        await interaction.reply({
            embeds: [embed]
        })
        
	},
}
*/