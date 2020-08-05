module.exports = {
    name: 'avatar',
    description: 'Get user\'s avatar if not specified',
    execute(message, args) {
        const taggedUser = message.mentions.users.first();

        if (!taggedUser) return message.channel.send(message.author.displayAvatarURL());
        else if (message.channel.send(taggedUser.displayAvatarURL()));
    }
}