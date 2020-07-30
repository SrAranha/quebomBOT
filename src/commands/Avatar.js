module.exports = {
    name: 'avatar',
    description: 'Get user\'s avatar if not specified',
    execute(message, args) {
        const taggedUser = message.mentions.users.first();
        message.channel.send(taggedUser.displayAvatarURL())
    }
}