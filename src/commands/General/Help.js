module.exports = {
    name: 'help',
    aliases: ['ajuda'],
    description: 'Show all commands',
    execute(message, args, client) {
        const { QueBomBOT_ID } = require("../config.json");
        const ID = client.users.cache.get(QueBomBOT_ID);
        const helpEmbed = {
            color: '#df8edd',
            title: 'Comandos do QueBomBOT',
            description: 'O prefixo para os comandos é `qb`',
            thumbnail: {
                url: `${ID.displayAvatarURL()}`
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
                    name: 'QBomCAST',
                    value: 'Mostra o que é o QueBomCAST',
                },
                {
                    name: 'Ping',
                    value: 'Pong!',
                },
                {
                    name: 'Currency {Moeda} {Quantidade}',
                    value: 'Faz a conversão de algumas moedas para o Real.',
                },
                {
                    name: 'Avatar (Usuário)',
                    value: 'Mostra o avatar do usuário que chamou o comando ou o usuário mencionado.',
                },
                {
                    name: 'Calc {Operação}',
                    value: 'Comando que calcula a operação enviada. Função ainda em construção.',
                },
            ],
            timestamp: new Date(),
        };
        message.channel.send({embed: helpEmbed});
    }
}