module.exports = {
    name: 'GuildMemberAdd',
    async execute(interaction, client) {
        const member = interaction.member;
        if (member.guild.id === '1065357318004412416') {
            // <My guild ID> represents an ID of a guild that has a role with the ID <My role ID>
            console.log('User: ' + member.user.username + ' has joined the server!');
            var role = member.guild.roles.cache.find(role => role.id === "1079797082510086245");
            member.roles.add(role);
        } else {
            console.log('User: ' + member.user.username + ' has joined ' + member.guild.name + ' server!');
            var role = member.guild.roles.cache.find(role => role.name === "ϟ ―― ・𝖬𝖾𝗆𝖻𝖾𝗋・―― ϟ");
            member.roles.add(role);
        }
    }

}
