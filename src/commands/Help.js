module.exports = {
    name: 'help',
    description: 'Show all commands',
    execute(message) {
        const helpEmbed = {
            color: '#df8edd',
            title: 'Comandos do QueBomBOT',
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
                    name: 'Help',
                    value: 'Mostra os comandos disponíveis com suas descrições.',
                },
                {
                    name: 'Aranha, Kuro, Marvin, Pepinow, Pirao, Poleza',
                    value: 'Mostra as redes sociais dos membros do QueBom.',
                },
                {
                    name: 'Convite',
                    value: 'Envia o link para convite do servidor do QueBom Oficial.',
                },
                {
                    name: 'Ping',
                    value: 'Pong!',
                },
            ],
            timestamp: new Date(),
        };
        message.channel.send({embed: helpEmbed});
    }
}