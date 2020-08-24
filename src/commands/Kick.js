module.exports = {
    name: 'kick',
    description: 'Kicks user mentioned from the guild',
    guildOnly: true,
    execute(message, args) {
        if (message.member.roles.cache.some(role => role.name === 'QueBom' || role.name === 'Moderadores')) { //Checks if user has permissions
            const member = message.mentions.members.first();
            const reason = args.slice(1).join(' ');
            const auditLog = message.guild.channels.cache.find(channel => channel.id === '742759841751367782');
            const kickedEmbed = {
                color: '#FFEA00',
                title: `Usuário kickado: ${member.user.tag}`,
                author: {
                    name: `${message.author.tag}`,
                    icon_url: `${message.author.avatarURL()}`,
                },
                fields: [
                    {
                        name: 'Motivo:',
                        value: `${reason}.`,
                    },
                ],
                timestamp: new Date(),
            };
            message.delete();
            message.guild.member(member).kick(reason);
            auditLog.send({embed: kickedEmbed});
        }
        else (message.channel.send(`${message.author}, você não pode usar este comando!`))
    }
}