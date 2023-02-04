const say = require('./prefix_commands/tools/say')
const fs = require('fs');

module.exports.handlePrefix = (message) => {
    let prefix = process.env.prefix
    console.log(prefix);
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandSent = args.shift().toLowerCase();

    const prefixCommandsFolder = fs.readdirSync('./src/prefix_commands');
    for (const folder of prefixCommandsFolder) {
        const commandFiles = fs.readdirSync(`./src/prefix_commands/${folder}`)
            .filter((file) => file.endsWith(".js"));
        for (const file of commandFiles) {
            const extLenght = 3; // 'extLenght' refers to lenght of '.js'
            const filename = file.substring(0,file.toString().length - extLenght)
                .toLocaleLowerCase();
            if (filename === commandSent) {
                let command = require(`./prefix_commands/${folder}/${filename}`);
                command.execute(message, args);
            }
        }
    }
}