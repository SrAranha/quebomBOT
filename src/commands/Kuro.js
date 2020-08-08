module.exports = {
    name: 'kuro',
    description: 'Kuro\'s info',
    execute(message) {
        const profileEmbed = {
            color: '#000000',
            title: 'Onde encontrar o Kuro',
            author: {
                name: 'Kuro',
                icon_url: 'https://cdn.discordapp.com/avatars/165883953977229322/5265ec4d8c9fa89cbaf126a796335b05.webp',
            },
            fields: [
                {
                    name: 'Twitch',
                    value: 'https://bit.ly/3k35b0u',
                },
                {
                    name: 'Twitter',
                    value: 'https://bit.ly/2UiomIS',
                },
                {
                    name: 'Youtube',
                    value: 'https://bit.ly/2QHSVW2',
                },
            ],
            timestamp: new Date(),
        };
        message.channel.send({ embed: profileEmbed });
    }
}