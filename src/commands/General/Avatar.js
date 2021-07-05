module.exports = {
    name: "avatar",
    aliases: ["icon"],
    description: "Mostra o avatar/ícone do usuário que chamou o comando ou o usuário mencionado.",
    listArgs: "(usuário)",
    execute(message) {
        const mentionedUser = message.mentions.users.first();
        if (!mentionedUser) return message.channel.send(message.author.displayAvatarURL()); //Send the author's avatar
        else if (message.channel.send(mentionedUser.displayAvatarURL())); //Send the mentioned user's avatar
    }
}