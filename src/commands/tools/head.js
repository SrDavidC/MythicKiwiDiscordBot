const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const request = require("request");

function random(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
  };

module.exports = {
    data: new SlashCommandBuilder()
        .setName('head')
        .setDescription('Retorna un render de la skin de un jugador premium de Minecraft')
        .addStringOption(option =>
            option
                .setName("username")
                .setDescription("username del jugador para obtener una imagen de la cabeza de su skin")
                .setRequired(true))
    , async execute(interaction, client) {
        const username = interaction.options.getString('username');
        if (username.length > 16) {
            await interaction.reply({
                content: 'Los username de Minecraft deben ser de menos de 16 caracteres'
            });
        }
        let mojang_player_api = `https://api.mojang.com/users/profiles/minecraft/${username}`;
        request(mojang_player_api, async function (err, resp, body) {
            if (err) {
                interaction.reply({
                    content: `Username: **${username}** no es un usuario premium`
                });
            }
            try {
                body = JSON.parse(body);
                let player_id = body.id;
                let avatar = `https://crafatar.com/avatars/${player_id}`;
                let embed = new EmbedBuilder()
                    .setTitle(`${username.toUpperCase()} Skin`)
                    .setColor(random(['#008000', '#E50000', '#99AAb5','#C27C0E']))
                    .setFooter({
                        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
                        text: `${interaction.user.id}`
                    })
                    .setImage(avatar);
                await interaction.channel.send({embeds: [ embed]});
                await interaction.reply('Head has been sent succesfully');
            } catch (err) {
                interaction.reply({
                    content: `Hubo un error. Es probable que **${username}** no sea un usuario premium`
                });
                console.log(err);
            }
        });
    }
}
