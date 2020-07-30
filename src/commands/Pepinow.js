module.exports = {
    name: 'pepinow',
    description: 'Pepinow\'s info',
    execute(message, args) {
        const profileEmbed = {
            color: '#2F6D32',
            title: 'Onde encontrar o Pepinow',
            author: {
                name: 'Pepinow',
                icon_url: 'https://cdn.discordapp.com/avatars/249982719537315841/ca3d02c35c4d06aa24ed8dcbbfb428dc.webp',
            },
            fields: [
                {
                    name: 'Twitch',
                    value: 'https://bit.ly/2WI8bWz',
                },
                {
                    name: 'Twitter',
                    value: 'https://bit.ly/2Uw7Dk9',
                },
                {
                    name: 'Instagram',
                    value: 'https://bit.ly/33H4t0U',
                },
                {
                    name: 'Youtube',
                    value: 'https://bit.ly/2J9fYVF',
                },
            ],
            timestamp: new Date(),
        };
        message.channel.send({ embed: profileEmbed });
    }
}