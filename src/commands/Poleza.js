module.exports = {
    name: 'poleza',
    description: 'Poleza\'s info',
    execute(message) {
        const profileEmbed = {
            color: '#874B0C',
            title: 'Onde encontrar o Poleza',
            author: {
                name: 'Poleza',
                icon_url: 'https://cdn.discordapp.com/avatars/307336180217937931/e457d59128f2c1d1b118ca9e793339fb.webp',
            },
            fields: [
                {
                    name: 'Twitch',
                    value: 'https://bit.ly/39f6Qtg',
                },
                {
                    name: 'Twitter',
                    value: 'https://bit.ly/39f8Cuf',
                },
                {
                    name: 'Instagram',
                    value: 'https://bit.ly/39f8Cuf',
                },
                {
                    name: 'Youtube',
                    value: 'https://bit.ly/39k0AQO',
                },
            ],
            timestamp: new Date(),
        };
        message.channel.send({ embed: profileEmbed });
    }
}