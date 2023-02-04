const { PermissionsBitField } = require("discord.js");

module.exports = {
    name: 'say',
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return message.reply('No tienes permisos para usar este comando');
        const sayMessage = args.join(" ");
        message.delete().catch(console.error)
        if (sayMessage) message.channel.send(sayMessage);
    }
}