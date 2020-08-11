module.exports = {
    name: 'punir',
    description: 'Command to punish members',
    execute(message) {
        if (message.member.roles.cache.some(role => role.name === 'QueBom' || role.name === 'Moderadores')) { //Checks if user has permissions
            const member = message.mentions.members.first();
            const role = message.guild.roles.cache.find(role => role.name === 'Punidos');
            member.roles.add(role);
        }
        else (message.channel.send(`${message.author}, você não pode usar este comando!`))
    }
}