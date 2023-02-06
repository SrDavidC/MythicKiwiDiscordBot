const { config } = require("../../../config.json");
const { default: mongoose } = require("mongoose");
const {mongodb} = require("../../../config.json");

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
        console.log(`Ready! ${client.user.tag} is logged in and online. Ready to harvest Mythic Kiwis!✨🥝`)      
        client.memberCount(client);
        /*
        try {
            let guild = client.guilds.cache.get(process.env.guildID1);
            console.log('Discord server ID loaded');
            const c = guild.getChannel(1071870819170517063);
            c.
            await c.setName(`🌎Total users - ${guild.member_count_channel}`);
            console.log('Member count channel ID loaded');
          } catch (err) {
            console.log('Discord server or Member count channel ID has not been loaded');
            console.log(err);
          }
          */
    
    }
}