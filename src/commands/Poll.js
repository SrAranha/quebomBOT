module.exports = {
    name: 'poll',
    description: 'Starts an poll',
    execute(message, args) {
        message.delete();

        if (message.author.roles.cache.some(role => role.name === 'Moderadores' || role.name === 'QueBom' || message.author.id === '227887537102782464')) { //Checks if user has permissions
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
            }
            else if (
            message.channel.send({embed: pollEmbed}).then(message => message.react('✅').then(() => message.react('❌'))));
        }
        else {
            message.channel.send(`${message.author}, você não tem permissão para usar esse comando!`)
        }
    }
}