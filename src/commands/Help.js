module.exports = {
    name: 'help',
    description: 'Show all commands',
    execute(message, args) {
        const helpEmbed = {
            color: '#df8edd',
            title: 'Comandos do QueBomBOT',
            description: 'O prefixo para os comandos é `qb`',
            fields: [
                {
                    name: 'Help',
                    value: 'Mostra os comandos disponíveis com suas descrições',
                },
                {
                    name: 'Ping',
                    value: 'Pong!',
                },
                {
                    name: 'Aranha, Marvin, Pepinow, Poleza, Pirao, Kuro',
                    value: 'Mostra as redes sociais dos membros do QueBom',
                },
            ],
            timestamp: new Date(),
        };
        message.channel.send({embed: helpEmbed});
    }
}