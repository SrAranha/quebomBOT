module.exports = {
    name: 'kick',
    aliases: ['kickar'],
    description: 'Kicks user mentioned from the guild',
    guildOnly: true,
    execute(message, args) {
        if (message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("KICK_MEMBERS")) { 
            const member = message.mentions.members.first();
            const reason = args.slice(1).join(' ');
            const auditLog_QBom = require ("../../config.json")
            const auditLog = message.guild.channels.cache.find(channel => channel.id === auditLog_QBom);
            if (member != String) {
                message.reply("o comando está incompleto!");
            }
            else {
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
        }
        else (message.reply('você **não** tem permissão para usar este comando!'));
    }
}