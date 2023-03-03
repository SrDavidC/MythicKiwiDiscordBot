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
                text: "mythic comissions",
                status: "online"
            },
            {
                type: ActivityType.Custom,
                text: "improving premade content ",
                status: "online"
            },
            {
                type: ActivityType.Custom,
                text: "waitng the next customer",
                status: "online"
            },
            {
                type: ActivityType.Listening,
                text: "a excelent customer",
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
    