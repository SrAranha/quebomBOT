const { MessageReaction, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'poll',
    description: 'Starts an poll',
    execute(message, args) {
        message.delete();
        const pollName = args.slice(0).join(' ');
        const pollAuthor = message.author;
        const pollEmbed = {
            color: '#df8edd',
            title: `${pollName}`,
            author: {
                name: `Criado por: ${pollAuthor.username}`,
                icon_url: `${pollAuthor.avatarURL()}`,
            },
            timestamp: new Date(),
        };
        if (pollName == '') {
            message.channel.send('Por favor, coloque o que está em votação após o comando!')
        } else if (
        message.channel.send({embed: pollEmbed}).then(message => message.react('✅').then(() => message.react('❌'))));
        ;
    }
}