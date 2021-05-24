module.exports = {
    name: 'punir',
    aliases: ['punish'],
    description: 'Command to punish members',
    guildOnly: true,
    execute(message) {
        if (message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("MANAGE_ROLES") || message.member.hasPermission("KICK_MEMBERS")) { 
            const member = message.mentions.members.first();
            const role = message.guild.roles.cache.find(role => role.name === 'Punidos');
            const auditLog_QBom = require ("../../config.json")
            const auditLog = message.guild.channels.cache.find(channel => channel.id === auditLog_QBom);
            const punishEmbed = {
                color: '#865400',
                title: `Membro punido: ${member.user.tag}`,
                author: {
                    name: `${message.author.tag}`,
                    icon_url: `${message.author.avatarURL()}`,
                },
                timestamp: new Date(),
            };
            message.delete();
            member.roles.add(role); 
            auditLog.send({embed: punishEmbed});
        }
        else (message.channel.send(`${message.author}, você não pode usar este comando!`))
    }
}