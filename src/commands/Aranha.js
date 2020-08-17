module.exports = {
    name: 'aranha',
    description: 'Aranha\'s info',
    execute(message) {
        const profileEmbed = {
            color: '#7000BF',
            title: 'Onde encontrar o Aranha',
            author: {
                name: 'Aranha',
                icon_url: 'https://cdn.discordapp.com/avatars/227887537102782464/a36461f64cdd54c69d83b8f054ea2a93.webp',
            },
            fields: [
                {
                    name: 'Twitch',
                    value: 'https://bit.ly/3jRmNfF',
                },
                {
                    name: 'Twitter',
                    value: 'https://bit.ly/30b0XMb',
                },
                {
                    name: 'Youtube',
                    value: 'https://bit.ly/3fgp7sR',
                },
                {
                    name: 'Site Pessoal',
                    value: 'https://bit.ly/2X9wX1q',
                },
            ],
            timestamp: new Date(),
        };
        message.channel.send({embed: profileEmbed});
    }
}