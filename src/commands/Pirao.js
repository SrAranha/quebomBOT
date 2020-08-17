module.exports = {
    name: 'pirao',
    description: 'Pirão\'s info',
    execute(message) {
        const profileEmbed = {
            color: '#CB5A07',
            title: 'Onde encontrar o Pirão',
            author: {
                name: 'Pirão',
                icon_url: 'https://cdn.discordapp.com/avatars/230428079208529920/7ea9e0b509370b2b15c4f02ac887f286.webp',
            },
            fields: [
                {
                    name: 'Twitch',
                    value: 'https://bit.ly/2QKfjho',
                },
                {
                    name: 'Twitter',
                    value: 'https://bit.ly/3aixUJf',
                },
                {
                    name: 'Youtube',
                    value: 'https://bit.ly/33JW4dp',
                },
            ],
            timestamp: new Date(),
        };
        message.channel.send({ embed: profileEmbed });
    }
}
