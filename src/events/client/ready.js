const { default: mongoose } = require("mongoose");
const { mongodb } = process.env;

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