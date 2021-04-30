module.exports = {
    name: 'pirao',
    description: 'Pirão\'s info',
    execute(message, args, client) {
        const { Pirao_ID } = require("../config.json");
        const ID = client.users.cache.get(Pirao_ID);
        const profileEmbed = {
            color: '#CB5A07',
            title: 'Onde encontrar o Pirão',
            author: {
                name: `${ID.username}`,
                icon_url: `${ID.displayAvatarURL()}`
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
