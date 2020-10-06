module.exports = {
    name: 'qbomcast',
    description: 'shows quebomcast info',
    execute(message) {
        const qbomcastEmbed = {
            color: '#df8edd',
            title: 'QueBomCAST',
            description: 'Informações sobre o QueBomCAST.',
            thumbnail: {
                url: 'https://i.imgur.com/zYPqM6S.jpg',
            },
            fields: [
                {
                    name: 'O que é o QueBomCAST?',
                    value: 'O QueBomCAST é o podcast do Quebom, onde quase nunca se tem tema, ou o tema é decido em cima da hora, sempre com um papo bem divertido.',
                },
                {
                    name: 'Youtube',
                    value: 'Se inscreva no canal no youtube do QueBomCAST para poder assitir as gravações dos episódios! >https://bit.ly/2GCMotx<',
                },
                {
                    name: 'Transmissões ao vivo',
                    value: 'Geralmente os episódios são transmitidos nos canais da twitch dos membros do QueBom. Sigam lá!',
                },
            ],
            timestamp: new Date(),
        };
        message.channel.send({embed: qbomcastEmbed});
    }
}