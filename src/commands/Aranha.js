module.exports = {
    name: 'aranha',
    description: 'Aranha\'s info',
    execute(message, args, client) {
        const { AranhaBoladona_ID } = require("../config.json");
        const ID = client.users.cache.get(AranhaBoladona_ID);
        const profileEmbed = {
            color: '#7000BF',
            title: 'Onde encontrar o Aranha',
            author: {
                name: `${ID.username}`,
                icon_url: `${ID.displayAvatarURL()}`
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