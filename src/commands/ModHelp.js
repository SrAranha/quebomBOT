module.exports = { 
    name: 'modhelp',
    description: 'Show help list with mod\'s commands',
    execute(message) {
        if (message.member.roles.cache.some(role => role.name === 'QueBom' || role.name === 'Moderadores')) { //Checks if user has permissions
            const modEmbed = {
                color: '#df8edd',
                title: 'Comandos para moderadores do QueBomBOT',
                description: 'O prefixo para os comandos é `qb`',
                thumbnail: {
                    url: 'https://i.imgur.com/zYPqM6S.jpg'
                },
                fields: [
                    {
                        name: 'Argumentos',
                        value: '{} = obrigatório \n () = opcional',
                    },
                    {
                        name: 'ModHelp',
                        value: 'Mostra os comandos disponíveis para moderadores com suas descrições.',
                    },
                    {
                        name: 'Banir (razão)',
                        value: 'Bane o membro mencionado.',
                    },
                    {
                        name: 'Kick',
                        value: 'Expulsa o membro mencionado.',
                    },
                    {
                        name: 'Punir',
                        value: 'Puni o membro mencionado.',
                    },
                    {
                        name: 'Poll {texto da votação}',
                        value: 'Cria uma votação com ✅ e ❌.',
                    },
                ],
                timestamp: new Date(),
            };
            message.channel.send({embed: modEmbed});
            }
        else (message.channel.send(`${message.author}, você não pode usar este comando!`));
    }
}