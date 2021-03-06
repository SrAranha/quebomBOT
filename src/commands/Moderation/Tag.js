module.exports = {
    name: "tag",
    aliases: ["addrole","role"],
    description: "Dá o cargo especifícado ao usuário mencionado.",
    guildOnly: true,
    modOnly: true,
    args: "{Usuário} {Cargo}",
    execute(message) {
        if (message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("MANAGE_ROLES")) { 
            const member = message.mentions.members.first();
            const role = message.mentions.roles.first();
            const auditLog_QBom = require ("../../config.json")
            const auditLog = message.guild.channels.cache.find(channel => channel.id === auditLog_QBom);
            const tagEmbed = {
                color: "#4EFF00",
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
        else (message.reply("você **não** tem permissão para usar este comando!"));
    }
}