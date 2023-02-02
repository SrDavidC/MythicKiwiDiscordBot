const { ActivityType} = require('discord.js');

module.exports = (client) => {
    client.pickPresence = async () => {
        const options = [
            {
                type: ActivityType.Watching,
                text: "Mythic Kiwis grown",
                status: "online"
            },
            {
                type: ActivityType.Watching,
                text: "offers on the store",
                status: "online"
            },
            {
                type: ActivityType.Custom,
                text: "harvesting mythic kiwis",
                status: "online"
            },
            {
                type: ActivityType.Playing,
                text: "MythicKiwi.net",
                status: "online"
            }
        ];
        const option = Math.floor(Math.random() * (options.length));
        client.user
        .setPresence({
            activities: [
                {
                    name: options[option].text,
                    type: options[option].type,
                },
            ],
            status: options[option].status,
        });
    }
}
    