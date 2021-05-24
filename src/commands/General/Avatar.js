module.exports = {
    name: 'avatar',
    aliases: ['icon'],
    description: 'Get user\'s avatar if not specified',
    execute(message) {
        const mentionedUser = message.mentions.users.first();
        if (!mentionedUser) return message.channel.send(message.author.displayAvatarURL()); //Send the author's avatar
        else if (message.channel.send(mentionedUser.displayAvatarURL())); //Send the mentioned user's avatar
    }
}