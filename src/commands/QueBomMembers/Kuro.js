module.exports = {
    name: 'kuro',
    aliases: ['kurinho'],
    description: 'Kuro\'s info',
    execute(message, args, client) {
        const { Kuro_ID, queBomBOT_ID } = require("../../config.json");
        var ID = client.users.cache.get(Kuro_ID);
        if (!ID) { var ID = client.users.cache.get(queBomBOT_ID); };
        
        const profileEmbed = {
            color: '#000000',
            title: 'Onde encontrar o Kuro',
            author: {
                name: `${ID.username}`,
                icon_url: `${ID.displayAvatarURL()}`
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