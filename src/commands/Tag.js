module.exports = {
    name: 'tag',
    description: 'Give an role to the mentioned user',
    guildOnly: true,
    execute(message) {
        if (message.member.roles.cache.some(role => role.name === 'QueBom' || role.name === 'Moderadores')) { //Checks if user has permissions
            const member = message.mentions.members.first();
            const role = message.mentions.roles.first();
            const auditLog = message.guild.channels.cache.find(channel => channel.id === '742759841751367782');
            const tagEmbed = {
                color: '#4EFF00',
                title: `Cargo ${role.name} dado à ${member.user.tag}`,
                author: {
                    name: `${message.author.tag}`,
                    icon_url: `${message.author.avatarURL()}`,
                },
                timestamp: new Date(),
            };
            message.delete();
            member.roles.add(role);
            auditLog.send({embed: tagEmbed});
        }
        else (message.channel.send(`${message.author}, você não pode usar este comando!`))
    }
}