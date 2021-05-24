module.exports = {
    name: 'banir',
    description: 'Bans user mentioned from the guild',
    guildOnly: true,
    execute(message, args) {
        if (message.member.hasPermission(ADMINISTRATOR) || message.member.hasPermission(BAN_MEMBERS)) { 
            const member = message.mentions.members.first();
            const reason = args.slice(1).join(' ');
            const auditLog_QBom = require ("../../config.json")
            const auditLog = message.guild.channels.cache.find(channel => channel.id === auditLog_QBom);
            if (member != String) {
                message.reply("o comando está incompleto!");
            }
            else {
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
        }   
        else (message.channel.send(`${message.author}, você não pode usar este comando!`))
    }
}