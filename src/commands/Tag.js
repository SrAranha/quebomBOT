module.exports = {
    name: 'tag',
    description: 'Give an role to the mentioned user',
    guildOnly: true,
    execute(message) {
        if (message.member.roles.cache.some(role => role.name === 'QueBom' || role.name === 'Moderadores')) { //Checks if user has permissions
            const member = message.mentions.members.first();
            const role = message.mentions.roles.first();
            message.delete();
            member.roles.add(role);
        }
        else (message.channel.send(`${message.author}, você não pode usar este comando!`))
    }
}