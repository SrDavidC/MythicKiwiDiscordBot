const prefixCommandsHandler = require('../../handlePrefixComands');
module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message, client) {
        console.log(message.content);
        if (message.author.bot) return;
        /* Prefix commands handler */
        prefixCommandsHandler.handlePrefix(message, client);
    }
}