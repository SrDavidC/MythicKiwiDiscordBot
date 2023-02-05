const util = require('minecraft-server-util');
const usage = 'usage: mcserverstatus <serverIP>'
module.exports = {
    name: 'mcserverstatus',
    async execute(message, args, client) {
        const sayMessage = args.join(" ");
        if (!args.length) return message.channel.send(usage);
        client.minecraftServerStatus(args[0], message.channel);
        
    }
}