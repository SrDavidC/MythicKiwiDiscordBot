const { config } = require("../../../config.json");
const { default: mongoose } = require("mongoose");
const { mongodb } = require("../../../config.json");
const { guild_ids } = require("../../../config.json");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        setInterval(client.pickPresence, 1000);
        await mongoose.connect(mongodb || '', {
          keepAlive: true,
        });

        if ( mongoose.connect) {
          console.log('MongoDB connection successful');
        }
        console.log(`Ready! ${client.user.tag} is logged in and online. Ready to harvest Mythic Kiwis!✨🥝`);   
        client.memberCount(client);
    }
}