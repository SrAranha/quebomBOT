module.exports = {
    name: 'avatar',
    description: 'Get user\'s avatar if not specified',
    execute(message) {
        const taggedUser = message.mentions.users.first();

        if (!taggedUser) return message.channel.send(message.author.displayAvatarURL()); //Send the author's avatar
        else if (message.channel.send(taggedUser.displayAvatarURL())); //Send the mentioned user's avatar
    }
}