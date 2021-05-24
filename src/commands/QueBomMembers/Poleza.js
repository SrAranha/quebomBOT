module.exports = {
    name: 'poleza',
    description: 'Poleza\'s info',
    execute(message, args, client) {
        const { Poleza_ID, QueBomBOT_ID } = require("../../config.json");
        var ID = client.users.cache.get(Poleza_ID);
        if (!ID) { var ID = client.users.cache.get(QueBomBOT_ID); };
        
        const profileEmbed = {
            color: '#874B0C',
            title: 'Onde encontrar o Poleza',
            author: {
                name: `${ID.username}`,
                icon_url: `${ID.displayAvatarURL()}`
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
                    name: 'Youtube',
                    value: 'https://bit.ly/39k0AQO',
                },
            ],
            timestamp: new Date(),
        };
        message.channel.send({ embed: profileEmbed });
    }
}