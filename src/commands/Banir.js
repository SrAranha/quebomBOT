module.exports = {
    name: 'banir',
    description: 'Bans user mentioned from the guild',
    guildOnly: true,
    execute(message, args) {
        if (message.member.roles.cache.some(role => role.name === 'QueBom' || role.name === 'Moderadores')) { //Checks if user has permissions
            const member = message.mentions.members.first();
            const reason = args.slice(1).join(' ');
            const auditLog_QBom = require ("../config.json")
            const auditLog = message.guild.channels.cache.find(channel => channel.id === auditLog_QBom);
            const bannedEmbed = {
                color: '#F80000',
                title: `Usuário banido: ${member.user.tag}`,
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
            message.guild.members.ban(member, options = { days: 7, reason: reason});
            auditLog.send({embed: bannedEmbed});
        }
        else (message.channel.send(`${message.author}, você não pode usar este comando!`))
    }
}