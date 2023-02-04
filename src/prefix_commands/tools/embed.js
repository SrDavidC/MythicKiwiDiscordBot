const { EmbedBuilder, PermissionsBitField } = require('discord.js');
// const { execute } = require('../../events/client/ready');
const usage = 'Usage: embed <channel> <color> <message>'; 
module.exports = {
    name: 'embed',
    async execute(message, args, client) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return message.reply("You don't have permissions to use this command");
        if (!args.length) return message.channel.send(usage);
        const channel = message.mentions.channels.first();
        if (!channel) return message.reply('You must to specific a channel');

        if (!args[1].startsWith("#")) return message.reply('You must to specific a valid hex color');

        if (!args[2]) return message.reply('You must to specific a message');

        // mentions
        let mention;
        if (args.some((val) => val.toLowerCase() === '-ping')) {
            for (let i = 0; i < args.length; i++) {
                if (args[i].toLowerCase() === '-ping') args.splice(i, 1);
            }

            mention = true;
        } else mention = false;

        if (mention === true) channel.send('@everyone');
        const color = args.slice(1).join(" ");
        const description = args.slice(2).join(" ");
        const embed = new EmbedBuilder()
        // .setTitle(title)
        .setDescription(description)
        .setColor(color)
        .setTimestamp(Date.now())
        // .setURL(client.storeURL)
        .setFooter({
            iconURL: client.user.displayAvatarURL(),
            text: client.serverIP
        });
        channel.send({embeds: [embed]});
        await message.reply("Embed has been sent succesfully");
    }
    
}