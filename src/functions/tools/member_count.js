module.exports = async (client) => {
    client.memberCount = async (client) => {
        const guild = client.guilds.cache.get(process.env.guildID1);
        setInterval(() => {
            const memberCount = guild.memberCount;
            const channel = guild.channels.cache.get(process.env.member_count_channel);
            channel.setName(`◜Members◝・${memberCount.toLocaleString()} ・`);
            console.log('Updating Member Count');
        }, 120000);
    }
}

