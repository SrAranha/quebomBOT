module.exports = {
    name: 'pepinow',
    description: 'Pepinow\'s info',
    execute(message, args, client) {
        const { Pepinow_ID } = require("../config.json");
        const ID = client.users.cache.get(Pepinow_ID);
        const profileEmbed = {
            color: '#2F6D32',
            title: 'Onde encontrar o Pepinow',
            author: {
                name: `${ID.username}`,
                icon_url: `${ID.displayAvatarURL()}`
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
                    name: 'Youtube',
                    value: 'https://bit.ly/2J9fYVF',
                },
            ],
            timestamp: new Date(),
        };
        message.channel.send({ embed: profileEmbed });
    }
}